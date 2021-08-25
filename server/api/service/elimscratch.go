package service

import (
	db "github.com/nofamex/AAC/server/db/sqlc"
)

type ElimScratchService struct {
	query db.Querier
}

func NewElimScratchService(query db.Querier) *ElimScratchService {
	return &ElimScratchService{query: query}
}

