package app

import (
	"github.com/gin-gonic/gin"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	_ "reactions-api/docs"
)

func Run() {
	app := gin.Default()

	api := app.Group("/api")

	{
		api.GET("/docs/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))
	}

	// define your routes here

	app.Run(":8080")
}
