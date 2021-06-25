package service

import (
	"context"

	db "github.com/nofamex/AAC/server/db/sqlc"
)

type TestService struct {
	query db.Querier
}

func NewTestService(query db.Querier) *TestService {
	return &TestService{query: query}
}

func (t *TestService) CreateAccount(account *db.Account) (*db.Account, error) {
	result, err := t.query.CreateAccount(context.Background(), account.Username)
	if err != nil {
		return nil, err
	}
	return &result, err
}