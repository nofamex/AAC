package middleware

import (
	"errors"
	"fmt"
	"net/http"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/nofamex/AAC/server/token"
)

func AdminMiddleware(tokenMaker token.Maker) fiber.Handler {
	return func(ctx *fiber.Ctx) (err error) {
		token := ctx.Get("authorization")
		if token != "secret" {
			ctx.Status(http.StatusUnauthorized).JSON(Message{Message: "not admin"})
			return
		}

		return ctx.Next()
	}
}

func PrelimMiddleware(tokenMaker token.Maker) fiber.Handler {
	return func(ctx *fiber.Ctx) (err error) {
		authorizationHeader := ctx.Get("authorization")

		if len(authorizationHeader) == 0 {
			err = errors.New("authorization header is not provided")
			ctx.Status(http.StatusUnauthorized).JSON(Message{Message: err.Error()})
			return
		}

		fields := strings.Fields(authorizationHeader)
		if len(fields) < 2 {
			err = errors.New("invalid authorization header format")
			ctx.Status(http.StatusUnauthorized).JSON(Message{Message: err.Error()})
			return
		}

		authorizationType := strings.ToLower(fields[0])
		if authorizationType != "bearer" {
			err = fmt.Errorf("unsupported authorization type %s", authorizationType)
			ctx.Status(http.StatusUnauthorized).JSON(Message{Message: err.Error()})
			return
		}

		accessToken := fields[1]
		payload, err := tokenMaker.VerifyToken(accessToken)
		if err != nil {
			ctx.Status(http.StatusUnauthorized).JSON(Message{Message: err.Error()})
			return
		}

		if payload.UserId == 0 {
			err = fmt.Errorf("can't use refresh token as access token")
			ctx.Status(http.StatusUnauthorized).JSON(Message{Message: err.Error()})
			return
		}

		if payload.Email[0:5] != "simul" {
			err = fmt.Errorf("not simul user")
			ctx.Status(http.StatusUnauthorized).JSON(Message{Message: err.Error()})
			return
		}
		return ctx.Next()
	}
}
