// Code generated by sqlc. DO NOT EDIT.
// source: team.sql

package db

import (
	"context"
	"database/sql"
)

const createTeam = `-- name: CreateTeam :one
INSERT INTO team (
  team_name,
  university,
  full_name,
  phone,
  id_line,
  email,
  photo_link,
  payment_link,
  card_link,
  sk_link,
  type
) VALUES (
  $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
) RETURNING id, team_name, university, full_name, phone, id_line, email, photo_link, payment_link, card_link, sk_link, type, verified
`

type CreateTeamParams struct {
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
}

func (q *Queries) CreateTeam(ctx context.Context, arg CreateTeamParams) (Team, error) {
	row := q.db.QueryRowContext(ctx, createTeam,
		arg.TeamName,
		arg.University,
		arg.FullName,
		arg.Phone,
		arg.IDLine,
		arg.Email,
		arg.PhotoLink,
		arg.PaymentLink,
		arg.CardLink,
		arg.SkLink,
		arg.Type,
	)
	var i Team
	err := row.Scan(
		&i.ID,
		&i.TeamName,
		&i.University,
		&i.FullName,
		&i.Phone,
		&i.IDLine,
		&i.Email,
		&i.PhotoLink,
		&i.PaymentLink,
		&i.CardLink,
		&i.SkLink,
		&i.Type,
		&i.Verified,
	)
	return i, err
}

const getTeamById = `-- name: GetTeamById :one
SELECT id, team_name, university, full_name, phone, id_line, email, photo_link, payment_link, card_link, sk_link, type, verified FROM team
WHERE id = $1 LIMIT 1
`

func (q *Queries) GetTeamById(ctx context.Context, id int32) (Team, error) {
	row := q.db.QueryRowContext(ctx, getTeamById, id)
	var i Team
	err := row.Scan(
		&i.ID,
		&i.TeamName,
		&i.University,
		&i.FullName,
		&i.Phone,
		&i.IDLine,
		&i.Email,
		&i.PhotoLink,
		&i.PaymentLink,
		&i.CardLink,
		&i.SkLink,
		&i.Type,
		&i.Verified,
	)
	return i, err
}

const getTeamsPagination = `-- name: GetTeamsPagination :many
SELECT id, team_name, university, full_name, phone, id_line, email, photo_link, payment_link, card_link, sk_link, type, verified FROM team
ORDER BY id
OFFSET $1
LIMIT $2
`

type GetTeamsPaginationParams struct {
	Offset int32 `json:"offset"`
	Limit  int32 `json:"limit"`
}

func (q *Queries) GetTeamsPagination(ctx context.Context, arg GetTeamsPaginationParams) ([]Team, error) {
	rows, err := q.db.QueryContext(ctx, getTeamsPagination, arg.Offset, arg.Limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Team
	for rows.Next() {
		var i Team
		if err := rows.Scan(
			&i.ID,
			&i.TeamName,
			&i.University,
			&i.FullName,
			&i.Phone,
			&i.IDLine,
			&i.Email,
			&i.PhotoLink,
			&i.PaymentLink,
			&i.CardLink,
			&i.SkLink,
			&i.Type,
			&i.Verified,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updateVerifiedStatus = `-- name: UpdateVerifiedStatus :exec
UPDATE team
set verified = $2
where id = $1
`

type UpdateVerifiedStatusParams struct {
	ID       int32  `json:"id"`
	Verified string `json:"verified"`
}

func (q *Queries) UpdateVerifiedStatus(ctx context.Context, arg UpdateVerifiedStatusParams) error {
	_, err := q.db.ExecContext(ctx, updateVerifiedStatus, arg.ID, arg.Verified)
	return err
}
