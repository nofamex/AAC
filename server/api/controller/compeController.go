package controller

import (
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
	var requestBody model.RegisterTeamRequest
	err := c.BodyParser(&requestBody)
	if err != nil {
		return c.Status(http.StatusBadRequest).SendString(err.Error())
	}

	validate := validator.New()
	err = validate.Struct(requestBody)
	if err != nil {
		return c.Status(http.StatusBadRequest).SendString(err.Error())
	}

	_, err = u.service.CreateTeam(&requestBody)
	if err != nil {
		if pqErr, ok := err.(*pq.Error); ok {
			switch pqErr.Code.Name() {
			case "unique_violation":
				return c.Status(http.StatusForbidden).SendString("duplicate email")
			}
		}
		return c.Status(http.StatusInternalServerError).SendString(err.Error())
	}

	// members := requestBody.Members

	return c.Status(http.StatusOK).SendString("ok")
}
