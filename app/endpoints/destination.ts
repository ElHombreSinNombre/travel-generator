import { Destination } from '@/types/destination'
import destinationParser from '@/parsers/destination'

export const getAllDestinations = async (): Promise<Destination[]> => {
  try {
    const response = await fetch('http://country.io/names.json')
    if (!response.ok) {
      throw new Error(`Bad code: ${response.status}`)
    }
    const data = await response.json()
    if (!data) throw new Error('No data was received')
    return destinationParser(data)
  } catch (error) {
    throw new Error('Failed to fetch destinations')
  }
}
