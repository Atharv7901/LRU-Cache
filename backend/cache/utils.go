package cache

import "container/list"

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