package service

import (
	"context"

	db "github.com/nofamex/AAC/server/db/sqlc"
)

type ElimSandwichService struct {
	query db.Querier
}

func NewElimSandwichService(query db.Querier) *ElimSandwichService {
	return &ElimSandwichService{query: query}
}

func (u *ElimSandwichService) GetElimMasterByTeamId(teamID int) (*db.ElimUnacMaster, error) {

	result, err := u.query.GetElimMasterByTeamId(context.Background(), int32(teamID))
	if err != nil {
		return nil, err
	}
	return &result, err
}

func (u *ElimSandwichService) GetElimSandwichByTeamId(teamID int, token string) (*db.BattleOfSandwichMaster, error) {

	payload := db.GetElimSandwichByTeamIdParams{
		TeamID: int32(teamID),
		Token:  token,
	}
	result, err := u.query.GetElimSandwichByTeamId(context.Background(), payload)
	if err != nil {
		return nil, err
	}
	return &result, err
}

func (u *ElimSandwichService) CreateElimMaster(teamId int, order string) (*db.ElimUnacMaster, error) {
	param := db.CreateElimMasterParams{
		TeamID: int32(teamId),
		Orders: order,
	}
	result, err := u.query.CreateElimMaster(context.Background(), param)
	if err != nil {
		return nil, err
	}
	return &result, err
}

func (u *ElimSandwichService) CreateElimSandwitch(teamId, paket int, token, order string) (*db.BattleOfSandwichMaster, error) {
	param := db.CreateElimSandwichParams{
		TeamID: int32(teamId),
		Token: token,
		Orders: order,
		Paket: int32(paket),
	}
	result, err := u.query.CreateElimSandwich(context.Background(), param)
	if err != nil {
		return nil, err
	}
	return &result, err
}

