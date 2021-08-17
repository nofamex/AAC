package controller

import (
	"log"
	"net/http"

	"github.com/go-playground/validator"
	"github.com/gofiber/fiber/v2"
	"github.com/lib/pq"
	"github.com/nofamex/AAC/server/api/model"
	"github.com/nofamex/AAC/server/api/service"

	db "github.com/nofamex/AAC/server/db/sqlc"
	"github.com/nofamex/AAC/server/token"
	"github.com/nofamex/AAC/server/util"
)

type CompeController struct {
	service    service.CompeService
	tokenMaker token.Maker
	config     util.Config
}

func NewCompeController(query db.Querier, maker token.Maker, config util.Config) (compeController *CompeController) {
	compeService := service.NewCompeService(query)
	compeController = &CompeController{
		service:    *compeService,
		tokenMaker: maker,
		config:     config,
	}

	return
}

// register
func (u *CompeController) Register(c *fiber.Ctx) error {
	token := c.Get("authorization")
	token, err := u.tokenMaker.GetToken(token)
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	payload, err := u.tokenMaker.VerifyToken(token)
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	var requestBody model.RegisterTeamRequest
	err = c.BodyParser(&requestBody)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(Message{Message: err.Error()})
	}

	validate := validator.New()
	err = validate.Struct(requestBody)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(Message{Message: err.Error()})
	}

	team, err := u.service.CreateTeam(&requestBody)
	if err != nil {
		if pqErr, ok := err.(*pq.Error); ok {
			switch pqErr.Code.Name() {
			case "unique_violation":
				return c.Status(http.StatusForbidden).JSON(Message{Message: "duplicate team name"})
			}
		}
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	members := requestBody.Members
	err = u.service.CreateMember(&members, team.ID)
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	err = u.service.AddTeamIdToUser(payload.UserId, team.ID)
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	return c.Status(http.StatusOK).JSON(Message{Message: "ok"})
}

func (u *CompeController) GetTeam(c *fiber.Ctx) error {
	token := c.Get("authorization")
	token, err := u.tokenMaker.GetToken(token)
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	payload, err := u.tokenMaker.VerifyToken(token)
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	user, err := u.service.GetUserById(payload.UserId)
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	team, err := u.service.GetTeamById(user.TeamID.Int32)
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	members, err := u.service.GetMemberByTeamId(user.TeamID.Int32)
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	team.Members = *members

	return c.Status(http.StatusOK).JSON(team)
}
