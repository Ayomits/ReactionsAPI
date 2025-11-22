package database

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v4/pgxpool"
)

func NewPostgres(dsn string) *pgxpool.Pool {
	pool, err := pgxpool.Connect(context.Background(), dsn)
	if err != nil {
		panic(fmt.Sprintf("Could not connect to postgres database: %v", err))
	}
	return pool
}
