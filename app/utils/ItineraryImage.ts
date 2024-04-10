import { getImages, getItinerary } from '@/endpoints/itinerary'
import { Itinerary } from '@/types/itinerary'

const apiKey = process.env.PEXELS_API_KEY

const addImage = async ({
  destination,
  language,
  numActivities,
  option
}: {
  destination: string
  language: string
  numActivities: number
  option: string
}): Promise<Itinerary[]> => {
  if (!apiKey) throw new Error('Pexels API Key is not defined')
  let itineraries = await getItinerary({
    destination,
    language,
    numActivities,
    option
  })
  if (apiKey && itineraries) {
    itineraries = await Promise.all(
      (
        await itineraries
      ).map(async (element: Itinerary) => {
        const image = await getImages({ name: element.activity, quantity: 5 })
        return { ...element, media: image.at(0) }
      })
    )
  }
  return itineraries
}

export default addImage
