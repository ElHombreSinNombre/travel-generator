import { Media } from "./media";

export type Itinerary = {
  id: number;
  activity: string;
  description: string;
  location: string;
  media: Media;
};
