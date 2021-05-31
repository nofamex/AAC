package api

import (
	"github.com/nofamex/AAC/server/util"
	"github.com/gofiber/fiber/v2"
)

type Server struct {
	config util.Config
	router *fiber.App
}

func NewServer(config util.Config) (*Server, error){
	server := &Server{
		config: config,
	}

	server.setupRouter()

	return server, nil
}

func (server *Server) setupRouter(){
	router := fiber.New()

	// routing goes here

	server.router = router
}

func (server *Server) StartServer(adress string) error {
	return server.router.Listen(adress)
}