package service

import (
	"context"

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