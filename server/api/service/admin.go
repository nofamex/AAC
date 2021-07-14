package service

import (
	"context"

	"github.com/nofamex/AAC/server/api/model"
	db "github.com/nofamex/AAC/server/db/sqlc"
)

type AdminService struct {
	query db.Querier
}

func NewAdminService(query db.Querier) *AdminService {
	return &AdminService{query: query}
}

func (u *AdminService) GetTeamsPagination(offset, limit int32) ([]model.RegisterTeamRequest, error) {
	param := db.GetTeamsPaginationParams{
		Offset: offset,
		Limit:  limit,
	}

	teamsDb, err := u.query.GetTeamsPagination(context.Background(), param)
	if err != nil {
		return nil, err
	}

	teams := make([]model.RegisterTeamRequest, 0)
	for _, team := range teamsDb {
		temp := model.RegisterTeamRequest{
			TeamName:    team.TeamName,
			University:  team.University,
			FullName:    team.FullName,
			Phone:       team.Phone,
			IDLine:      team.IDLine,
			Email:       team.Email,
			PhotoLink:   team.PhotoLink,
			PaymentLink: team.PaymentLink,
			CardLink:    team.CardLink,
			SkLink:      team.SkLink.String,
			Type:        team.Type,
		}
		teams = append(teams, temp)
	}

	return teams, nil
}

func (u *AdminService) Verify(id int32, status string) error {
	param := db.UpdateVerifiedStatusParams{
		ID:       id,
		Verified: status,
	}
	return u.query.UpdateVerifiedStatus(context.Background(), param)
}

func (u *AdminService) GetTeamById(id int32) (db.Team, error) {
	return u.query.GetTeamById(context.Background(), id)
}

