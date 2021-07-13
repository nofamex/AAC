// Code generated by sqlc. DO NOT EDIT.

package db

import (
	"database/sql"
	"time"
)

type Member struct {
	ID           int32          `json:"id"`
	FullName     string         `json:"full_name"`
	BirthPlace   string         `json:"birth_place"`
	BirthDate    time.Time      `json:"birth_date"`
	Nisn         sql.NullString `json:"nisn"`
	TeamID       int32          `json:"team_id"`
	MemberNumber int32          `json:"member_number"`
}

type Team struct {
	ID          int32          `json:"id"`
	TeamName    string         `json:"team_name"`
	University  string         `json:"university"`
	FullName    string         `json:"full_name"`
	Phone       string         `json:"phone"`
	IDLine      string         `json:"id_line"`
	Email       string         `json:"email"`
	PhotoLink   string         `json:"photo_link"`
	PaymentLink string         `json:"payment_link"`
	CardLink    string         `json:"card_link"`
	SkLink      sql.NullString `json:"sk_link"`
	Type        string         `json:"type"`
	Verified    string         `json:"verified"`
}

type User struct {
	ID           int32          `json:"id"`
	FullName     string         `json:"full_name"`
	Email        string         `json:"email"`
	Password     string         `json:"password"`
	RefreshToken sql.NullString `json:"refresh_token"`
	TeamID       sql.NullInt32  `json:"team_id"`
	Role         sql.NullString `json:"role"`
}
