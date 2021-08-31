// Code generated by sqlc. DO NOT EDIT.
// source: elimscratch.sql

package db

import (
	"context"
)

const createScratchJawaban = `-- name: CreateScratchJawaban :exec
INSERT INTO scratch_the_hidden_words_jawaban (
  team_id,
  jawaban
) VALUES (
  $1, $2
)
ON CONFLICT (team_id, jawaban)  DO UPDATE SET jawaban = EXCLUDED.jawaban
`

type CreateScratchJawabanParams struct {
	TeamID  int32  `json:"team_id"`
	Jawaban string `json:"jawaban"`
}

func (q *Queries) CreateScratchJawaban(ctx context.Context, arg CreateScratchJawabanParams) error {
	_, err := q.db.ExecContext(ctx, createScratchJawaban, arg.TeamID, arg.Jawaban)
	return err
}

const createScratchMaster = `-- name: CreateScratchMaster :one
INSERT INTO  scratch_the_hidden_words_master (
  team_id,
  token
) VALUES (
  $1, $2
) RETURNING id, team_id, token, benar, salah, score, submited
`

type CreateScratchMasterParams struct {
	TeamID int32  `json:"team_id"`
	Token  string `json:"token"`
}

func (q *Queries) CreateScratchMaster(ctx context.Context, arg CreateScratchMasterParams) (ScratchTheHiddenWordsMaster, error) {
	row := q.db.QueryRowContext(ctx, createScratchMaster, arg.TeamID, arg.Token)
	var i ScratchTheHiddenWordsMaster
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

const getScratchByTeamId = `-- name: GetScratchByTeamId :one
SELECT id, team_id, token, benar, salah, score, submited from scratch_the_hidden_words_master
WHERE team_id = $1
`

func (q *Queries) GetScratchByTeamId(ctx context.Context, teamID int32) (ScratchTheHiddenWordsMaster, error) {
	row := q.db.QueryRowContext(ctx, getScratchByTeamId, teamID)
	var i ScratchTheHiddenWordsMaster
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

const getScratchSoal = `-- name: GetScratchSoal :many
select id, jawaban, benar from elim_unac_scratch_the_hidden_words
order by id
`

func (q *Queries) GetScratchSoal(ctx context.Context) ([]ElimUnacScratchTheHiddenWord, error) {
	rows, err := q.db.QueryContext(ctx, getScratchSoal)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []ElimUnacScratchTheHiddenWord
	for rows.Next() {
		var i ElimUnacScratchTheHiddenWord
		if err := rows.Scan(&i.ID, &i.Jawaban, &i.Benar); err != nil {
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

const updateSubmitedScratch = `-- name: UpdateSubmitedScratch :exec
UPDATE scratch_the_hidden_words_master
SET submited = now()
WHERE team_id = $1
`

func (q *Queries) UpdateSubmitedScratch(ctx context.Context, teamID int32) error {
	_, err := q.db.ExecContext(ctx, updateSubmitedScratch, teamID)
	return err
}
