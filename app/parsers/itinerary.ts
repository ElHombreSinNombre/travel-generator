import { Itinerary } from "../models/itinerary";

const itineraryParser = (data: string) => {
  const parsedData = JSON.parse(data);
  return parsedData.itinerary.map((itineraryData: any) => {
    const itinerary: Itinerary = {
      id: itineraryData.id,
      activity: itineraryData.activity,
      description: itineraryData.description,
      media: itineraryData.media,
      location: itineraryData.location,
    };
    return itinerary;
  });
};

export default itineraryParser;
