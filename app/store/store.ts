import { combineReducers, configureStore } from "@reduxjs/toolkit";
import itineraryReducer from "./reducers/itinerary";
import destinationReducer from "./slices/destination";
import apisResducer from "./slices/apis";
import mediasReducer from "./reducers/media";

const rootReducer = combineReducers({
  itinerary: itineraryReducer,
  destination: destinationReducer,
  medias: mediasReducer,
  apis: apisResducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
