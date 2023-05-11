import { getImages, getItinerary } from '@/endpoints/itinerary'
import { Itinerary } from '@/types/itinerary'
import { EnvConfig } from '@/utils/env.config'

const pexelsKey = EnvConfig().pexelsKey

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
  if (!pexelsKey) throw new Error('Pexels API Key is incorrect')
  let itineraries = await getItinerary({
    destination,
    language,
    numActivities,
    option
  })
  if (!pexelsKey && itineraries) {
    itineraries = await Promise.all(
      (await itineraries).map(async (element: Itinerary) => {
        const image = await getImages({ name: element.activity, quantity: 5 })
        return { ...element, media: image.at(0) }
      })
    )
  }
  return itineraries
}

export default addImage
