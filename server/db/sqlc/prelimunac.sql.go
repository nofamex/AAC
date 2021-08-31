// Code generated by sqlc. DO NOT EDIT.
// source: prelimunac.sql

package db

import (
	"context"
	"database/sql"
)

const createPrelimUnac = `-- name: CreatePrelimUnac :one
INSERT INTO  prelim_unac_master (
  team_id,
  token,
  orders,
  paket,
  score
) VALUES (
  $1, $2, $3, $4, $5
) RETURNING id, team_id, token, orders, paket, score, last_page, submited, benar, salah, kosong, status_bayar, status_lolos, payment_link
`

type CreatePrelimUnacParams struct {
	TeamID int32  `json:"team_id"`
	Token  string `json:"token"`
	Orders string `json:"orders"`
	Paket  int32  `json:"paket"`
	Score  int32  `json:"score"`
}

func (q *Queries) CreatePrelimUnac(ctx context.Context, arg CreatePrelimUnacParams) (PrelimUnacMaster, error) {
	row := q.db.QueryRowContext(ctx, createPrelimUnac,
		arg.TeamID,
		arg.Token,
		arg.Orders,
		arg.Paket,
		arg.Score,
	)
	var i PrelimUnacMaster
	err := row.Scan(
		&i.ID,
		&i.TeamID,
		&i.Token,
		&i.Orders,
		&i.Paket,
		&i.Score,
		&i.LastPage,
		&i.Submited,
		&i.Benar,
		&i.Salah,
		&i.Kosong,
		&i.StatusBayar,
		&i.StatusLolos,
		&i.PaymentLink,
	)
	return i, err
}

const createPrelimUnacIsianJawaban = `-- name: CreatePrelimUnacIsianJawaban :exec
INSERT INTO prelim_unac_isian_jawaban (
  team_id,
  soal_id,
  jawaban
) VALUES (
  $1, $2, $3
)
ON CONFLICT (team_id, soal_id) DO UPDATE SET jawaban = EXCLUDED.jawaban
`

type CreatePrelimUnacIsianJawabanParams struct {
	TeamID  int32  `json:"team_id"`
	SoalID  int32  `json:"soal_id"`
	Jawaban string `json:"jawaban"`
}

func (q *Queries) CreatePrelimUnacIsianJawaban(ctx context.Context, arg CreatePrelimUnacIsianJawabanParams) error {
	_, err := q.db.ExecContext(ctx, createPrelimUnacIsianJawaban, arg.TeamID, arg.SoalID, arg.Jawaban)
	return err
}

const createPrelimUnacPgJawaban = `-- name: CreatePrelimUnacPgJawaban :exec
INSERT INTO prelim_unac_pg_jawaban (
  team_id,
  soal_id,
  jawaban
) VALUES (
  $1, $2, $3
)
ON CONFLICT (team_id, soal_id) DO UPDATE SET jawaban = EXCLUDED.jawaban
`

type CreatePrelimUnacPgJawabanParams struct {
	TeamID  int32 `json:"team_id"`
	SoalID  int32 `json:"soal_id"`
	Jawaban int32 `json:"jawaban"`
}

func (q *Queries) CreatePrelimUnacPgJawaban(ctx context.Context, arg CreatePrelimUnacPgJawabanParams) error {
	_, err := q.db.ExecContext(ctx, createPrelimUnacPgJawaban, arg.TeamID, arg.SoalID, arg.Jawaban)
	return err
}

const getPagePrelimUnac = `-- name: GetPagePrelimUnac :one
SELECT last_page FROM prelim_unac_master
WHERE team_id = $1
`

func (q *Queries) GetPagePrelimUnac(ctx context.Context, teamID int32) (int32, error) {
	row := q.db.QueryRowContext(ctx, getPagePrelimUnac, teamID)
	var last_page int32
	err := row.Scan(&last_page)
	return last_page, err
}

const getPrelimUnacByTeamId = `-- name: GetPrelimUnacByTeamId :one
SELECT id, team_id, token, orders, paket, score, last_page, submited, benar, salah, kosong, status_bayar, status_lolos, payment_link from prelim_unac_master
WHERE team_id = $1
`

func (q *Queries) GetPrelimUnacByTeamId(ctx context.Context, teamID int32) (PrelimUnacMaster, error) {
	row := q.db.QueryRowContext(ctx, getPrelimUnacByTeamId, teamID)
	var i PrelimUnacMaster
	err := row.Scan(
		&i.ID,
		&i.TeamID,
		&i.Token,
		&i.Orders,
		&i.Paket,
		&i.Score,
		&i.LastPage,
		&i.Submited,
		&i.Benar,
		&i.Salah,
		&i.Kosong,
		&i.StatusBayar,
		&i.StatusLolos,
		&i.PaymentLink,
	)
	return i, err
}

const getPrelimUnacIsianById = `-- name: GetPrelimUnacIsianById :one
SELECT id, soal, jawaban, bobot, paket from prelim_unac_isian
WHERE id = $1
`

func (q *Queries) GetPrelimUnacIsianById(ctx context.Context, id int32) (PrelimUnacIsian, error) {
	row := q.db.QueryRowContext(ctx, getPrelimUnacIsianById, id)
	var i PrelimUnacIsian
	err := row.Scan(
		&i.ID,
		&i.Soal,
		&i.Jawaban,
		&i.Bobot,
		&i.Paket,
	)
	return i, err
}

const getPrelimUnacPgById = `-- name: GetPrelimUnacPgById :one
SELECT id, soal, pilihan1, pilihan2, pilihan3, pilihan4, jawaban, bobot, paket from prelim_unac_pg
WHERE id = $1
`

func (q *Queries) GetPrelimUnacPgById(ctx context.Context, id int32) (PrelimUnacPg, error) {
	row := q.db.QueryRowContext(ctx, getPrelimUnacPgById, id)
	var i PrelimUnacPg
	err := row.Scan(
		&i.ID,
		&i.Soal,
		&i.Pilihan1,
		&i.Pilihan2,
		&i.Pilihan3,
		&i.Pilihan4,
		&i.Jawaban,
		&i.Bobot,
		&i.Paket,
	)
	return i, err
}

const getUnacIsianIdByPaket = `-- name: GetUnacIsianIdByPaket :many
SELECT id from prelim_unac_isian where paket = $1
`

func (q *Queries) GetUnacIsianIdByPaket(ctx context.Context, paket int32) ([]int32, error) {
	rows, err := q.db.QueryContext(ctx, getUnacIsianIdByPaket, paket)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []int32
	for rows.Next() {
		var id int32
		if err := rows.Scan(&id); err != nil {
			return nil, err
		}
		items = append(items, id)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getUnacPgIdByPaket = `-- name: GetUnacPgIdByPaket :many
SELECT id from prelim_unac_pg where paket = $1
`

func (q *Queries) GetUnacPgIdByPaket(ctx context.Context, paket int32) ([]int32, error) {
	rows, err := q.db.QueryContext(ctx, getUnacPgIdByPaket, paket)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []int32
	for rows.Next() {
		var id int32
		if err := rows.Scan(&id); err != nil {
			return nil, err
		}
		items = append(items, id)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updatePagePrelimUnac = `-- name: UpdatePagePrelimUnac :exec
UPDATE prelim_unac_master
SET last_page = last_page + 1
WHERE team_id = $1
`

func (q *Queries) UpdatePagePrelimUnac(ctx context.Context, teamID int32) error {
	_, err := q.db.ExecContext(ctx, updatePagePrelimUnac, teamID)
	return err
}

const updatePaymentPrelimUnac = `-- name: UpdatePaymentPrelimUnac :exec
UPDATE prelim_unac_master
SET payment_link = $2
WHERE team_id = $1
`

type UpdatePaymentPrelimUnacParams struct {
	TeamID      int32          `json:"team_id"`
	PaymentLink sql.NullString `json:"payment_link"`
}

func (q *Queries) UpdatePaymentPrelimUnac(ctx context.Context, arg UpdatePaymentPrelimUnacParams) error {
	_, err := q.db.ExecContext(ctx, updatePaymentPrelimUnac, arg.TeamID, arg.PaymentLink)
	return err
}

const updatePaymentStatusPrelimUnac = `-- name: UpdatePaymentStatusPrelimUnac :exec
UPDATE prelim_unac_master
SET status_bayar = $2
WHERE team_id = $1
`

type UpdatePaymentStatusPrelimUnacParams struct {
	TeamID      int32          `json:"team_id"`
	StatusBayar sql.NullString `json:"status_bayar"`
}

func (q *Queries) UpdatePaymentStatusPrelimUnac(ctx context.Context, arg UpdatePaymentStatusPrelimUnacParams) error {
	_, err := q.db.ExecContext(ctx, updatePaymentStatusPrelimUnac, arg.TeamID, arg.StatusBayar)
	return err
}

const updateSubmitedPrelimUnac = `-- name: UpdateSubmitedPrelimUnac :exec
UPDATE prelim_unac_master
SET submited = now()
WHERE team_id = $1
`

func (q *Queries) UpdateSubmitedPrelimUnac(ctx context.Context, teamID int32) error {
	_, err := q.db.ExecContext(ctx, updateSubmitedPrelimUnac, teamID)
	return err
}
