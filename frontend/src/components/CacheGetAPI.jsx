import {useSelector} from "react-redux";
import {
  useDeleteCacheItemMutation,
  useGetCacheDataQuery,
} from "../services/cacheApi";
import CacheItem from "./CacheItem";
import {useEffect} from "react";

const CacheGetAPI = () => {
  const data = useGetCacheDataQuery();
  const [deleteCache, DeleteCacheResponse] = useDeleteCacheItemMutation();
  const cacheKey = useSelector((state) => state.cache.getCacheKey);

  const handleDelete = (keyItem) => {
    deleteCache(keyItem);
  };

  useEffect(() => {
    data.refetch();
  }, [cacheKey]);
  return (
    <div>
      <div style={{display: "flex", alignItems: "center"}}>
        <h2 style={{marginRight: "8px"}}>Cache Data</h2>
        <em>(State managed by Get API call)</em>
      </div>
      {data.data !== null && data.data !== undefined && data.data.length > 0 ? (
        data.data.map((value) => (
          <CacheItem
            keyItem={value.key}
            value={value.value}
            expiration={value.expiration}
            onDelete={() => handleDelete(value.key)}
          />
        ))
      ) : (
        <div>Cache is empty</div>
      )}
    </div>
  );
};

export default CacheGetAPI;
