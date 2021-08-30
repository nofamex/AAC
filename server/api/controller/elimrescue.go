package controller

import (
	"log"
	"net/http"

	"github.com/go-playground/validator"
	"github.com/gofiber/fiber/v2"
	"github.com/nofamex/AAC/server/api/service"

	db "github.com/nofamex/AAC/server/db/sqlc"
	"github.com/nofamex/AAC/server/token"
	"github.com/nofamex/AAC/server/util"
)

type ElimRescueController struct {
	service      service.ElimRescueService
	userService  service.UserService
	compeService service.CompeService
	tokenMaker   token.Maker
	config       util.Config
}

func NewElimRescueController(query db.Querier, maker token.Maker, config util.Config) (elimRescueController *ElimRescueController) {
	elimRescueService := service.NewElimRescueService(query)
	userService := service.NewUserService(query)
	compeService := service.NewCompeService(query)
	elimRescueController = &ElimRescueController{
		service:      *elimRescueService,
		userService:  *userService,
		compeService: *compeService,
		tokenMaker:   maker,
		config:       config,
	}

	return
}

func (u *ElimRescueController) Start(c *fiber.Ctx) error {
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

	user, err := u.userService.GetUserById(int(payload.UserId))
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	team, err := u.compeService.GetTeamById(user.TeamID.Int32)
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}
	// cek udah bayar
	if team.StatusPaymentPrelim != "verified" {
		return c.Status(http.StatusUnprocessableEntity).JSON(Message{Message: "Belum di verifikasi"})
	}
	_, err = u.service.CreateRescueMaster(int(user.TeamID.Int32), token)
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}
	// cek belom ada team
	rescue, err := u.service.GetTeamById(int(user.TeamID.Int32))
	if rescue != nil {
		return c.Status(http.StatusOK).JSON(Message{Message: "Team sudah terdaftar"})
	}

	err = u.compeService.UpdateRescueStatus(int(user.TeamID.Int32), "ongoing")
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}
	return c.Status(http.StatusOK).JSON(Message{Message: "ok"})
}

type SubmitRescueRequest struct {
	SoalId  int    `json:"soal_id" validate:"required,numeric"`
	Jawaban string `json:"jawaban" validate:"required"`
}

func (u *ElimRescueController) Submit(c *fiber.Ctx) error {
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

	user, err := u.userService.GetUserById(int(payload.UserId))
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	var requestBody SubmitRescueRequest
	err = c.BodyParser(&requestBody)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(Message{Message: err.Error()})
	}

	validate := validator.New()
	err = validate.Struct(requestBody)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(Message{Message: err.Error()})
	}

	err = u.service.CreateRescueJawaban(int(user.TeamID.Int32), requestBody.SoalId, requestBody.Jawaban)
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	return c.Status(http.StatusOK).JSON(Message{Message: "ok"})
}

// get soal
func (u *ElimRescueController) GetSoal(c *fiber.Ctx) error {
	token := c.Get("authorization")
	token, err := u.tokenMaker.GetToken(token)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	payload, err := u.tokenMaker.VerifyToken(token)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	_, err = u.userService.GetUserById(int(payload.UserId))
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}
	soalArr, err := u.service.GetRescueSoal()
	resPage := PageResponse{}
	res := []Soal{}
	for _, soal := range soalArr {
		res = append(res, Soal{
			Id:   int(soal.ID),
			Soal: soal.Soal,
		})
	}
	resPage.Body = res
	return c.Status(http.StatusOK).JSON(resPage)

}

func (u *ElimRescueController) Finish(c *fiber.Ctx) error {
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

	user, err := u.userService.GetUserById(int(payload.UserId))
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	err = u.compeService.UpdateRescueStatus(int(user.TeamID.Int32), "selesai")
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	err = u.compeService.UpdateElimStatus(int(user.TeamID.Int32), "selesai")
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	err = u.service.UpdateSubmitedRescue(int(user.TeamID.Int32))
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	return c.Status(http.StatusOK).JSON(Message{Message: "ok"})
}
