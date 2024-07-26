package cache

import (
	"container/list"
	"sync"
	"time"
)

//struct for single cache item
type CacheItem struct {
	Key string
	Value interface{}
	Expiration int64
}

//struct for LRUCache
type LRUCache struct {
	Capacity int
	Items map[string]*list.Element
	CacheData *list.List
	mu sync.RWMutex
}

//constructor function
func NewLRUCache(capacity int) *LRUCache {
	return &LRUCache{
		Capacity: capacity,
		Items: make(map[string]*list.Element),
		CacheData: list.New(),
	}
}

func (c *LRUCache) Get(key string) (interface{}, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()

	if elem, ok := c.Items[key]; ok {
		item := elem.Value.(*CacheItem)
		if time.Now().Unix() > item.Expiration {
			return nil, false
		}
		c.CacheData.MoveToFront(elem)
		return item.Value, true
	}
	return nil, false
}