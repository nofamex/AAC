package controller

import (
	"database/sql"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/lib/pq"
	"github.com/nofamex/AAC/server/api/service"

	"github.com/nofamex/AAC/server/api/middleware"
	db "github.com/nofamex/AAC/server/db/sqlc"
	"github.com/nofamex/AAC/server/token"
	"github.com/nofamex/AAC/server/util"
)

type UserController struct {
	service    service.UserService
	tokenMaker token.Maker
	config     util.Config
}

type UserResponse struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Username  string `json:"username"`
}

func NewUserController(app fiber.Router, query db.Querier, maker token.Maker, config util.Config) {
	userService := service.NewUserService(query)
	UserController := &UserController{
		service:    *userService,
		tokenMaker: maker,
		config:     config,
	}

	app.Post("/register", UserController.register)
	app.Post("/login", UserController.login)

	auth := app.Group("", middleware.AuthMiddleware(maker))
	auth.Get("/refresh", UserController.refresh)
	auth.Get("/self", UserController.self)
}

func (u *UserController) register(c *fiber.Ctx) error {
	var requestBody db.CreateUserParams
	err := c.BodyParser(&requestBody)
	if err != nil {
		return c.Status(http.StatusBadRequest).SendString(err.Error())
	}

	hashedPassword, err := util.HashPassword(requestBody.Password)
	if err != nil {
		return c.Status(http.StatusInternalServerError).SendString(err.Error())
	}
	requestBody.Password = hashedPassword

	result, err := u.service.CreateUser(&requestBody)
	if err != nil {
		if pqErr, ok := err.(*pq.Error); ok {
			switch pqErr.Code.Name() {
			case "unique_violation":
				return c.Status(http.StatusForbidden).SendString("duplicate username")
			}
		}
		return c.Status(http.StatusInternalServerError).SendString(err.Error())
	}

	response := &UserResponse{
		FirstName: result.FirstName,
		LastName:  result.LastName,
		Username:  result.Username,
	}

	return c.Status(http.StatusOK).JSON(response)
}

type LoginUserRequest struct {
	Username string `json:"username" binding:"required,alphanum"`
	Password string `json:"password" binding:"required"`
}

type LoginUserResponse struct {
	AccessToken  string        `json:"access_token"`
	RefreshToken string        `json:"refresh_token"`
	User         *UserResponse `json:"user,omitempty"`
}

func (u *UserController) login(c *fiber.Ctx) error {
	var requestBody LoginUserRequest
	err := c.BodyParser(&requestBody)
	if err != nil {
		return c.Status(http.StatusBadRequest).SendString(err.Error())
	}

	user, err := u.service.GetUser(requestBody.Username)
	if err != nil {
		if err == sql.ErrNoRows {
			return c.Status(http.StatusNotFound).SendString(err.Error())
		}
		return c.Status(http.StatusInternalServerError).SendString(err.Error())
	}

	err = util.CheckPassword(requestBody.Password, user.Password)
	if err != nil {
		return c.Status(http.StatusUnauthorized).SendString(err.Error())
	}

	accessToken, err := u.tokenMaker.CreateToken(
		user.Username,
		user.ID,
		u.config.AccessTokenDuration,
	)
	if err != nil {
		return c.Status(http.StatusInternalServerError).SendString(err.Error())
	}

	refreshToken, err := u.tokenMaker.CreateToken("", 0, u.config.RefreshTokenDuration)
	if err != nil {
		return c.Status(http.StatusInternalServerError).SendString(err.Error())
	}

	err = u.service.SetRefreshToken(user.Username, refreshToken)
	if err != nil {
		return c.Status(http.StatusInternalServerError).SendString(err.Error())
	}

	userResponse := &UserResponse{
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Username:  user.Username,
	}

	response := &LoginUserResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
		User:         userResponse,
	}

	return c.Status(http.StatusOK).JSON(response)
}

func (u *UserController) refresh(c *fiber.Ctx) error {
	header := c.Get("authorization")
	token, _ := token.GetToken(header)
	payload, err := u.tokenMaker.VerifyToken(token)

	accessToken, err := u.tokenMaker.CreateToken(
		payload.Username,
		int32(payload.ID.ID()),
		u.config.AccessTokenDuration,
	)
	if err != nil {
		return c.Status(http.StatusInternalServerError).SendString(err.Error())
	}

	refreshToken, err := u.tokenMaker.CreateToken("", 0, u.config.RefreshTokenDuration)
	if err != nil {
		return c.Status(http.StatusInternalServerError).SendString(err.Error())
	}

	err = u.service.SetRefreshToken(payload.Username, refreshToken)
	if err != nil {
		return c.Status(http.StatusInternalServerError).SendString(err.Error())
	}

	response := &LoginUserResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}

	return c.Status(http.StatusOK).JSON(response)
}

func (u *UserController) self(c *fiber.Ctx) error {
	header := c.Get("authorization")
	token, _ := token.GetToken(header)

	payload, err := u.tokenMaker.VerifyToken(token)
	if err != nil {
		return c.Status(http.StatusInternalServerError).SendString(err.Error())
	}

	user, err := u.service.GetUser(payload.Username)
	if err != nil {
		return c.Status(http.StatusInternalServerError).SendString(err.Error())
	}

	userResponse := &UserResponse{
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Username:  user.Username,
	}

	return c.Status(http.StatusOK).JSON(userResponse)
}
