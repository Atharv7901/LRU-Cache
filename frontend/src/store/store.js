import {configureStore} from "@reduxjs/toolkit";
import {cacheApi} from "../services/cacheApi";
import cacheReducer from "../slices/cacheSlice";

const store = configureStore({
  reducer: {
    cache: cacheReducer,
    [cacheApi.reducerPath]: cacheApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cacheApi.middleware),
});

export default store;
