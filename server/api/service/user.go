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

func (u *UserService) RegisterUser(user *db.RegisterUserParams) (*db.User, error) {
	result, err := u.query.RegisterUser(context.Background(), *user)
	if err != nil {
		return nil, err
	}
	return &result, err
}

func (u *UserService) GetUserByEmail(email string) (*db.GetUserByEmailRow, error) {
	result, err := u.query.GetUserByEmail(context.Background(), email)
	if err != nil {
		return nil, err
	}

	return &result, err
}

func (u *UserService) GetUserById(id int) (*db.User, error) {
	result, err := u.query.GetUserById(context.Background(), int32(id))
	if err != nil {
		return nil, err
	}

	return &result, err
}

func (u *UserService) UpdatePassword(id int, password string) error {
	param := db.UpdatePasswordParams{
		ID: int32(id),
		Password: password,
	}
	return u.query.UpdatePassword(context.Background(), param)
}

func (u *UserService) SetRefreshToken(email string, token string) error {
	refreshToken := sql.NullString{
		String: token,
		Valid:  true,
	}

	param := db.SetRefreshTokenParams{
		Email:        email,
		RefreshToken: refreshToken,
	}

	err := u.query.SetRefreshToken(context.Background(), param)
	return err
}
