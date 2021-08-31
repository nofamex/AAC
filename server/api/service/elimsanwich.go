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

func (u *ElimSandwichService) GetElimSandwichByPaket(teamID, paket int) (*db.BattleOfSandwichMaster, error) {
	param := db.GetElimSandwichByPaketParams{
		TeamID: int32(teamID),
		Paket: int32(paket),
	}
	result, err := u.query.GetElimSandwichByPaket(context.Background(), param)
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

func (u *ElimSandwichService) CreateElimMaster(teamId int) (*db.ElimUnacMaster, error) {
	result, err := u.query.CreateElimMaster(context.Background(), int32(teamId))
	return &result, err
}

func (u *ElimSandwichService) CreateElimSandwitch(teamId, paket int, token, order string) (*db.BattleOfSandwichMaster, error) {
	param := db.CreateElimSandwichParams{
		TeamID: int32(teamId),
		Token:  token,
		Orders: order,
		Paket:  int32(paket),
	}
	result, err := u.query.CreateElimSandwich(context.Background(), param)
	if err != nil {
		return nil, err
	}
	return &result, err
}

func (u *ElimSandwichService) GetSandwichPgIdByPaket(paket int) ([]int32, error) {
	result, err := u.query.GetSandwichPgIdByPaket(context.Background(), int32(paket))
	return result, err
}

func (u *ElimSandwichService) GetPageSandwich(teamID int, token string) (int32, error) {
	param := db.GetPageSandwichParams{
		TeamID: int32(teamID),
		Token:  token,
	}
	result, err := u.query.GetPageSandwich(context.Background(), param)
	return result, err
}

func (u *ElimSandwichService) GetSandwichPg(id int) (db.ElimUnacBattleOfSandwich, error) {
	result, err := u.query.GetSandwichPg(context.Background(), int32(id))
	return result, err
}

func (u *ElimSandwichService) UpdatePageSandwich(teamID int, token string) error {
	param := db.UpdatePageSandwichParams{
		TeamID: int32(teamID),
		Token:  token,
	}
	err := u.query.UpdatePageSandwich(context.Background(), param)
	return err
}

func (u *ElimSandwichService) CreateSandwichJawaban(teamID, soalID, jawaban int, token string) error {
	param := db.CreateSandwichJawabanParams{
		TeamID:  int32(teamID),
		SoalID:  int32(soalID),
		Token:   token,
		Jawaban: int32(jawaban),
	}
	err := u.query.CreateSandwichJawaban(context.Background(), param)
	return err
}

func (u *ElimSandwichService) UpdateSubmitedSandwich(teamID int, token string) error {
	param := db.UpdateSubmitedSandwichParams{
		TeamID: int32(teamID),
		Token:  token,
	}
	err := u.query.UpdateSubmitedSandwich(context.Background(), param)
	return err
}
