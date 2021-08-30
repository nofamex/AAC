// Code generated by sqlc. DO NOT EDIT.
// source: elimrescue.sql

package db

import (
	"context"
)

const createRescueJawaban = `-- name: CreateRescueJawaban :exec
INSERT INTO rescue_the_number_jawaban (
  team_id,
  soal_id,
  jawaban
) VALUES (
  $1, $2, $3
)
ON CONFLICT (team_id, soal_id)  DO UPDATE SET jawaban = EXCLUDED.jawaban
`

type CreateRescueJawabanParams struct {
	TeamID  int32 `json:"team_id"`
	SoalID  int32 `json:"soal_id"`
	Jawaban int32 `json:"jawaban"`
}

func (q *Queries) CreateRescueJawaban(ctx context.Context, arg CreateRescueJawabanParams) error {
	_, err := q.db.ExecContext(ctx, createRescueJawaban, arg.TeamID, arg.SoalID, arg.Jawaban)
	return err
}

const createRescueMaster = `-- name: CreateRescueMaster :one
INSERT INTO  rescue_the_number_master (
  team_id,
  token
) VALUES (
  $1, $2
) RETURNING id, team_id, token, benar, salah, score, submited
`

type CreateRescueMasterParams struct {
	TeamID int32  `json:"team_id"`
	Token  string `json:"token"`
}

func (q *Queries) CreateRescueMaster(ctx context.Context, arg CreateRescueMasterParams) (RescueTheNumberMaster, error) {
	row := q.db.QueryRowContext(ctx, createRescueMaster, arg.TeamID, arg.Token)
	var i RescueTheNumberMaster
	err := row.Scan(
		&i.ID,
		&i.TeamID,
		&i.Token,
		&i.Benar,
		&i.Salah,
		&i.Score,
		&i.Submited,
	)
	return i, err
}

const getRescueByTeamId = `-- name: GetRescueByTeamId :one
SELECT id, team_id, token, benar, salah, score, submited from rescue_the_number_master
WHERE team_id = $1
`

func (q *Queries) GetRescueByTeamId(ctx context.Context, teamID int32) (RescueTheNumberMaster, error) {
	row := q.db.QueryRowContext(ctx, getRescueByTeamId, teamID)
	var i RescueTheNumberMaster
	err := row.Scan(
		&i.ID,
		&i.TeamID,
		&i.Token,
		&i.Benar,
		&i.Salah,
		&i.Score,
		&i.Submited,
	)
	return i, err
}

const getRescueSoal = `-- name: GetRescueSoal :many
select id, soal, jawaban, bobot from elim_unac_rescue_the_number
`

func (q *Queries) GetRescueSoal(ctx context.Context) ([]ElimUnacRescueTheNumber, error) {
	rows, err := q.db.QueryContext(ctx, getRescueSoal)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []ElimUnacRescueTheNumber
	for rows.Next() {
		var i ElimUnacRescueTheNumber
		if err := rows.Scan(
			&i.ID,
			&i.Soal,
			&i.Jawaban,
			&i.Bobot,
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

const updateSubmitedRescue = `-- name: UpdateSubmitedRescue :exec
UPDATE rescue_the_number_master
SET submited = now()
WHERE team_id = $1
`

func (q *Queries) UpdateSubmitedRescue(ctx context.Context, teamID int32) error {
	_, err := q.db.ExecContext(ctx, updateSubmitedRescue, teamID)
	return err
}
