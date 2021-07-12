package token

import (
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/aead/chacha20poly1305"
	"github.com/o1egl/paseto"
)

type Maker interface {
	CreateToken(userId int32, email, role string, duration time.Duration) (string, error)
	VerifyToken(token string) (*Payload, error)
	GetToken(header string) (token string, err error)
}

type PasetoMaker struct {
	paseto       *paseto.V2
	symmetricKey []byte
}

func NewPasetoMaker(symmetricKey string) (Maker, error) {
	if len(symmetricKey) != chacha20poly1305.KeySize {
		return nil, fmt.Errorf("invalid key size: must be exactly %d characters", chacha20poly1305.KeySize)
	}

	maker := &PasetoMaker{
		paseto:       paseto.NewV2(),
		symmetricKey: []byte(symmetricKey),
	}

	return maker, nil
}

func (maker *PasetoMaker) CreateToken(userId int32, email, role string, duration time.Duration) (string, error) {
	payload := NewPayload(userId, email, role, duration)

	return maker.paseto.Encrypt(maker.symmetricKey, payload, nil)
}

func (maker *PasetoMaker) VerifyToken(token string) (*Payload, error) {
	payload := &Payload{}

	err := maker.paseto.Decrypt(token, maker.symmetricKey, payload, nil)
	if err != nil {
		return nil, ErrInvalidToken
	}

	err = payload.Valid()
	if err != nil {
		return nil, err
	}

	return payload, nil
}

func (maker *PasetoMaker) GetToken(header string) (token string, err error) {
	fields := strings.Fields(header)
	if (len(fields) < 1 ){
		err = errors.New("invalid authorization header format")
		return
	}
	token = fields[1]
	return
}
