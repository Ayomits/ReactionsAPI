package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

var (
	DbUrl  string
	AppEnv string
)

func NewConfig() {
	loadConfig()

	DbUrl = loadVar("DATABASE_URL")
	AppEnv = loadVar("APP_ENV")

}

func loadVar(name string) string {
	v, ok := os.LookupEnv(name)
	if !ok {
		panic(fmt.Sprintf("env variable %s not found", name))
	}
	return v
}

func loadConfig() {
	_ = godotenv.Load()
}
