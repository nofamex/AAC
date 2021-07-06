package service

import (
	"context"
	"database/sql"

	db "github.com/nofamex/AAC/server/db/sqlc"
)

type UserService struct {
	query db.Querier
}

func NewUserService(query db.Querier) *UserService {
	return &UserService{query: query}
}

func (u *UserService) CreateUser(user *db.CreateUserParams) (*db.User, error) {
	result, err := u.query.CreateUser(context.Background(), *user)
	if err != nil {
		return nil, err
	}
	return &result, err
}

func (u *UserService) GetUser(username string) (*db.User, error) {
	result, err := u.query.GetUser(context.Background(), username)
	if err != nil {
		return nil, err
	}

	return &result, err
}

func (u *UserService) SetRefreshToken(username string, token string) (error) {
	refreshToken := sql.NullString{
		String: token,
		Valid: true,
	}

	param := db.SetRefreshTokenParams{
		Username: username,
		RefreshToken: refreshToken,
	}

	err := u.query.SetRefreshToken(context.Background(), param)
	return err
}