.PHONY: clean

migrations_migrate:
	~/go/bin/goose postgres "postgres://postgres:postgres@localhost:5432/postgres" up

migrations_down:
	~/go/bin/goose postgres "postgres://postgres:postgres@localhost:5432/postgres" down

migrations_create:
	@echo "Название:"
	read migration_name
	~/go/bin/goose postgres "postgres://postgres:postgres@localhost:5432/postgres" --dir migrations create "$$migration_name" sql