package cache

import (
	"container/list"
	"sync"
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