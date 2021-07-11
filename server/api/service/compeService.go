package service

import (
	"context"

	db "github.com/nofamex/AAC/server/db/sqlc"
)

type CompeService struct {
	query db.Querier
}

func NewCompeService(query db.Querier) *CompeService {
	return &CompeService{query: query}
}

func (u *CompeService) CreateTeam(user *db.CreateTeamParams) (*db.Team, error) {
	result, err := u.query.CreateTeam(context.Background(), *user)
	if err != nil {
		return nil, err
	}
	return &result, err
}
