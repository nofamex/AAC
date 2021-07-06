package middleware

import (
	"errors"
	"fmt"
	"net/http"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/nofamex/AAC/server/token"
)

func AuthMiddleware(tokenMaker token.Maker) fiber.Handler {
	return func(ctx *fiber.Ctx) (err error) {
		authorizationHeader := ctx.Get("authorization")

		if len(authorizationHeader) == 0 {
			err = errors.New("authorization header is not provided")
			ctx.Status(http.StatusUnauthorized).SendString(err.Error())
			return
		}

		fields := strings.Fields(authorizationHeader)
		if len(fields) < 2 {
			err = errors.New("invalid authorization header format")
			ctx.Status(http.StatusUnauthorized).SendString(err.Error())
			return
		}

		authorizationType := strings.ToLower(fields[0])
		if authorizationType != "bearer" {
			err = fmt.Errorf("unsupported authorization type %s", authorizationType)
			ctx.Status(http.StatusUnauthorized).SendString(err.Error())
			return
		}

		accessToken := fields[1]
		payload, err := tokenMaker.VerifyToken(accessToken)
		if err != nil {
			ctx.Status(http.StatusUnauthorized).SendString(err.Error())
			return
		}

		if payload.UserId == 0 {
			err = fmt.Errorf("can't use refresh token as access token")
			ctx.Status(http.StatusUnauthorized).SendString(err.Error())
			return
		}

		return ctx.Next()
	}
}
