-- name: CreateTeam :one
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
) RETURNING *;

-- name: GetTeamsPagination :many
SELECT * FROM team
ORDER BY id
OFFSET $1
LIMIT $2;

-- name: GetTeamById :one
SELECT * FROM team
WHERE id = $1 LIMIT 1;

-- name: UpdateVerifiedStatus :exec
UPDATE team
set verified = $2
where id = $1;

-- name: UpdatePrelimStatus :exec
UPDATE team
set status_prelim = $2
where id = $1;

-- name: UpdateElimStatus :exec
UPDATE team
set status_elim = $2
where id = $1;

-- name: UpdateSandwichAStatus :exec
UPDATE team
set status_sandwich_a = $2
where id = $1;

-- name: UpdateSandwichBStatus :exec
UPDATE team
set status_sandwich_b = $2
where id = $1;

-- name: UpdateSandwichCStatus :exec
UPDATE team
set status_sandwich_c = $2
where id = $1;

-- name: UpdateScratchStatus :exec
UPDATE team
set status_scratch = $2
where id = $1;

-- name: UpdateRescueStatus :exec
UPDATE team
set status_rescue = $2
where id = $1;