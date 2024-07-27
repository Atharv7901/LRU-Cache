import React, {useState, useEffect} from "react";
import Container from "@mui/material/Container";
import CacheDisplay from "./components/CacheDisplay";

const App = () => {
  return (
    <Container fixed>
      <CacheDisplay />
    </Container>
  );
};

export default App;
