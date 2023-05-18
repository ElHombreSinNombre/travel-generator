import { getImages, getItinerary } from "../endpoints/itinerary";
import { Itinerary } from "../models/itinerary";
import { Media } from "../models/media";
import { createAsyncThunk } from "@reduxjs/toolkit";
import store from "./store";

export const fetchItineraryAndMedia = createAsyncThunk(
  "itinerary/itineraryAndMedias",
  async ({
    destination,
    language,
    numActivities,
    option,
  }: {
    destination: string;
    language: string;
    numActivities: number;
    option: string;
  }) => {
    let itinerary;
    itinerary = await getItinerary(
      destination,
      language,
      numActivities,
      option
    );
    if (store.getState().apis.pexels) {
      itinerary = await Promise.all(
        (
          await itinerary
        ).map(async (element: Itinerary) => {
          const image = await getImages(element.activity, 1);
          return { ...element, media: image.at(0) };
        })
      );
    }
    return itinerary;
  }
);

export const fecthAllMedias = createAsyncThunk(
  "medias/fetch",
  async ({
    destination,
    quantity,
  }: {
    destination: string;
    quantity: number;
  }) => {
    let medias: Media[] = await getImages(destination, quantity);
    return medias;
  }
);
