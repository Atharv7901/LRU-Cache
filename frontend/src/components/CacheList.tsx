import React from "react";
import CacheItem from "./CacheItem";
import {useDeleteCacheItemMutation} from "../services/cacheApi";

const CacheList = (props) => {
  const [deleteCacheItem, DeleteCacheItemResponse] =
    useDeleteCacheItemMutation();
  const handleDelete = (keyItem) => {
    console.log("Key", keyItem);
    deleteCacheItem(keyItem);
  };
  return (
    <div>
      <h2>Cache state</h2>
      {props.data &&
      typeof props.data === "object" &&
      Object.keys(props.data).length > 0 ? (
        Object.keys(props.data).map((key) => (
          <CacheItem
            key={key}
            index={key}
            keyItem={props.data[key].key}
            value={props.data[key].value}
            expiration={props.data[key].expiration}
            onDelete={() => handleDelete(props.data[key].key)}
          />
        ))
      ) : (
        <div>No Cache state available</div>
      )}
    </div>
  );
};

export default CacheList;
