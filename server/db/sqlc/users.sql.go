// Code generated by sqlc. DO NOT EDIT.
// source: users.sql

package db

import (
	"context"
	"database/sql"
)

const createUser = `-- name: CreateUser :one
INSERT INTO users (
    first_name,
    last_name,
    username,
    password
) VALUES (
    $1, $2, $3, $4
) RETURNING id, first_name, last_name, username, password, refresh_token
`

type CreateUserParams struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Username  string `json:"username"`
	Password  string `json:"password"`
}

func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (User, error) {
	row := q.db.QueryRowContext(ctx, createUser,
		arg.FirstName,
		arg.LastName,
		arg.Username,
		arg.Password,
	)
	var i User
	err := row.Scan(
		&i.ID,
		&i.FirstName,
		&i.LastName,
		&i.Username,
		&i.Password,
		&i.RefreshToken,
	)
	return i, err
}

const getUser = `-- name: GetUser :one
SELECT id, first_name, last_name, username, password, refresh_token FROM users
WHERE username = $1 LIMIT 1
`

func (q *Queries) GetUser(ctx context.Context, username string) (User, error) {
	row := q.db.QueryRowContext(ctx, getUser, username)
	var i User
	err := row.Scan(
		&i.ID,
		&i.FirstName,
		&i.LastName,
		&i.Username,
		&i.Password,
		&i.RefreshToken,
	)
	return i, err
}

const setRefreshToken = `-- name: SetRefreshToken :exec
UPDATE users
SET refresh_token = $2
WHERE username = $1
`

type SetRefreshTokenParams struct {
	Username     string         `json:"username"`
	RefreshToken sql.NullString `json:"refresh_token"`
}

func (q *Queries) SetRefreshToken(ctx context.Context, arg SetRefreshTokenParams) error {
	_, err := q.db.ExecContext(ctx, setRefreshToken, arg.Username, arg.RefreshToken)
	return err
}
