package controller

import (
	"database/sql"
	"net/http"
	"time"

	"github.com/go-playground/validator"
	"github.com/gofiber/fiber/v2"
	"github.com/lib/pq"
	"github.com/nofamex/AAC/server/api/service"

	db "github.com/nofamex/AAC/server/db/sqlc"
	"github.com/nofamex/AAC/server/token"
	"github.com/nofamex/AAC/server/util"
)

type CompeController struct {
	service    service.CompeService
	tokenMaker token.Maker
	config     util.Config
}

func NewCompeController(query db.Querier, maker token.Maker, config util.Config) (compeController *CompeController) {
	compeService := service.NewCompeService(query)
	compeController = &CompeController{
		service:    *compeService,
		tokenMaker: maker,
		config:     config,
	}

	return
}

type Member struct {
	FullName     string    `json:"full_name" validate:"required"`
	BirthPlace   string    `json:"birth_place" validate:"required"`
	BirthDate    time.Time `json:"birth_date" validate:"required"`
	Nisn         string    `json:"nisn" validate:"omitempty,numeric"`
	MemberNumber int       `json:"member_number" validate:"required,numeric"`
}

type RegisterTeamRequest struct {
	TeamName    string         `json:"team_name" validate:"required"`
	University  string         `json:"university" validate:"required"`
	FullName    string         `json:"full_name" validate:"required"`
	Phone       string         `json:"phone" validate:"required"`
	IDLine      string         `json:"id_line" validate:"required"`
	Email       string         `json:"email" validate:"required,email"`
	PhotoLink   string         `json:"photo_link" validate:"required,url"`
	PaymentLink string         `json:"payment_link" validate:"required,url"`
	CardLink    string         `json:"card_link" validate:"required,url"`
	SkLink      string         `json:"sk_link" validate:"omitempty,url"`
	Type        db.Competition `json:"type" validate:"required"`
	Members     []Member       `json:"members" validate:"gt=0,required,dive,required"`
}

// register
func (u *CompeController) Register(c *fiber.Ctx) error {
	var requestBody RegisterTeamRequest
	err := c.BodyParser(&requestBody)
	if err != nil {
		return c.Status(http.StatusBadRequest).SendString(err.Error())
	}

	validate := validator.New()
	err = validate.Struct(requestBody)
	if err != nil {
		return c.Status(http.StatusBadRequest).SendString(err.Error())
	}

	var SkLink sql.NullString
	if requestBody.SkLink == "" {
		SkLink = sql.NullString{
			Valid: false,
		}
	} else {
		SkLink = sql.NullString{
			Valid:  true,
			String: requestBody.SkLink,
		}
	}

	createTeamParams := db.CreateTeamParams{
		TeamName:    requestBody.TeamName,
		University:  requestBody.University,
		FullName:    requestBody.FullName,
		Phone:       requestBody.Phone,
		IDLine:      requestBody.IDLine,
		Email:       requestBody.Email,
		PhotoLink:   requestBody.PhotoLink,
		PaymentLink: requestBody.PaymentLink,
		CardLink:    requestBody.CardLink,
		SkLink:      SkLink,
		Type:        requestBody.Type,
	}

	_, err = u.service.CreateTeam(&createTeamParams)
	if err != nil {
		if pqErr, ok := err.(*pq.Error); ok {
			switch pqErr.Code.Name() {
			case "unique_violation":
				return c.Status(http.StatusForbidden).SendString("duplicate email")
			}
		}
		return c.Status(http.StatusInternalServerError).SendString(err.Error())
	}
	// todo create member service

	return c.Status(http.StatusOK).SendString("ok")
}
