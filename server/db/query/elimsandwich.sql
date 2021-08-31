-- name: GetElimMasterByTeamId :one
SELECT * from elim_unac_master
WHERE team_id = $1;

-- name: GetElimSandwichByTeamId :one
SELECT * from battle_of_sandwich_master
WHERE team_id = $1
AND token = $2;

-- name: GetElimSandwichByPaket :one
SELECT * from battle_of_sandwich_master
WHERE team_id = $1
AND paket = $2;

-- name: CreateElimMaster :one
INSERT INTO  elim_unac_master (
  team_id
) VALUES (
  $1
) RETURNING *;

-- name: CreateElimSandwich :one
INSERT INTO  battle_of_sandwich_master (
  team_id,
  token,
  orders,
  paket
) VALUES (
  $1, $2, $3, $4
) RETURNING *;

-- name: GetElimSandwichById :one
SELECT * from elim_unac_battle_of_sandwich
WHERE id = $1;

-- name: CreateSandwichJawaban :exec
INSERT INTO battle_of_sandwich_jawaban (
  team_id,
  soal_id,
  token,
  jawaban
) VALUES (
  $1, $2, $3, $4
)
ON CONFLICT (team_id, soal_id, token)  DO UPDATE SET jawaban = EXCLUDED.jawaban;

-- name: GetPageElimSandwich :one
SELECT last_page FROM battle_of_sandwich_master
WHERE team_id = $1;

-- name: UpdatePageElimSandwich :exec
UPDATE battle_of_sandwich_master
SET last_page = last_page + 1
WHERE team_id = $1;

-- name: UpdateSubmitedElimSandwich :exec
UPDATE battle_of_sandwich_master
SET submited = now()
WHERE team_id = $1;

-- name: GetSandwichPgIdByPaket :many
SELECT id from elim_unac_battle_of_sandwich where paket = $1;

-- name: GetPageSandwich :one
SELECT last_page FROM battle_of_sandwich_master
WHERE team_id = $1
AND token = $2;

-- name: GetSandwichPg :one
SELECT * from elim_unac_battle_of_sandwich
WHERE id = $1;

-- name: UpdatePageSandwich :exec
UPDATE battle_of_sandwich_master
SET last_page = last_page + 1
WHERE team_id = $1
AND token = $2;

-- name: UpdateSubmitedSandwich :exec
UPDATE battle_of_sandwich_master
SET submited = now()
WHERE team_id = $1
AND token = $2;