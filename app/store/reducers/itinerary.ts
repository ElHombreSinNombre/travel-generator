import { createReducer, createAction, PayloadAction } from "@reduxjs/toolkit";
import { fetchItineraryAndMedia } from "../thunks";
import { Itinerary } from "@/app/models/itinerary";

const initialState: Itinerary[] | null = null;

const clearItinerary = createAction("itinerary/clear");

const mediasReducer = createReducer<Itinerary[] | null>(
  initialState,
  (builder) => {
    builder
      .addCase(
        fetchItineraryAndMedia.fulfilled,
        (_, action: PayloadAction<Itinerary[]>) => {
          return action.payload;
        }
      )
      .addCase(clearItinerary, () => null);
  }
);

export { clearItinerary };

export default mediasReducer;
