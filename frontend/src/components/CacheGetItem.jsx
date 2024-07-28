import {Box, Button, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {useGetCacheItemQuery} from "../services/cacheApi";
import CacheItem from "./CacheItem";
import {useDispatch} from "react-redux";
import {updateCacheKey} from "../slices/cacheSlice";

const CacheGetItem = () => {
  const [key, setKey] = useState("");
  const [skip, setSkip] = useState(true);
  const [cacheData, setCacheData] = useState(null);
  const dispatch = useDispatch();

  const {data, error, refetch} = useGetCacheItemQuery(key, {skip});

  useEffect(() => {
    if (!skip) {
      refetch().then((result) => {
        if (result.isSuccess) {
          setCacheData(result.data);
          dispatch(updateCacheKey(key));
        } else if (result.isError) {
          setCacheData(null);
        }
      });
    }
  }, [skip, refetch]);

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
            setCacheData(null); // Clear previous data
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
      {cacheData && !skip && !error && (
        <CacheItem
          keyItem={cacheData.Key}
          value={cacheData.Value}
          expiration={cacheData.Expiration}
        />
      )}
      {error && <p style={{color: "red"}}>Error fetching cache item</p>}
    </div>
  );
};

export default CacheGetItem;
