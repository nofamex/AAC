-- name: CreateMember :one
INSERT INTO  member (
  full_name,
  birth_place,
  birth_date,
  nisn,
  team_id,
  member_number
) VALUES (
  $1, $2, $3, $4, $5, $6
) RETURNING *;

-- name: GetMemberById :one
SELECT * FROM member
WHERE id = $1 LIMIT 1;

-- name: GetMemberByTeamId :many
SELECT * FROM member
WHERE team_id = $1;
