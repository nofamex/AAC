package service

import (
	"context"
	"database/sql"

	"github.com/nofamex/AAC/server/api/model"
	db "github.com/nofamex/AAC/server/db/sqlc"
)

type CompeService struct {
	query db.Querier
}

func NewCompeService(query db.Querier) *CompeService {
	return &CompeService{query: query}
}

func (u *CompeService) CreateTeam(requestBody *model.RegisterTeamRequest) (*db.Team, error) {
	var SkLink sql.NullString
	if requestBody.SkLink == "" {
		SkLink = sql.NullString{
			Valid: false,
		}
	} else {
		SkLink = sql.NullString{
			Valid:  true,
			String: requestBody.SkLink,
		}
	}

	user := db.CreateTeamParams{
		TeamName:    requestBody.TeamName,
		University:  requestBody.University,
		FullName:    requestBody.FullName,
		Phone:       requestBody.Phone,
		IDLine:      requestBody.IDLine,
		Email:       requestBody.Email,
		PhotoLink:   requestBody.PhotoLink,
		PaymentLink: requestBody.PaymentLink,
		CardLink:    requestBody.CardLink,
		SkLink:      SkLink,
		Type:        requestBody.Type,
	}

	result, err := u.query.CreateTeam(context.Background(), user)
	if err != nil {
		return nil, err
	}
	return &result, err
}
