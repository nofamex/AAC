-- name: CreateUser :one
INSERT INTO users (
    first_name,
    last_name,
    username,
    password
) VALUES (
    $1, $2, $3, $4
) RETURNING *;

-- name: GetUser :one
SELECT * FROM users
WHERE username = $1 LIMIT 1;

-- name: SetRefreshToken :exec
UPDATE users
SET refresh_token = $2
WHERE username = $1;