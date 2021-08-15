package service

import (
	"context"

	db "github.com/nofamex/AAC/server/db/sqlc"
)

type ConfigService struct {
	query db.Querier
}

func NewConfigService(query db.Querier) *ConfigService {
	return &ConfigService{query: query}
}

func (u *ConfigService) GetConfig() (db.Config, error) {
	return u.query.GetConfig(context.Background())
}
