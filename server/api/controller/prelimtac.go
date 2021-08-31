package controller

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/go-playground/validator"
	"github.com/gofiber/fiber/v2"
	"github.com/nofamex/AAC/server/api/service"

	db "github.com/nofamex/AAC/server/db/sqlc"
	"github.com/nofamex/AAC/server/token"
	"github.com/nofamex/AAC/server/util"
)

type PrelimTacController struct {
	service      service.PrelimTacService
	userService  service.UserService
	compeService service.CompeService
	tokenMaker   token.Maker
	config       util.Config
}

func NewPrelimTacController(query db.Querier, maker token.Maker, config util.Config) (compeController *PrelimTacController) {
	prelimTacService := service.NewPrelimTacService(query)
	userService := service.NewUserService(query)
	compeService := service.NewCompeService(query)
	compeController = &PrelimTacController{
		service:      *prelimTacService,
		userService:  *userService,
		compeService: *compeService,
		tokenMaker:   maker,
		config:       config,
	}

	return
}

func (u *PrelimTacController) Start(c *fiber.Ctx) error {
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

	// cek belom ada team
	prelim, err := u.service.GetTeamById(int(user.TeamID.Int32))
	if prelim != nil {
		return c.Status(http.StatusOK).JSON(Message{Message: "Team sudah terdaftar"})
	}

	// cek udah bayar
	if team.Status != "berhasil" {
		return c.Status(http.StatusUnprocessableEntity).JSON(Message{Message: "Belum di verifikasi"})
	}
	// random paket
	paket := util.RandomPaket()
	// paket := 3
	// generate sequence
	pgIds, err := u.service.GetTacPgIdByPaket(paket)
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}
	order := util.RandomOrderTac(pgIds)
	// create prelim tac master
	master, err := u.service.CreatePrelimTac(int(user.TeamID.Int32), paket, token, order)
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}
	err = u.compeService.UpdatePrelimStatus(int(user.TeamID.Int32), "ongoing")
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}
	return c.Status(http.StatusOK).JSON(master)
}

func (u *PrelimTacController) Finish(c *fiber.Ctx) error {
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

	err = u.compeService.UpdatePrelimStatus(int(user.TeamID.Int32), "selesai")
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	err = u.service.UpdateSubmitedTac(int(user.TeamID.Int32))
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	return c.Status(http.StatusOK).JSON(Message{Message: "ok"})
}

// submit
func (u *PrelimTacController) SubmitPg(c *fiber.Ctx) error {
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

	var requestBody SubmitPgRequest
	err = c.BodyParser(&requestBody)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(Message{Message: err.Error()})
	}

	validate := validator.New()
	err = validate.Struct(requestBody)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(Message{Message: err.Error()})
	}

	err = u.service.CreatePrelimTacPg(int(user.TeamID.Int32), requestBody.SoalId, requestBody.Jawaban)
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}
	return c.Status(http.StatusOK).JSON(Message{Message: "ok"})
}

// get soal
func (u *PrelimTacController) GetSoal(c *fiber.Ctx) error {
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

	page, err := u.service.GetPagePrelimTac(int(user.TeamID.Int32))
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusBadRequest).JSON(Message{Message: err.Error()})
	}

	if page > 12 {
		return c.Status(http.StatusBadRequest).JSON(Message{Message: "already submited last page"})
	}
	prelim, err := u.service.GetTeamById(int(user.TeamID.Int32))
	if prelim.Token != token {
		return c.Status(http.StatusBadRequest).JSON(Message{Message: "token doesn't match"})
	}

	var order []int
	err = json.Unmarshal([]byte(prelim.Orders), &order)
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: "order failed"})
	}

	// tolong ganti kalo udah ga simul

	resPage := PageResponse{
		Page: int(page),
	}
	order = order[5*(page-1) : 5*(page)]
	res := []Soal{}
	for i, id := range order {
		soal, _ := u.service.GetPrelimTacPg(id)
		res = append(res, Soal{
			Id:       int(soal.ID),
			No:       int(page-1)*5 + i + 1,
			Soal:     soal.Soal,
			Pilihan1: soal.Pilihan1,
			Pilihan2: soal.Pilihan2,
			Pilihan3: soal.Pilihan3,
			Pilihan4: soal.Pilihan4,
			Bobot:    int(soal.Bobot),
		})
		resPage.Paket = int(soal.Paket)
	}
	resPage.Body = res
	return c.Status(http.StatusOK).JSON(resPage)
}

// NextPage
func (u *PrelimTacController) NextPage(c *fiber.Ctx) error {
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

	prelim, err := u.service.GetTeamById(int(user.TeamID.Int32))
	if prelim.Token != token {
		return c.Status(http.StatusBadRequest).JSON(Message{Message: "token doesn't match"})
	}

	// tolong ganti kalo udah ga simul
	err = u.service.NextPagePrelimTac(int(user.TeamID.Int32))
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	return c.Status(http.StatusOK).JSON(Message{Message: "ok"})
}

func (u *PrelimTacController) Payment(c *fiber.Ctx) error {
	token := c.Get("authorization")
	token, err := u.tokenMaker.GetToken(token)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	payload, err := u.tokenMaker.VerifyToken(token)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	user, err := u.userService.GetUserById(int(payload.UserId))
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	var requestBody PaymentRequest
	err = c.BodyParser(&requestBody)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(Message{Message: err.Error()})
	}

	validate := validator.New()
	err = validate.Struct(requestBody)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(Message{Message: err.Error()})
	}

	err = u.service.InsertPaymentTac(int(user.TeamID.Int32), requestBody.Link)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}
	err = u.service.UpdatePaymentStatusPrelimTac(int(user.TeamID.Int32), "bayar")
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	return c.Status(http.StatusOK).JSON(Message{Message: "ok"})
}
