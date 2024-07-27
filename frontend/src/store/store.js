import {configureStore} from "@reduxjs/toolkit";
import {cacheApi} from "../services/cacheApi";

const store = configureStore({
  reducer: {
    [cacheApi.reducerPath]: cacheApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cacheApi.middleware),
});

export default store;
