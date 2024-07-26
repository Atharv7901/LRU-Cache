package cache

import (
	"container/list"
	"time"
)

func (c *LRUCache) removeOldest() {
	elem := c.CacheData.Back()
	if elem != nil {
		c.removeElement(elem)
	}
}

func (c *LRUCache) removeElement(elem *list.Element) {
	c.CacheData.Remove(elem)
	item := elem.Value.(*CacheItem)
	delete(c.Items, item.Key)
}

func (c *LRUCache) StartExpirationTime() {
	ticker := time.NewTicker(time.Second)
	go func()  {
		for range ticker.C {
			c.mu.Lock()
			for _, elem := range c.Items {
				item := elem.Value.(*CacheItem)
				if time.Now().Unix() > item.Expiration {
					c.removeElement(elem)
				}
			}
			c.mu.Unlock()
		}	
	}()
}