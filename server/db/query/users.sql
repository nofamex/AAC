-- name: RegisterUser :one
INSERT INTO users (
  full_name,
  email,
  password
) VALUES (
  $1, $2, $3
) RETURNING *;

-- name: AddTeamIdToUser :exec
UPDATE users
set team_id = $1;

-- name: SetRefreshToken :exec
UPDATE users
SET refresh_token = $2
WHERE email = $1;

-- name: GetUserByEmail :one
SELECT * FROM users
WHERE email = $1 LIMIT 1;

-- name: GetUserById :one
SELECT * FROM users
WHERE id = $1 LIMIT 1;
