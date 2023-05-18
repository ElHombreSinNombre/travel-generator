import { combineReducers, configureStore } from "@reduxjs/toolkit";
import itineraryReducer from "./slices/itinerary";
import destinationReducer from "./slices/destination";
import apisResducer from "./slices/apis";
import mediasReducer from "./slices/media";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
  itinerary: itineraryReducer,
  destination: destinationReducer,
  medias: mediasReducer,
  apis: apisResducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware],
});

export default store;
