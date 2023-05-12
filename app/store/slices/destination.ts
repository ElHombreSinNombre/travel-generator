import { Destination } from "@/app/models/destination";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const destinationSlice = createSlice({
  name: "destination",
  initialState: null as Destination | null,
  reducers: {
    setDestination: (_, action: PayloadAction<Destination>) => {
      return action.payload;
    },
  },
});

export const { setDestination } = destinationSlice.actions;
export default destinationSlice.reducer;

export const selectedDestinationName = (state: { destination: Destination }) =>
  state.destination?.name;
