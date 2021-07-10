// Code generated by sqlc. DO NOT EDIT.
// source: users.sql

package db

import (
	"context"
	"database/sql"
)

const addTeamIdToUser = `-- name: AddTeamIdToUser :exec
UPDATE users
set team_id = $1
`

func (q *Queries) AddTeamIdToUser(ctx context.Context, teamID sql.NullInt32) error {
	_, err := q.db.ExecContext(ctx, addTeamIdToUser, teamID)
	return err
}

const getUserByEmail = `-- name: GetUserByEmail :one
SELECT u.id, u.full_name, u.email, u.refresh_token, u.password, COALESCE(t.team_name, '') as team_name
FROM users u
LEFT JOIN team t on u.team_id = t.id
WHERE u.email = $1 LIMIT 1
`

type GetUserByEmailRow struct {
	ID           int32          `json:"id"`
	FullName     string         `json:"full_name"`
	Email        string         `json:"email"`
	RefreshToken sql.NullString `json:"refresh_token"`
	Password     string         `json:"password"`
	TeamName     string         `json:"team_name"`
}

func (q *Queries) GetUserByEmail(ctx context.Context, email string) (GetUserByEmailRow, error) {
	row := q.db.QueryRowContext(ctx, getUserByEmail, email)
	var i GetUserByEmailRow
	err := row.Scan(
		&i.ID,
		&i.FullName,
		&i.Email,
		&i.RefreshToken,
		&i.Password,
		&i.TeamName,
	)
	return i, err
}

const getUserById = `-- name: GetUserById :one
SELECT id, full_name, email, password, refresh_token, team_id FROM users
WHERE id = $1 LIMIT 1
`

func (q *Queries) GetUserById(ctx context.Context, id int32) (User, error) {
	row := q.db.QueryRowContext(ctx, getUserById, id)
	var i User
	err := row.Scan(
		&i.ID,
		&i.FullName,
		&i.Email,
		&i.Password,
		&i.RefreshToken,
		&i.TeamID,
	)
	return i, err
}

const registerUser = `-- name: RegisterUser :one
INSERT INTO users (
  full_name,
  email,
  password
) VALUES (
  $1, $2, $3
) RETURNING id, full_name, email, password, refresh_token, team_id
`

type RegisterUserParams struct {
	FullName string `json:"full_name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (q *Queries) RegisterUser(ctx context.Context, arg RegisterUserParams) (User, error) {
	row := q.db.QueryRowContext(ctx, registerUser, arg.FullName, arg.Email, arg.Password)
	var i User
	err := row.Scan(
		&i.ID,
		&i.FullName,
		&i.Email,
		&i.Password,
		&i.RefreshToken,
		&i.TeamID,
	)
	return i, err
}

const setRefreshToken = `-- name: SetRefreshToken :exec
UPDATE users
SET refresh_token = $2
WHERE email = $1
`

type SetRefreshTokenParams struct {
	Email        string         `json:"email"`
	RefreshToken sql.NullString `json:"refresh_token"`
}

func (q *Queries) SetRefreshToken(ctx context.Context, arg SetRefreshTokenParams) error {
	_, err := q.db.ExecContext(ctx, setRefreshToken, arg.Email, arg.RefreshToken)
	return err
}
