import { Media } from '@/types/media'

export type Itinerary = {
  id: number
  activity: string
  description: string
  location: string
  media?: Media | undefined
}
