import {useEffect, useState} from "react";
import CacheList from "./CacheList";
import {Button, Grid} from "@mui/material";
import CacheForm from "./CacheForm";
import CacheGetItem from "./CacheGetItem";
import CacheGetAPI from "./CacheGetAPI";

const CacheDisplay = () => {
  const [cacheState, setCacheState] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws");

    ws.onopen = () => {
      console.log("Websocket connection established");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setCacheState(data);
      } catch (error) {
        console.error("Error parsing WebSocket message", error);
      }
    };

    ws.onerror = (error) => {
      console.error("Websocket error:", error);
    };

    ws.onclose = (event) => {
      console.log("Websocker connection closed:", event);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  return (
    <div>
      <h1>LRU Display</h1>
      <Grid container>
        <Grid item xs={9}>
          <CacheList data={cacheState} />
        </Grid>
        <Grid item xs={1}>
          <div></div>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDialogOpen}
          >
            Add Cache Item
          </Button>
        </Grid>
      </Grid>
      <CacheForm open={dialogOpen} handleClose={handleDialogClose} />
      <CacheGetAPI />
      <CacheGetItem />
    </div>
  );
};

export default CacheDisplay;
