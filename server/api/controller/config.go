package controller

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/nofamex/AAC/server/api/service"
	db "github.com/nofamex/AAC/server/db/sqlc"
	"github.com/nofamex/AAC/server/token"
	"github.com/nofamex/AAC/server/util"
)

type ConfigController struct {
	service    service.ConfigService
	tokenMaker token.Maker
	config     util.Config
}

func NewConfigController(query db.Querier, maker token.Maker, config util.Config) (compeController *ConfigController) {
	ConfigService := service.NewConfigService(query)
	compeController = &ConfigController{
		service:    *ConfigService,
		tokenMaker: maker,
		config:     config,
	}

	return
}

func (u *ConfigController) Time(c *fiber.Ctx) error {

	config, err := u.service.GetConfig()
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}
	return c.Status(http.StatusOK).JSON(config)
}
