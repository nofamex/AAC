package controller

import (
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
	u.service.GetTeamsPagination(int32(limit), int32(offset))

	return nil
}
