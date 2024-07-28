package cache

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

type CacheHandler struct {
	Cache *LRUCache
	status *websocket.Upgrader
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
		status: &websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool { return true },
		},
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
	h.Cache.Delete(key)
	c.Status(http.StatusOK)
}

func (h *CacheHandler) CacheStateHandler(c *gin.Context) {
	h.Cache.mu.RLock()
	defer h.Cache.mu.RUnlock()

	var state []map[string]interface{}
	for elem := h.Cache.CacheData.Front(); elem != nil; elem = elem.Next() {
		item := elem.Value.(*CacheItem)
		state = append(state, map[string]interface{}{
			"key":        item.Key,
			"value":      item.Value,
			"expiration": item.Expiration,
		})
	}
	c.JSON(http.StatusOK, state)
}

func (h *CacheHandler) CacheStateWSHandler(c *gin.Context) {
	conn, err := h.status.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upgrade connection"})
		return
	}
	defer conn.Close()

	ticker := time.NewTicker(5 * time.Second)
	defer ticker.Stop()

	for range ticker.C {
		h.Cache.mu.RLock()
		var state []map[string]interface{}
		for elem := h.Cache.CacheData.Front(); elem != nil; elem = elem.Next() {
			item := elem.Value.(*CacheItem)
			state = append(state, map[string]interface{}{
				"key":        item.Key,
				"value":      item.Value,
				"expiration": item.Expiration,
			})
		}
		h.Cache.mu.RUnlock()

		if err := conn.WriteJSON(state); err != nil {
			return
		}
	}
}