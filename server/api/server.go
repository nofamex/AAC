package api

import (
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
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
	router.Use(logger.New(logger.Config{
		Format: "[${time}] ${method} |${status}| - ${path} | ${latency}\n",
		Output: os.Stdout,
	}))
	router.Use(recover.New())
	router.Get("/", func(ctx *fiber.Ctx) error {
		return ctx.SendString("test")
	})
	// routing goes here
	api := router.Group("/api")
	v1 := api.Group("/v1")

	config := v1.Group("config")
	configCtrl := controller.NewConfigController(server.query, server.tokenMaker, server.config)
	config.Get("/time", configCtrl.Time)

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

	adminCtrl := controller.NewAdminController(server.query, server.tokenMaker, server.config)
	admin := v1.Group("/admin", middleware.AdminMiddleware(server.tokenMaker))
	admin.Get("/teams", adminCtrl.GetTeams)
	admin.Get("/verify", adminCtrl.Verify)

	prelim := v1.Group("/prelim", middleware.AuthMiddleware(server.tokenMaker))
	unacPrelim := prelim.Group("unac")

	unacPrelimCtrl := controller.NewPrelimUnacController(server.query, server.tokenMaker, server.config)
	unacPrelim.Post("start", unacPrelimCtrl.Start)
	unacPrelim.Post("finish", unacPrelimCtrl.Finish)
	unacPrelim.Get("soal", unacPrelimCtrl.GetSoal)
	unacPrelim.Get("next", unacPrelimCtrl.NextPage)
	unacPrelim.Post("submit-pg", unacPrelimCtrl.SubmitPg)
	unacPrelim.Post("submit-isian", unacPrelimCtrl.SubmitIsian)
	unacPrelim.Post("payment", unacPrelimCtrl.Payment)

	tacPrelimCtrl := controller.NewPrelimTacController(server.query, server.tokenMaker, server.config)
	tacPrelim := prelim.Group("tac")
	tacPrelim.Post("start", tacPrelimCtrl.Start)
	tacPrelim.Post("finish", tacPrelimCtrl.Finish)
	tacPrelim.Get("soal", tacPrelimCtrl.GetSoal)
	tacPrelim.Get("next", tacPrelimCtrl.NextPage)
	tacPrelim.Post("submit-pg", tacPrelimCtrl.SubmitPg)
	tacPrelim.Post("payment", tacPrelimCtrl.Payment)

	elim := v1.Group("/elim", middleware.PrelimMiddleware(server.tokenMaker))
	unacElim := elim.Group("unac")

	sandwich := unacElim.Group("sandwich")
	unacSandwich := controller.NewElimSandwichController(server.query, server.tokenMaker, server.config)
	sandwich.Post("start/:paket", unacSandwich.Start)
	sandwich.Post("finish", unacSandwich.Finish)
	sandwich.Get("soal", unacSandwich.GetSoal)
	sandwich.Get("next", unacSandwich.NextPage)
	sandwich.Post("submit", unacSandwich.Submit)

	scratch := unacElim.Group("scratch")
	unacScratch := controller.NewElimScratchController(server.query, server.tokenMaker, server.config)
	scratch.Post("start", unacScratch.Start)
	scratch.Post("submit", unacScratch.Submit)
	scratch.Post("finish", unacScratch.Finish)

	rescue := unacElim.Group("rescue")
	unacRescue := controller.NewElimRescueController(server.query, server.tokenMaker, server.config)
	rescue.Post("start", unacRescue.Start)
	rescue.Post("submit", unacRescue.Submit)
	rescue.Post("finish", unacRescue.Finish)
	rescue.Get("soal", unacRescue.GetSoal)

	server.router = router
}

func (server *Server) StartServer(adress string) error {

	return server.router.Listen(adress)
}
