import { createSlice } from "@reduxjs/toolkit";
import { fecthAllMedias } from "../thunks";
import { Media } from "@/app/models/media";

const itinerarySlice = createSlice({
  name: "medias",
  initialState: [] as Media[] | null,
  reducers: {
    clearMedias: () => null,
  },
  extraReducers: (builder) => {
    builder.addCase(fecthAllMedias.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

export const { clearMedias } = itinerarySlice.actions;
export default itinerarySlice.reducer;
