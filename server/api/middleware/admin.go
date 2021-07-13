package middleware

import (
	"net/http"

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
