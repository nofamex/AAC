// Code generated by sqlc. DO NOT EDIT.

package db

import (
	"context"
)

type Querier interface {
	CreateAccount(ctx context.Context, username string) (Account, error)
}

var _ Querier = (*Queries)(nil)
