run:
	go run server/main.go

runc:
	npm run --prefix client dev

i:
	npm --prefix client install ./client

watch:
	air -c server/watcher.conf

sqlc:
	sqlc generate -f server/sqlc.yaml

prod-up:
	docker-compose -f ./docker-compose-prod.yml up

prod-down:
	docker-compose -f ./docker-compose-prod.yml down --rmi local
