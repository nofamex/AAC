package controller

import (
	"database/sql"
	"net/http"

	"github.com/go-playground/validator"
	"github.com/gofiber/fiber/v2"
	"github.com/lib/pq"
	"github.com/nofamex/AAC/server/api/service"

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
	Id       int    `json:"id"`
	FullName string `json:"full_name"`
	Email    string `json:"email"`
	TeamName string `json:"team_name,omitempty"`
}

func NewUserController(query db.Querier, maker token.Maker, config util.Config) (userController *UserController) {
	userService := service.NewUserService(query)
	userController = &UserController{
		service:    *userService,
		tokenMaker: maker,
		config:     config,
	}

	return
}

type Message struct {
	Message string `json:"message"`
}

type RegisterUserRequest struct {
	FullName string `json:"full_name" validate:"required"`
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

// register
func (u *UserController) Register(c *fiber.Ctx) error {
	var requestBody RegisterUserRequest
	err := c.BodyParser(&requestBody)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(Message{Message: err.Error()})
	}

	validate := validator.New()
	err = validate.Struct(requestBody)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(Message{Message: err.Error()})
	}

	hashedPassword, err := util.HashPassword(requestBody.Password)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}
	requestBody.Password = hashedPassword

	registerUserParams := db.RegisterUserParams(requestBody)
	result, err := u.service.RegisterUser(&registerUserParams)
	if err != nil {
		if pqErr, ok := err.(*pq.Error); ok {
			switch pqErr.Code.Name() {
			case "unique_violation":
				return c.Status(http.StatusForbidden).JSON(Message{Message: "duplicate email"})
			}
		}
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	response := &UserResponse{
		Id:       int(result.ID),
		FullName: result.FullName,
		Email:    result.Email,
	}

	return c.Status(http.StatusOK).JSON(response)
}

type LoginUserRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

type LoginUserResponse struct {
	AccessToken  string        `json:"access_token"`
	RefreshToken string        `json:"refresh_token"`
	User         *UserResponse `json:"user,omitempty"`
}

// login
func (u *UserController) Login(c *fiber.Ctx) error {
	var requestBody LoginUserRequest
	err := c.BodyParser(&requestBody)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(Message{Message: err.Error()})
	}

	validate := validator.New()
	err = validate.Struct(requestBody)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(Message{Message: err.Error()})
	}

	user, err := u.service.GetUserByEmail(requestBody.Email)
	if err != nil {
		if err == sql.ErrNoRows {
			return c.Status(http.StatusUnprocessableEntity).JSON(Message{Message: err.Error()})
		}
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	err = util.CheckPassword(requestBody.Password, user.Password)
	if err != nil {
		return c.Status(http.StatusUnauthorized).JSON(Message{Message: err.Error()})
	}

	accessToken, err := u.tokenMaker.CreateToken(
		user.Email,
		user.ID,
		u.config.AccessTokenDuration,
	)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	refreshToken, err := u.tokenMaker.CreateToken("", 0, u.config.RefreshTokenDuration)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	err = u.service.SetRefreshToken(user.Email, refreshToken)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	userResponse := &UserResponse{
		Id:       int(user.ID),
		FullName: user.FullName,
		Email:    user.Email,
		TeamName: user.TeamName,
	}

	response := &LoginUserResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
		User:         userResponse,
	}

	return c.Status(http.StatusOK).JSON(response)
}

// Refresh
func (u *UserController) Refresh(c *fiber.Ctx) error {
	header := c.Get("authorization")
	token, err := u.tokenMaker.GetToken(header)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	payload, err := u.tokenMaker.VerifyToken(token)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	accessToken, err := u.tokenMaker.CreateToken(
		payload.Email,
		payload.UserId,
		u.config.AccessTokenDuration,
	)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	refreshToken, err := u.tokenMaker.CreateToken("", 0, u.config.RefreshTokenDuration)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	err = u.service.SetRefreshToken(payload.Email, refreshToken)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	response := &LoginUserResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}

	return c.Status(http.StatusOK).JSON(response)
}

// Self
func (u *UserController) Self(c *fiber.Ctx) error {
	header := c.Get("authorization")
	token, _ := u.tokenMaker.GetToken(header)

	payload, err := u.tokenMaker.VerifyToken(token)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	user, err := u.service.GetUserByEmail(payload.Email)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	userResponse := &UserResponse{
		Id:       int(user.ID),
		FullName: user.FullName,
		Email:    user.Email,
	}

	return c.Status(http.StatusOK).JSON(userResponse)
}
