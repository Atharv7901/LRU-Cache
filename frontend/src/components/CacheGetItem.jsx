import {Box, Button, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {useGetCacheItemQuery} from "../services/cacheApi";
import CacheItem from "./CacheItem";

const CacheGetItem = () => {
  const [key, setKey] = useState("");
  const [skip, setSkip] = useState(true);

  const cacheItem = useGetCacheItemQuery(key, {skip: skip});

  useEffect(() => {
    if (!skip) {
      cacheItem.refetch().then((result) => {
        if (result.isSuccess) {
          cacheItem = result;
        }
      });
    }
  }, [skip]);

  const handleGet = () => {
    setSkip(false);
  };
  return (
    <div>
      <h4>Get Cache Item</h4>
      <Box display="flex" gap={4}>
        <TextField
          label="Key"
          value={key}
          onChange={(e) => {
            setKey(e.target.value);
            setSkip(true);
          }}
          variant="outlined"
          xs={{marginBottom: 2}}
          size="small"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleGet}
          disabled={key === ""}
        >
          Get
        </Button>
      </Box>
      {cacheItem.data !== undefined && !skip && (
        <CacheItem
          keyItem={cacheItem.data.Key}
          value={cacheItem.data.Value}
          expiration={cacheItem.data.Expiration}
        />
      )}
    </div>
  );
};

export default CacheGetItem;
