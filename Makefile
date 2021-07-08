run:
	go run server/main.go

runc:
	npm run --prefix client dev

watch-server:
	air -c server/watcher.conf

sqlc:
	sqlc generate -f server/sqlc.yaml


.PHONY: watch-server