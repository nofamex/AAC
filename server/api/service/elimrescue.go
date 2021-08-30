package service

import (
	"context"

	db "github.com/nofamex/AAC/server/db/sqlc"
)

type ElimRescueService struct {
	query db.Querier
}

func NewElimRescueService(query db.Querier) *ElimRescueService {
	return &ElimRescueService{query: query}
}

func (u *ElimRescueService) GetTeamById(teamID int) (*db.RescueTheNumberMaster, error) {

	result, err := u.query.GetRescueByTeamId(context.Background(), int32(teamID))
	if err != nil {
		return nil, err
	}
	return &result, err
}

func (u *ElimRescueService) CreateRescueMaster(teamId int, token string) (*db.RescueTheNumberMaster, error) {
	param := db.CreateRescueMasterParams{
		TeamID: int32(teamId),
		Token:  token,
	}
	result, err := u.query.CreateRescueMaster(context.Background(), param)
	if err != nil {
		return nil, err
	}
	return &result, err
}

func (u *ElimRescueService) CreateRescueJawaban(teamId, soalId int, jawaban string) error {
	param := db.CreateRescueJawabanParams{
		TeamID:  int32(teamId),
		SoalID:  int32(soalId),
		Jawaban: jawaban,
	}
	err := u.query.CreateRescueJawaban(context.Background(), param)
	return err
}

func (u *ElimRescueService) UpdateSubmitedRescue(teamId int) error {
	err := u.query.UpdateSubmitedRescue(context.Background(), int32(teamId))
	return err
}

func (u *ElimRescueService) GetRescueSoal() ([]db.ElimUnacRescueTheNumber, error) {
	result, err := u.query.GetRescueSoal(context.Background())
	return result, err
}
