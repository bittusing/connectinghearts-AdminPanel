import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lookupData: [],
  savedCountryLookup:[],
  locationHashmap:null
};

export const lookupSlice = createSlice({
  name: "lookup",
  initialState,
  reducers: {
    saveLookupData: (state, action) => {
      state.lookupData = action.payload;
    },
    saveCountryLookup: (state, action) => {
      state.savedCountryLookup = action.payload;
    },
    saveAllLocations: (state, action) => {
      console.log("hashmap payload", action.payload);
      state.locationHashmap = action.payload;
    },
   
  },
});

export const { saveLookupData, saveCountryLookup, saveAllLocations } =
  lookupSlice.actions;

export default lookupSlice.reducer;
