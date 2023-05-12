import { Itinerary } from "@/app/models/itinerary";
import { createSlice } from "@reduxjs/toolkit";

interface ItineraryState {
  itinerary: Itinerary[];
}

export const itinerarySlice = createSlice({
  name: "itinerary",
  initialState: { itinerary: [] } as ItineraryState,
  reducers: {
    setItinerary: (state, action) => {
      state.itinerary = action.payload;
    },
  },
});
export const { setItinerary } = itinerarySlice.actions;
export default itinerarySlice.reducer;

export const itineraryActivities = (state: { itinerary: ItineraryState }) =>
  state.itinerary.itinerary;
