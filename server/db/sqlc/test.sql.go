// Code generated by sqlc. DO NOT EDIT.
// source: test.sql

package db

import (
	"context"
	"database/sql"
)

const createAccount = `-- name: CreateAccount :one
INSERT INTO account (
    username
) VALUES (
    $1
) RETURNING id, username
`

func (q *Queries) CreateAccount(ctx context.Context, username sql.NullString) (Account, error) {
	row := q.db.QueryRowContext(ctx, createAccount, username)
	var i Account
	err := row.Scan(&i.ID, &i.Username)
	return i, err
}