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

	_, err = u.compeService.GetTeamById(user.TeamID.Int32)
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	// cek belom ada team
	elim, err := u.service.GetElimSandwichByTeamId(int(user.TeamID.Int32), token)
	if elim != nil {
		return c.Status(http.StatusOK).JSON(Message{Message: "User sudah terdaftar"})
	}

	// // cek udah bayar
	// if team.Status != "berhasil" {
	// 	return c.Status(http.StatusUnprocessableEntity).JSON(Message{Message: "Belum di verifikasi"})
	// }
	// // random paket
	paket, arr := util.RandomPaketSandwich()
	// // generate sequence
	order := util.RandomOrderSandwich(arr[0])
	// // create prelim tac master
	_, err = u.service.CreateElimMaster(int(user.TeamID.Int32), paket)
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	sandwich, err := u.service.CreateElimSandwitch(int(user.TeamID.Int32), arr[0], token, order)
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}
	// err = u.compeService.UpdatePrelimStatus(int(user.TeamID.Int32), "ongoing")
	// if err != nil {
	// 	log.Println(err)
	// 	return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	// }
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

	_, err = u.userService.GetUserById(int(payload.UserId))
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	// err = u.compeService.UpdatePrelimStatus(int(user.TeamID.Int32), "selesai")
	// if err != nil {
	// 	log.Println(err)
	// 	return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	// }

	// err = u.service.UpdateSubmitedTac(int(user.TeamID.Int32))
	// if err != nil {
	// 	log.Println(err)
	// 	return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	// }

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

	_, err = u.userService.GetUserById(int(payload.UserId))
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

	// err = u.service.CreatePrelimTacPg(int(user.TeamID.Int32), requestBody.SoalId, requestBody.Jawaban)
	// if err != nil {
	// 	log.Println(err)
	// 	return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	// }
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

	_, err = u.userService.GetUserById(int(payload.UserId))
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	return c.Status(http.StatusOK).JSON(Message{Message: "ok"})
	// page, err := u.service.GetPagePrelimTac(int(user.TeamID.Int32))
	// if err != nil {
	// 	log.Println(err)
	// 	return c.Status(http.StatusBadRequest).JSON(Message{Message: err.Error()})
	// }

	// if page > 4 {
	// 	return c.Status(http.StatusBadRequest).JSON(Message{Message: "already submited last page"})
	// }
	// prelim, err := u.service.GetTeamById(int(user.TeamID.Int32))
	// if prelim.Token != token {
	// 	return c.Status(http.StatusBadRequest).JSON(Message{Message: "token doesn't match"})
	// }

	// var order []int
	// err = json.Unmarshal([]byte(prelim.Orders), &order)
	// if err != nil {
	// 	log.Println(err)
	// 	return c.Status(http.StatusInternalServerError).JSON(Message{Message: "order failed"})
	// }

	// // tolong ganti kalo udah ga simul

	// resPage := PageResponse{
	// 	Page: int(page),
	// }
	// order = order[5*(page-1) : 5*(page)]
	// res := []Soal{}
	// for i, id := range order {
	// 	soal, _ := u.service.GetPrelimTacPg(id)
	// 	res = append(res, Soal{
	// 		Id:       int(soal.ID),
	// 		No:       int(page-1)*5 + i + 1,
	// 		Soal:     soal.Soal,
	// 		Pilihan1: soal.Pilihan1,
	// 		Pilihan2: soal.Pilihan2,
	// 		Pilihan3: soal.Pilihan3,
	// 		Pilihan4: soal.Pilihan4,
	// 		Bobot:    int(soal.Bobot),
	// 	})
	// 	resPage.Paket = int(soal.Paket)
	// }
	// resPage.Body = res
	// return c.Status(http.StatusOK).JSON(resPage)
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

	_, err = u.userService.GetUserById(int(payload.UserId))
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	}

	// prelim, err := u.service.GetTeamById(int(user.TeamID.Int32))
	// if prelim.Token != token {
	// 	return c.Status(http.StatusBadRequest).JSON(Message{Message: "token doesn't match"})
	// }

	// // tolong ganti kalo udah ga simul
	// err = u.service.NextPagePrelimTac(int(user.TeamID.Int32))
	// if err != nil {
	// 	log.Println(err)
	// 	return c.Status(http.StatusInternalServerError).JSON(Message{Message: err.Error()})
	// }

	return c.Status(http.StatusOK).JSON(Message{Message: "ok"})
}
