package service

import (
	db "github.com/nofamex/AAC/server/db/sqlc"
)

type ElimRescueService struct {
	query db.Querier
}

func NewElimRescueService(query db.Querier) *ElimRescueService {
	return &ElimRescueService{query: query}
}

