import { createSlice } from "@reduxjs/toolkit";
import { Api } from "@/app/models/apis";

export const apisSlice = createSlice({
  name: "apis",
  initialState: { openia: "", pexels: "", google: "" },
  reducers: {
    setApis: (_, action) => {
      return action.payload;
    },
  },
});

export const { setApis } = apisSlice.actions;
export default apisSlice.reducer;

export const openiaapi = (state: { apis: Api }) => state.apis.openia;

export const pexelsapi = (state: { apis: Api }) => state.apis.pexels;

export const googleapi = (state: { apis: Api }) => state.apis.google;
