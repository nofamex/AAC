-- name: CreateAccount :one
INSERT INTO account (
    username
) VALUES (
    $1
) RETURNING *;