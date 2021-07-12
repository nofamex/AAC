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

	team := db.CreateTeamParams{
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

	result, err := u.query.CreateTeam(context.Background(), team)
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

func (u *CompeService) GetUserById(id int32) (db.User, error) {
	return u.query.GetUserById(context.Background(), id)
}

func (u *CompeService) GetTeamById(id int32) (*model.RegisterTeamRequest, error) {
	teamDb, err := u.query.GetTeamById(context.Background(), id)
	if err != nil {
		return nil, err
	}
	team := model.RegisterTeamRequest {
		TeamName:    teamDb.TeamName,
		University:  teamDb.University,
		FullName:    teamDb.FullName,
		Phone:       teamDb.Phone,
		IDLine:      teamDb.IDLine,
		Email:       teamDb.Email,
		PhotoLink:   teamDb.PhotoLink,
		PaymentLink: teamDb.PaymentLink,
		CardLink:    teamDb.CardLink,
		SkLink:      teamDb.SkLink.String,
		Type:        teamDb.Type,
	}
	return &team, nil
}

func (u *CompeService) GetMemberByTeamId(id int32) (*[]model.Member, error) {
	memberDb, err := u.query.GetMemberByTeamId(context.Background(), id)
	if err != nil {
		return nil, err
	}

	members := make([]model.Member, 0)
	for _, member := range memberDb {
		temp := model.Member {
			FullName:     member.FullName,
			BirthPlace:   member.BirthPlace,
			BirthDate:    member.BirthDate,
			MemberNumber: int(member.MemberNumber),
			Nisn:         member.Nisn.String,
		}
		members = append(members, temp)
	}
	return &members, nil
}
func (u *CompeService) AddTeamIdToUser(id, teamId int32) (error) {
	param := db.AddTeamIdToUserParams{
		ID: id,
		TeamID: sql.NullInt32{
			Int32: teamId,
			Valid: true,
		},
	}
	return u.query.AddTeamIdToUser(context.Background(), param)
}
