package main

import (
	"fmt"
	"log"
	"lrucache/pkg/cache"
	"lrucache/pkg/middleware"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(middleware.CORS())
	handler := cache.NewCacheHandler(5)

	r.GET("/get", handler.GetHandler)
	r.POST("/set", handler.SetHandler)
	r.DELETE("/delete", handler.DeleteHandler)
	r.GET("/cache/state", handler.CacheStateHandler)
	r.GET("/ws", handler.CacheStateWSHandler)

	fmt.Println("Server running on 8000")
	if err := r.Run(":8000"); err != nil {
		log.Fatal(err)
	}
}