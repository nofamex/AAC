// Code generated by sqlc. DO NOT EDIT.

package db

import (
	"context"
	"database/sql"
)

type Querier interface {
	CreateAccount(ctx context.Context, username sql.NullString) (Account, error)
}

var _ Querier = (*Queries)(nil)