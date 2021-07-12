package middleware

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/nofamex/AAC/server/token"
)

func AdminMiddleware(tokenMaker token.Maker) fiber.Handler {
	return func(ctx *fiber.Ctx) (err error) {
		authorizationHeader := ctx.Get("authorization")
		token, err := tokenMaker.GetToken(authorizationHeader)
		if err != nil {
			ctx.Status(http.StatusUnauthorized).JSON(Message{Message: err.Error()})
			return
		}

		payload, err := tokenMaker.VerifyToken(token)
		if err != nil {
			ctx.Status(http.StatusUnauthorized).JSON(Message{Message: err.Error()})
			return
		}

		if payload.Role != "admin" {
			ctx.Status(http.StatusUnauthorized).JSON(Message{Message: "not admin"})
			return
		}

		return ctx.Next()
	}
}
