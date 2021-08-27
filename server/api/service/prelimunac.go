package service

import (
	"context"

	db "github.com/nofamex/AAC/server/db/sqlc"
)

type PrelimUnacService struct {
	query db.Querier
}

func NewPrelimUnacService(query db.Querier) *PrelimUnacService {
	return &PrelimUnacService{query: query}
}

func (u *PrelimUnacService) GetTeamById(teamID int) (*db.PrelimUnacMaster, error) {

	result, err := u.query.GetPrelimUnacByTeamId(context.Background(), int32(teamID))
	if err != nil {
		return nil, err
	}
	return &result, err
}

func (u *PrelimUnacService) GetPrelimUnacPg(id int) (*db.PrelimUnacPg, error) {
	result, err := u.query.GetPrelimUnacPgById(context.Background(), int32(id))
	if err != nil {
		return nil, err
	}
	return &result, err
}

func (u *PrelimUnacService) GetPrelimUnacIsian(id int) (*db.PrelimUnacIsian, error) {
	result, err := u.query.GetPrelimUnacIsianById(context.Background(), int32(id))
	if err != nil {
		return nil, err
	}
	return &result, err
}

func (u *PrelimUnacService) CreatePrelimUnac(teamId, paket int, token, order string) (*db.PrelimUnacMaster, error) {
	param := db.CreatePrelimUnacParams{
		TeamID: int32(teamId),
		Token:  token,
		Orders: order,
		Paket:  int32(paket),
	}
	result, err := u.query.CreatePrelimUnac(context.Background(), param)
	if err != nil {
		return nil, err
	}
	return &result, err
}

func (u *PrelimUnacService) CreatePrelimUnacPg(teamId, soalId, jawaban int) error {
	param := db.CreatePrelimUnacPgJawabanParams{
		TeamID:  int32(teamId),
		SoalID:  int32(soalId),
		Jawaban: int32(jawaban),
	}
	err := u.query.CreatePrelimUnacPgJawaban(context.Background(), param)
	return err
}

func (u *PrelimUnacService) CreatePrelimUnacIsian(teamId, soalId int, jawaban string) error {
	param := db.CreatePrelimUnacIsianJawabanParams{
		TeamID:  int32(teamId),
		SoalID:  int32(soalId),
		Jawaban: jawaban,
	}
	err := u.query.CreatePrelimUnacIsianJawaban(context.Background(), param)
	return err
}

func (u *PrelimUnacService) GetPagePrelimUnac(teamId int) (int32, error) {
	page, err := u.query.GetPagePrelimUnac(context.Background(), int32(teamId))
	return page, err
}

func (u *PrelimUnacService) NextPagePrelimUnac(teamId int) error {
	err := u.query.UpdatePagePrelimUnac(context.Background(), int32(teamId))
	return err
}

func (u *PrelimUnacService) UpdateSubmitedUnac(teamId int) error {
	err := u.query.UpdateSubmitedPrelimUnac(context.Background(), int32(teamId))
	return err
}

func (u *PrelimUnacService) GetUnacPgIdByPaket(paket int) ([]int32, error) {
	page, err := u.query.GetUnacPgIdByPaket(context.Background(), int32(paket))
	return page, err
}

func (u *PrelimUnacService) GetUnacIsianIdByPaket(paket int) ([]int32, error) {
	page, err := u.query.GetUnacIsianIdByPaket(context.Background(), int32(paket))
	return page, err
}
