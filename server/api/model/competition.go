package model

import (
	"time"

	db "github.com/nofamex/AAC/server/db/sqlc"
)

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
