package service

import (
	"context"

	db "github.com/nofamex/AAC/server/db/sqlc"
)

type AdminService struct {
	query db.Querier
}

func NewAdminService(query db.Querier) *AdminService {
	return &AdminService{query: query}
}

func (u *AdminService) GetTeamsPagination(offset, limit int32) ([]db.Team, error) {
	param := db.GetTeamsPaginationParams{
		Offset: offset,
		Limit:  limit,
	}
	return u.query.GetTeamsPagination(context.Background(), param)
}
