package service

import (
	"context"

	db "github.com/nofamex/AAC/server/db/sqlc"
)

type ElimScratchService struct {
	query db.Querier
}

func NewElimScratchService(query db.Querier) *ElimScratchService {
	return &ElimScratchService{query: query}
}

func (u *ElimScratchService) GetScratchByTeamId(teamID int) (*db.ScratchTheHiddenWordsMaster, error) {

	result, err := u.query.GetScratchByTeamId(context.Background(), int32(teamID))
	if err != nil {
		return nil, err
	}
	return &result, err
}

func (u *ElimScratchService) CreateScratchMaster(teamId int, token string) (*db.ScratchTheHiddenWordsMaster, error) {
	param := db.CreateScratchMasterParams{
		TeamID: int32(teamId),
		Token:  token,
	}
	result, err := u.query.CreateScratchMaster(context.Background(), param)
	if err != nil {
		return nil, err
	}
	return &result, err
}

func (u *ElimScratchService) CreateScratchJawaban(teamId, soalId int, jawaban string) error {
	param := db.CreateScratchJawabanParams{
		TeamID:  int32(teamId),
		SoalID:  int32(soalId),
		Jawaban: jawaban,
	}
	err := u.query.CreateScratchJawaban(context.Background(), param)
	return err
}

func (u *ElimScratchService) UpdateSubmitedScratch(teamId int) error {
	err := u.query.UpdateSubmitedScratch(context.Background(), int32(teamId))
	return err
}
