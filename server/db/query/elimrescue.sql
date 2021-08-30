-- name: GetRescueByTeamId :one
SELECT * from rescue_the_number_master
WHERE team_id = $1;

-- name: CreateRescueMaster :one
INSERT INTO  rescue_the_number_master (
  team_id,
  token
) VALUES (
  $1, $2
) RETURNING *;

-- name: CreateRescueJawaban :exec
INSERT INTO rescue_the_number_jawaban (
  team_id,
  soal_id,
  jawaban
) VALUES (
  $1, $2, $3
)
ON CONFLICT (team_id, soal_id)  DO UPDATE SET jawaban = EXCLUDED.jawaban;

-- name: UpdateSubmitedRescue :exec
UPDATE rescue_the_number_master
SET submited = now()
WHERE team_id = $1;

-- name: GetRescueSoal :many
select * from elim_unac_rescue_the_number
order by id;