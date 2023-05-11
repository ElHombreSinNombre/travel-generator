import { Media } from '@/types/media'
import mediaParsers from '@/parsers/media'
import itineraryParsers from '@/parsers/itinerary'
import OpenAI from 'openai'
import { Itinerary } from '@/types/itinerary'
import { EnvConfig } from '@/utils/env.config'

const openai = new OpenAI({
  apiKey: EnvConfig().gpt_api_key
})

const pexelsKey = EnvConfig().pexels_api_key

export const getItinerary = async ({
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
  const prompt = `Créame un itinerario con ${numActivities} actividades sobre ${destination} centrado en ${option}, los valores tienen que estar en el idioma que significa este código ${language} . Para ello, create un JSON que tenga solo id, activity, description y location de la actividad. La raiz del JSON tiene que llamarse itinerary. Solo quiero el itinerario, sin ninguna otra explicación.`
  try {
    const res = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo'
    })
    const content = res.choices && res.choices[0]?.message?.content
    if (!content) throw new Error('No content was received')
    return itineraryParsers(JSON.parse(content))
  } catch (error) {
    throw new Error('Failed to fetch itineraries')
  }
}

export const getImages = async ({
  name,
  quantity
}: {
  name: string
  quantity: number
}): Promise<Media[]> => {
  try {
    if (!pexelsKey) throw new Error('Pexels API Key is incorrect')
    const params = {
      size: 'medium',
      query: name,
      per_page: quantity.toString(),
      page: (Math.floor(Math.random() * quantity) + 1).toString()
    }
    const url = new URL('https://api.pexels.com/v1/search')
    url.search = new URLSearchParams(params).toString()
    const response = await fetch(url, {
      headers: {
        Authorization: pexelsKey
      }
    })
    const data = await response.json()
    if (!data) throw new Error('No data was received')
    return mediaParsers(data.photos)
  } catch (error) {
    throw new Error('Failed to fetch images')
  }
}
