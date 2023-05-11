import { combineReducers, configureStore } from "@reduxjs/toolkit";
import itinerarySlice from "./slices/itinerary";
import destinationSlice from "./slices/destination";
import mediasSlice from "./slices/media";

const rootReducer = combineReducers({
  itinerary: itinerarySlice,
  destination: destinationSlice,
  medias: mediasSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
