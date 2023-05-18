import { createSlice } from "@reduxjs/toolkit";
import { fetchItineraryAndMedia } from "../thunks";
import { Itinerary } from "@/app/models/itinerary";

const itinerarySlice = createSlice({
  name: "itinerary",
  initialState: null as Itinerary[] | null,
  reducers: {
    clearItineraryAndMedia: () => null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItineraryAndMedia.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { clearItineraryAndMedia } = itinerarySlice.actions;
export default itinerarySlice.reducer;
