package controller

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/nofamex/AAC/server/api/service"

	db "github.com/nofamex/AAC/server/db/sqlc"
	"github.com/nofamex/AAC/server/token"
	"github.com/nofamex/AAC/server/util"
)

type AdminController struct {
	service    service.AdminService
	tokenMaker token.Maker
	config     util.Config
}

func NewAdminController(query db.Querier, maker token.Maker, config util.Config) (adminController *AdminController) {
	adminService := service.NewAdminService(query)
	adminController = &AdminController{
		service:    *adminService,
		tokenMaker: maker,
		config:     config,
	}

	return
}

func (u *AdminController) GetTeams(c *fiber.Ctx) error {
	item := 25
	pageStr := c.Query("page", "0")
	limitStr := c.Query("limit", "25")
	page, err := strconv.Atoi(pageStr)
	if err != nil {
		return c.Status(http.StatusBadGateway).JSON(Message{Message: err.Error()})
	}

	limit, err := strconv.Atoi(limitStr)
	if err != nil {
		return c.Status(http.StatusBadGateway).JSON(Message{Message: err.Error()})
	}

	offset := item * page

	teams, err := u.service.GetTeamsPagination(int32(offset), int32(limit))
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	return c.Status(http.StatusOK).JSON(teams)
}

func (u *AdminController) Verify(c *fiber.Ctx) error {
	idStr := c.Query("id")
	if idStr == "" {
		return errors.New("no id")
	}

	typeStr := c.Query("type")
	if typeStr == "" {
		return errors.New("no type")
	}

	id, err := strconv.Atoi(idStr)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(Message{Message: err.Error()})
	}
	u.service.Verify(int32(id), typeStr)

	team, err := u.service.GetTeamById(int32(id))
	util.SendMail(u.config, team.Email, team.Type)
	return nil
}
