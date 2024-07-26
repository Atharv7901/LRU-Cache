package cache

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type CacheHandler struct {
	Cache *LRUCache
}

func NewCacheHandler(capacity int) *CacheHandler {
	cache := NewLRUCache(capacity)
	cache.StartExpirationTime()
	return &CacheHandler{
		Cache: cache,
	}
}

func (h *CacheHandler) GetHandler(c *gin.Context) {
	key := c.Query("key")

	value, ok := h.Cache.Get(key)
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"Error": "key not found!"})
		return
	}
	c.JSON(http.StatusOK, value)
}