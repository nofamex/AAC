package service

import (
	"context"

	db "github.com/nofamex/AAC/server/db/sqlc"
)

type PrelimTacService struct {
	query db.Querier
}

func NewPrelimTacService(query db.Querier) *PrelimTacService {
	return &PrelimTacService{query: query}
}

func (u *PrelimTacService) GetTeamById(teamID int) (*db.PrelimTacMaster, error) {

	result, err := u.query.GetPrelimTacByTeamId(context.Background(), int32(teamID))
	if err != nil {
		return nil, err
	}
	return &result, err
}

func (u *PrelimTacService) GetPrelimTacPg(id int) (*db.PrelimTacPg, error) {
	result, err := u.query.GetPrelimTacPgById(context.Background(), int32(id))
	if err != nil {
		return nil, err
	}
	return &result, err
}

func (u *PrelimTacService) CreatePrelimTac(teamId, paket int, token, order string) (*db.PrelimTacMaster, error) {
	param := db.CreatePrelimTacParams{
		TeamID: int32(teamId),
		Token:  token,
		Orders: order,
		Paket:  int32(paket),
	}
	result, err := u.query.CreatePrelimTac(context.Background(), param)
	if err != nil {
		return nil, err
	}
	return &result, err
}

func (u *PrelimTacService) CreatePrelimTacPg(teamId, soalId, jawaban int) error {
	param := db.CreatePrelimTacPgJawabanParams{
		TeamID:  int32(teamId),
		SoalID:  int32(soalId),
		Jawaban: int32(jawaban),
	}
	err := u.query.CreatePrelimTacPgJawaban(context.Background(), param)
	return err
}

func (u *PrelimTacService) GetPagePrelimTac(teamId int) (int32, error) {
	page, err := u.query.GetPagePrelimTac(context.Background(), int32(teamId))
	return page, err
}

func (u *PrelimTacService) NextPagePrelimTac(teamId int) error {
	err := u.query.UpdatePagePrelimTac(context.Background(), int32(teamId))
	return err
}

func (u *PrelimTacService) UpdateSubmitedTac(teamId int) error {
	err := u.query.UpdateSubmitedPrelimTac(context.Background(), int32(teamId))
	return err
}

func (u *PrelimTacService) GetTacPgIdByPaket(paket int) ([]int32, error) {
	page, err := u.query.GetTacPgIdByPaket(context.Background(), int32(paket))
	return page, err
}