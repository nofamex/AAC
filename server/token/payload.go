package token

import (
	"errors"
	"time"

)

var (
	ErrInvalidToken = errors.New("token is invalid")
	ErrExpiredToken = errors.New("token is expiring")
)

type Payload struct {
	UserId int32 `json:"userid"`
	Email string `json:"email"`
	IssuedAt time.Time `json:"issued_at"`
	ExpiredAt time.Time `json:"expired_at"`
}

func NewPayload(email string, userId int32, duration time.Duration) (*Payload) {

	payload := &Payload{
		Email: email,
		UserId: userId,
		IssuedAt: time.Now(),
		ExpiredAt: time.Now().Add(duration),
	}

	return payload
}

func (payload *Payload) Valid() error {
	if time.Now().After(payload.ExpiredAt) {
		return ErrExpiredToken
	}
	return nil
}