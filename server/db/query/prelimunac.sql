-- name: GetPrelimUnacByTeamId :one
SELECT * from prelim_unac_master
WHERE team_id = $1;

-- name: CreatePrelimUnac :one
INSERT INTO  prelim_unac_master (
  team_id,
  token,
  orders,
  paket,
  score
) VALUES (
  $1, $2, $3, $4, $5
) RETURNING *;

-- name: GetPrelimUnacPgById :one
SELECT * from prelim_unac_pg
WHERE id = $1;

-- name: GetPrelimUnacIsianById :one
SELECT * from prelim_unac_isian
WHERE id = $1;

-- name: CreatePrelimUnacPgJawaban :exec
INSERT INTO prelim_unac_pg_jawaban (
  team_id,
  soal_id,
  jawaban
) VALUES (
  $1, $2, $3
)
ON CONFLICT (team_id, soal_id) DO UPDATE SET jawaban = EXCLUDED.jawaban;

-- name: CreatePrelimUnacIsianJawaban :exec
INSERT INTO prelim_unac_isian_jawaban (
  team_id,
  soal_id,
  jawaban
) VALUES (
  $1, $2, $3
)
ON CONFLICT (team_id, soal_id) DO UPDATE SET jawaban = EXCLUDED.jawaban;;

-- name: GetPagePrelimUnac :one
SELECT last_page FROM prelim_unac_master
WHERE team_id = $1;

-- name: UpdatePagePrelimUnac :exec
UPDATE prelim_unac_master
SET last_page = last_page + 1
WHERE team_id = $1;