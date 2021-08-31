package controller

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"github.com/go-playground/validator"
	"github.com/gofiber/fiber/v2"
	"github.com/nofamex/AAC/server/api/service"

	db "github.com/nofamex/AAC/server/db/sqlc"
	"github.com/nofamex/AAC/server/token"
	"github.com/nofamex/AAC/server/util"
)

type ElimSandwichController struct {
	service      service.ElimSandwichService
	userService  service.UserService
	compeService service.CompeService
	tokenMaker   token.Maker
	config       util.Config
}

func NewElimSandwichController(query db.Querier, maker token.Maker, config util.Config) (elimSandwichController *ElimSandwichController) {
	elimSandwichService := service.NewElimSandwichService(query)
	userService := service.NewUserService(query)
	compeService := service.NewCompeService(query)
	elimSandwichController = &ElimSandwichController{
		service:      *elimSandwichService,
		userService:  *userService,
		compeService: *compeService,
		tokenMaker:   maker,
		config:       config,
	}

	return
}

func (u *ElimSandwichController) Start(c *fiber.Ctx) error {
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

	// paket
	paketStr := c.Params("paket")
	var paket int
	switch paketStr {
	case "A":
		paket = 4
	case "B":
		paket = 5
	case "C":
		paket = 6
	default:
		return c.Status(http.StatusUnprocessableEntity).JSON(Message{Message: "Paket tidak ada"})
	}

	// cek belom ada team
	elim, err := u.service.GetElimSandwichByTeamId(int(user.TeamID.Int32), token)
	if elim != nil && elim.Paket != int32(paket) {
		switch elim.Paket {
		case 4:
			paketStr = "A"
		case 5:
			paketStr = "B"
		case 6:
			paketStr = "C"
		}
		return c.Status(http.StatusUnprocessableEntity).JSON(Message{Message: "User sudah mengerjakan paket " + paketStr})
	} else if elim != nil {
		return c.Status(http.StatusOK).JSON(Message{Message: "ok"})
	}

	// cek udah bayar
	if team.StatusPaymentPrelim != "verified" {
		return c.Status(http.StatusUnprocessableEntity).JSON(Message{Message: "Belum di verifikasi"})
	}

	// generate sequence
	pgIds, err := u.service.GetSandwichPgIdByPaket(paket)
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}
	// create pr elim tac master
	_, err = u.service.CreateElimMaster(int(user.TeamID.Int32))
	if err != nil && !strings.Contains(err.Error(), "duplicate key") {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	// check if paket is allready used
	sandwich, err := u.service.GetElimSandwichByPaket(int(user.TeamID.Int32), paket)
	if sandwich != nil {
		return c.Status(http.StatusUnprocessableEntity).JSON(Message{Message: "paket sudah di kerjakan"})
	}

	order := util.RandomOrderSandwich(pgIds)

	sandwich, err = u.service.CreateElimSandwitch(int(user.TeamID.Int32), paket, token, order)
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}
	err = u.compeService.UpdateElimStatus(int(user.TeamID.Int32), "ongoing")
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	err = u.compeService.UpdateSandwichStatus(int(user.TeamID.Int32), "ongoing", paketStr)
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	return c.Status(http.StatusOK).JSON(sandwich)
}

func (u *ElimSandwichController) Finish(c *fiber.Ctx) error {
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
	sandwich, err := u.service.GetElimSandwichByTeamId(int(user.TeamID.Int32), token)
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusBadRequest).JSON(Message{Message: err.Error()})
	}
	var paket string
	switch sandwich.Paket {
	case 4:
		paket = "A"
	case 5:
		paket = "B"
	case 6:
		paket = "C"
	}
	err = u.compeService.UpdateSandwichStatus(int(user.TeamID.Int32), "selesai", paket)
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	err = u.service.UpdateSubmitedSandwich(int(user.TeamID.Int32), token)
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	return c.Status(http.StatusOK).JSON(Message{Message: "ok"})
}

// submit
func (u *ElimSandwichController) Submit(c *fiber.Ctx) error {
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

	err = u.service.CreateSandwichJawaban(int(user.TeamID.Int32), requestBody.SoalId, requestBody.Jawaban, token)
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}
	return c.Status(http.StatusOK).JSON(Message{Message: "ok"})
}

// get soal
func (u *ElimSandwichController) GetSoal(c *fiber.Ctx) error {
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

	sandwich, err := u.service.GetElimSandwichByTeamId(int(user.TeamID.Int32), token)
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusBadRequest).JSON(Message{Message: err.Error()})
	}
	page := sandwich.LastPage
	if page > 2 {
		return c.Status(http.StatusBadRequest).JSON(Message{Message: "already submited last page"})
	}

	var order []int
	err = json.Unmarshal([]byte(sandwich.Orders), &order)
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
		soal, _ := u.service.GetSandwichPg(id)
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
func (u *ElimSandwichController) NextPage(c *fiber.Ctx) error {
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

	_, err = u.service.GetElimSandwichByTeamId(int(user.TeamID.Int32), token)
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusBadRequest).JSON(Message{Message: err.Error()})
	}

	err = u.service.UpdatePageSandwich(int(user.TeamID.Int32), token)
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	return c.Status(http.StatusOK).JSON(Message{Message: "ok"})
}
