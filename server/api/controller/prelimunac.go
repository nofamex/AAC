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

type PrelimUnacController struct {
	service      service.PrelimUnacService
	userService  service.UserService
	compeService service.CompeService
	tokenMaker   token.Maker
	config       util.Config
}

func NewPrelimUnacController(query db.Querier, maker token.Maker, config util.Config) (compeController *PrelimUnacController) {
	prelimUnacService := service.NewPrelimUnacService(query)
	userService := service.NewUserService(query)
	compeService := service.NewCompeService(query)
	compeController = &PrelimUnacController{
		service:      *prelimUnacService,
		userService:  *userService,
		compeService: *compeService,
		tokenMaker:   maker,
		config:       config,
	}

	return
}

func (u *PrelimUnacController) Start(c *fiber.Ctx) error {
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
	paket := 4
	// generate sequence
	order := util.RandomOrderUnacSimul()
	// create prelim unac master
	master, err := u.service.CreatePrelimUnac(int(user.TeamID.Int32), paket, token, order)
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

func (u *PrelimUnacController) Finish(c *fiber.Ctx) error {
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

	err = u.service.UpdateSubmitedUnac(int(user.TeamID.Int32))
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	return c.Status(http.StatusOK).JSON(Message{Message: "ok"})
}

type SubmitPgRequest struct {
	SoalId  int `json:"id" validate:"required,numeric"`
	Paket   int `json:"paket" validate:"required,numeric"`
	Jawaban int `json:"jawaban" validate:"required,numeric"`
}

// submit
func (u *PrelimUnacController) SubmitPg(c *fiber.Ctx) error {
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

	err = u.service.CreatePrelimUnacPg(int(user.TeamID.Int32), requestBody.SoalId, requestBody.Jawaban)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	return c.Status(http.StatusOK).JSON(Message{Message: "ok"})
}

type SubmitIsianRequest struct {
	SoalId  int    `json:"id" validate:"required,numeric"`
	Paket   int    `json:"paket" validate:"required,numeric"`
	Jawaban string `json:"jawaban" validate:"required"`
}

func (u *PrelimUnacController) SubmitIsian(c *fiber.Ctx) error {
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

	var requestBody SubmitIsianRequest
	err = c.BodyParser(&requestBody)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(Message{Message: err.Error()})
	}

	validate := validator.New()
	err = validate.Struct(requestBody)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(Message{Message: err.Error()})
	}

	err = u.service.CreatePrelimUnacIsian(int(user.TeamID.Int32), requestBody.SoalId, requestBody.Jawaban)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}
	return c.Status(http.StatusOK).JSON(Message{Message: "ok"})
}

type PageResponse struct {
	Page  int    `json:"page"`
	Paket int    `json:"paket"`
	Body  []Soal `json:"body"`
}

type Soal struct {
	Id       int    `json:"id"`
	No       int    `json:"no"`
	Soal     string `json:"soal"`
	Pilihan1 string `json:"pilihan1,omitempty"`
	Pilihan2 string `json:"pilihan2,omitempty"`
	Pilihan3 string `json:"pilihan3,omitempty"`
	Pilihan4 string `json:"pilihan4,omitempty"`
	Bobot    int    `json:"bobot"`
}

// get soal
func (u *PrelimUnacController) GetSoal(c *fiber.Ctx) error {
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

	page, err := u.service.GetPagePrelimUnac(int(user.TeamID.Int32))
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(Message{Message: err.Error()})
	}

	if page > 3 {
		return c.Status(http.StatusBadRequest).JSON(Message{Message: "already submited last page"})
	}
	prelim, err := u.service.GetTeamById(int(user.TeamID.Int32))
	if prelim.Token != token {
		return c.Status(http.StatusBadRequest).JSON(Message{Message: "token doesn't match"})
	}

	var order []int
	err = json.Unmarshal([]byte(prelim.Orders), &order)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: "order failed"})
	}

	// tolong ganti kalo udah ga simul

	resPage := PageResponse{
		Page: int(page),
	}
	order = order[5*(page-1) : 5*(page)]
	if page <= 2 {
		res := []Soal{}
		for i, id := range order {
			soal, _ := u.service.GetPrelimUnacPg(id)
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
	} else {
		res := []Soal{}
		for i, id := range order {
			soal, _ := u.service.GetPrelimUnacIsian(id)
			res = append(res, Soal{
				Id:    int(soal.ID),
				No:    int(page-1)*5 + i + 1,
				Soal:  soal.Soal,
				Bobot: int(soal.Bobot),
			})
			resPage.Paket = int(soal.Paket)
		}
		resPage.Body = res
		return c.Status(http.StatusOK).JSON(resPage)
	}
}

// NextPage
func (u *PrelimUnacController) NextPage(c *fiber.Ctx) error {
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

	prelim, err := u.service.GetTeamById(int(user.TeamID.Int32))
	if prelim.Token != token {
		return c.Status(http.StatusBadRequest).JSON(Message{Message: "token doesn't match"})
	}

	// tolong ganti kalo udah ga simul
	err = u.service.NextPagePrelimUnac(int(user.TeamID.Int32))
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	return c.Status(http.StatusOK).JSON(Message{Message: "ok"})
}
