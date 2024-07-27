package cache

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type CacheHandler struct {
	Cache *LRUCache
}

type SetRequest struct {
	Key string `json:"key"`
	Value string `json:"value"`
	Expiration int `json:"expiration"`
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

func (h *CacheHandler) SetHandler(c *gin.Context) {
	var req SetRequest
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error" : "Invalid Body Request"})
		return
	}

	if(req.Key == "") || (req.Value == "") {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Key and value are required"})
		return
	}

	h.Cache.Set(req.Key, req.Value, time.Duration(req.Expiration)*time.Second)
	c.Status(http.StatusOK)
}

func (h *CacheHandler) DeleteHandler(c *gin.Context) {
	key := c.Query("key")
	fmt.Println("inside this habdler")
	h.Cache.Delete(key)
	c.Status(http.StatusOK)
}