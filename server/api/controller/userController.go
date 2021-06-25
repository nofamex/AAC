package controller

import (
	"database/sql"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/lib/pq"
	"github.com/nofamex/AAC/server/api/service"
	db "github.com/nofamex/AAC/server/db/sqlc"
	"github.com/nofamex/AAC/server/token"
	"github.com/nofamex/AAC/server/util"
)

type UserController struct {
	service service.UserService
	tokenMaker token.Maker
	config util.Config
}

type UserResponse struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Username  string `json:"username"`
	Password  string `json:"password"`
}

func NewUserController(app fiber.Router, query db.Querier, maker token.Maker, config util.Config) {
	userService := service.NewUserService(query)
	UserController := &UserController{
		service: *userService, 
		tokenMaker: maker,
		config: config,
	}

	app.Post("/register", UserController.register)
	app.Post("/login", UserController.login)
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
		LastName: result.LastName,
		Username: result.Username,
		Password: result.Password,
	}

	return c.Status(http.StatusOK).JSON(response)
}

type LoginUserRequest struct {
	Username string `json:"username" binding:"required,alphanum"`
	Password string `json:"password" binding:"required"`
}

type LoginUserResponse struct {
	AccesToken string `json:"access_token"`
	User UserResponse `json:"user"`
}

func (u *UserController) login(c *fiber.Ctx) error {
	var requestBody LoginUserRequest
	err := c.BodyParser(&requestBody)
	if err != nil {
		return c.Status(http.StatusBadRequest).SendString(err.Error())
	}

	user, err := u.service.GetUser(requestBody.Username)
	if  err != nil {
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

	userResponse := &UserResponse{
		FirstName: user.FirstName,
		LastName: user.LastName,
		Username: user.Username,
		Password: user.Password,
	}

	response := &LoginUserResponse{
		AccesToken: accessToken,
		User: *userResponse,
	}

	return c.Status(http.StatusOK).JSON(response)
}