package cache

import (
	"fmt"
	"sync"
	"testing"
	"time"
)

func TestEmptyCache(t *testing.T) {
	cache := NewLRUCache(2)
	if value, ok := cache.Get("nonexistent"); ok || value != nil {
		t.Errorf("expected no value, got %v", value)
	}
}

func TestCapacityLimit(t *testing.T) {
	cache := NewLRUCache(2)
	cache.Set("A", "valueA", time.Second*10)
	cache.Set("B", "valueB", time.Second*10)
	cache.Set("C", "valueC", time.Second*10)

	if _, ok := cache.Get("A"); ok {
		t.Errorf("expected item A to be evicted")
	}
}

func TestExpiration(t *testing.T) {
	cache := NewLRUCache(2)
	cache.Set( "A", "valueA", time.Second*1)
	time.Sleep(2 * time.Second)

	if value, ok := cache.Get("A"); ok || value != nil {
		t.Errorf("expected item A to be expired, got %v", value)
	}
}

func TestConcurrency(t *testing.T) {
	cache := NewLRUCache(5)
	var wg sync.WaitGroup
	for i := 0; i < 100; i++ {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			key := fmt.Sprintf("key%d", i)
			cache.Set(key, i, time.Second*10)
			cache.Get(key)
		}(i)
	}
	wg.Wait()
}

func TestDeletion(t *testing.T) {
	cache := NewLRUCache(2)
	cache.Set("A", "valueA", time.Second*10)
	cache.Delete("A")

	if value, ok := cache.Get("A"); ok || value != nil {
		t.Errorf("expected item A to be deleted, got %v", value)
	}
}

func TestUpdateExistingItem(t *testing.T) {
	cache := NewLRUCache(2)
	cache.Set("A", "valueA", time.Second*10)
	cache.Set("A", "newValueA", time.Second*20)

	if value, ok := cache.Get("A"); !ok || value.(*CacheItem).Value != "newValueA" {
		t.Errorf("expected new value 'newValueA', got %v", value)
	}
}

func TestGetOperation(t *testing.T) {
	cache := NewLRUCache(2)
	cache.Set("A", "valueA", time.Second*10)
	cache.Set("B", "valueB", time.Second*10)

	cache.Get("A")
	cache.Set("C", "valueC", time.Second*10)

	if _, ok := cache.Get("B"); ok {
		t.Errorf("expected item B to be evicted")
	}
}

func TestComplexScenarios(t *testing.T) {
	cache := NewLRUCache(3)
	cache.Set("A", "valueA", time.Second*10)
	cache.Set("B", "valueB", time.Second*10)
	cache.Set("C", "valueC", time.Second*10)

	cache.Get("A")
	cache.Set("D", "valueD", time.Second*10)

	if _, ok := cache.Get("B"); ok {
		t.Errorf("expected item B to be evicted")
	}

	if value, ok := cache.Get("A"); !ok || value.(*CacheItem).Value != "valueA" {
		t.Errorf("expected item A to be present, got %v", value)
	}
}
