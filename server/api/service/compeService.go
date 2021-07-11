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

func (u *CompeService) CreateMember(members *[]model.Member, id int32) error {
	for _, meberBody := range *members {
		var nisn sql.NullString
		if meberBody.Nisn == "" {
			nisn = sql.NullString{
				Valid: false,
			}
		} else {
			nisn = sql.NullString{
				Valid:  true,
				String: meberBody.Nisn,
			}
		}

		member := db.CreateMemberParams{
			FullName:     meberBody.FullName,
			BirthPlace:   meberBody.BirthPlace,
			BirthDate:    meberBody.BirthDate,
			TeamID:       id,
			MemberNumber: int32(meberBody.MemberNumber),
			Nisn:         nisn,
		}

		_, err := u.query.CreateMember(context.Background(), member)
		if err != nil {
			return err
		}
	}

	return nil
}
