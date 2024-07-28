import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  getCacheKey: "",
};

const cacheSlice = createSlice({
  name: "cache",
  initialState,
  reducers: {
    updateCacheKey: (state, action) => {
      state.getCacheKey = action.payload;
    },
  },
});

export const {updateCacheKey} = cacheSlice.actions;

export default cacheSlice.reducer;
