run:
	go run server/main.go

watch-server:
	air -c server/watcher.conf

sqlc:
	sqlc generate -f server/sqlc.yaml


.PHONY: watch-server