// Code generated by sqlc. DO NOT EDIT.

package db

import (
	"database/sql"
)

type Account struct {
	ID       int64          `json:"id"`
	Username sql.NullString `json:"username"`
}
