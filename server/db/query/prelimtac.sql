-- name: GetPrelimTacByTeamId :one
SELECT * from prelim_tac_master
WHERE team_id = $1;

-- name: CreatePrelimTac :one
INSERT INTO  prelim_tac_master (
  team_id,
  token,
  orders,
  paket,
  score
) VALUES (
  $1, $2, $3, $4, $5
) RETURNING *;

-- name: GetPrelimTacPgById :one
SELECT * from prelim_tac_pg
WHERE id = $1;


-- name: CreatePrelimTacPgJawaban :exec
INSERT INTO prelim_tac_pg_jawaban (
  team_id,
  soal_id,
  jawaban
) VALUES (
  $1, $2, $3
)
ON CONFLICT (team_id, soal_id)  DO UPDATE SET jawaban = EXCLUDED.jawaban;

-- name: GetPagePrelimTac :one
SELECT last_page FROM prelim_tac_master
WHERE team_id = $1;

-- name: UpdatePagePrelimTac :exec
UPDATE prelim_tac_master
SET last_page = last_page + 1
WHERE team_id = $1;

-- name: UpdateSubmitedPrelimTac :exec
UPDATE prelim_tac_master
SET submited = now()
WHERE team_id = $1;