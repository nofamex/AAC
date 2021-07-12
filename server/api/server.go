package api

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/nofamex/AAC/server/api/controller"
	"github.com/nofamex/AAC/server/api/middleware"
	db "github.com/nofamex/AAC/server/db/sqlc"
	"github.com/nofamex/AAC/server/token"
	"github.com/nofamex/AAC/server/util"
)

type Server struct {
	config     util.Config
	tokenMaker token.Maker
	router     *fiber.App
	query      db.Querier
}

func NewServer(config util.Config, querier db.Querier) (*Server, error) {
	tokenMaker, err := token.NewPasetoMaker(config.TokenSymmetricKey)
	if err != nil {
		return nil, fmt.Errorf("cannot create token maker: %w", err)
	}

	server := &Server{
		config:     config,
		tokenMaker: tokenMaker,
		query:      querier,
	}

	server.setupRouter()

	return server, nil
}

func (server *Server) setupRouter() {
	router := fiber.New()
	router.Use(cors.New(cors.ConfigDefault))

	router.Get("/", func(ctx *fiber.Ctx) error {
		return ctx.SendString("test")
	})
	// routing goes here
	api := router.Group("/api")
	v1 := api.Group("/v1")

	userCtrl := controller.NewUserController(server.query, server.tokenMaker, server.config)
	auth := v1.Group("/auth")
	auth.Post("/register", userCtrl.Register)
	auth.Post("/login", userCtrl.Login)

	login := auth.Group("", middleware.AuthMiddleware(server.tokenMaker))
	login.Get("/refresh", userCtrl.Refresh)
	login.Get("/self", userCtrl.Self)

	compeCtrl := controller.NewCompeController(server.query, server.tokenMaker, server.config)
	compe := v1.Group("/competition", middleware.AuthMiddleware(server.tokenMaker))
	compe.Post("/register", compeCtrl.Register)
	compe.Get("/profile", compeCtrl.GetTeam)

	server.router = router
}

func (server *Server) StartServer(adress string) error {


	// server.router.Use(cors.New(cors.Config{
	// 	AllowHeaders:     "Origin, Content-Type, Access-Control-Allow-Headers, Access-Control-Allow-Origin, Authorization, X-Requested-With",
	// 	AllowOrigins:     "http://localhost:3000, https://www.aacunair.id",
	// 	AllowCredentials: true,
	// 	AllowMethods:     "GET,POST,PUT,DELETE,PATCH",
	// 	ExposeHeaders:    "Origin",
	// }))

	// corsSettings := cors.New(cors.Config{
	// 	AllowOrigins:  "*",
	// 	AllowMethods:  "GET,POST,HEAD, OPTIONS, PUT, DELETE, PATCH",
	// 	AllowHeaders:  "Origin, Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization",
	// 	ExposeHeaders: "Origin",
	// })

	// server.router.Use(corsSettings)

	return server.router.Listen(adress)
}
