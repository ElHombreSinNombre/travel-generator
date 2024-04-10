import { Itinerary } from '@/types/itinerary'

const itineraryParser = (itineraries: Itinerary[]) => {
  return itineraries.map((itinerary: Itinerary) => {
    return {
      id: itinerary.id,
      activity: itinerary.activity,
      description: itinerary.description,
      media: itinerary.media,
      location: itinerary.location
    }
  })
}

export default itineraryParser
