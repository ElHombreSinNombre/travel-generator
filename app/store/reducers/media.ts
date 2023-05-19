import { createReducer, createAction, PayloadAction } from "@reduxjs/toolkit";
import { fecthAllMedias } from "../thunks";
import { Media } from "@/app/models/media";

const initialState: Media[] | null = null;

const clearMedias = createAction("medias/clear");

const mediasReducer = createReducer<Media[] | null>(initialState, (builder) => {
  builder
    .addCase(fecthAllMedias.fulfilled, (_, action: PayloadAction<Media[]>) => {
      return action.payload;
    })
    .addCase(clearMedias, () => null);
});

export { clearMedias };

export default mediasReducer;
