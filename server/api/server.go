package api

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nofamex/AAC/server/api/controller"
	db "github.com/nofamex/AAC/server/db/sqlc"
	"github.com/nofamex/AAC/server/util"
)

type Server struct {
	config util.Config
	router *fiber.App
	query db.Querier
}

func NewServer(config util.Config, querier db.Querier) (*Server, error) {
	server := &Server{
		config: config,
		query: querier,
	}

	server.setupRouter()

	return server, nil
}

func (server *Server) setupRouter(){
	router := fiber.New()

	// routing goes here
	api := router.Group("/api")
	v1 := api.Group("/v1")

	controller.NewTestController(v1, server.query)

	server.router = router
}

func (server *Server) StartServer(adress string) error {
	return server.router.Listen(adress)
}