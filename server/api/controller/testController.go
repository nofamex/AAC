package controller

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nofamex/AAC/server/api/service"
	db "github.com/nofamex/AAC/server/db/sqlc"
)

type TestController struct {
	service service.TestService
}

func NewTestController(app fiber.Router, query db.Querier) {
	testService := service.NewTestService(query)
	TestController := &TestController{service: *testService}

	app.Post("/test", TestController.register)
}

func (t *TestController) register(c *fiber.Ctx) error {
	var requestBody db.Account
	err := c.BodyParser(&requestBody)
	if err != nil {
		return c.Status(500).SendString("Wrong body type send in request.")
	}

	result, err := t.service.CreateAccount(&requestBody)
	if err != nil {
		return c.Status(500).SendString("Error, please contact the backend.")
	}

	return c.JSON(result)
}