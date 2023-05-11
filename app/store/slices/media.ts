import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Media } from "@/app/models/media";

const initialState: { media: Media[] } = { media: [] };

export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    setMedias: (state, action: PayloadAction<Media[]>) => {
      state.media = action.payload;
    },
  },
});

export const { setMedias } = mediaSlice.actions;
export default mediaSlice.reducer;

export const allMedias = (state: { medias: { media: Media[] } }) =>
  state.medias.media;
