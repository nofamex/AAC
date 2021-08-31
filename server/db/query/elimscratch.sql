-- name: GetscratchByTeamId :one
SELECT * from scratch_the_hidden_words_master
WHERE team_id = $1;

-- name: CreatescratchMaster :one
INSERT INTO  scratch_the_hidden_words_master (
  team_id,
  token
) VALUES (
  $1, $2
) RETURNING *;

-- name: CreatescratchJawaban :exec
INSERT INTO scratch_the_hidden_words_jawaban (
  team_id,
  soal_id,
  jawaban
) VALUES (
  $1, $2, $3
)
ON CONFLICT (team_id, soal_id)  DO UPDATE SET jawaban = EXCLUDED.jawaban;

-- name: UpdateSubmitedscratch :exec
UPDATE scratch_the_hidden_words_master
SET submited = now()
WHERE team_id = $1;

-- name: GetscratchSoal :many
select * from elim_unac_scratch_the_hidden_words
order by id;