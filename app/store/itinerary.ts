import { create } from 'zustand'
import { Itinerary } from '@/app/types/itinerary'

type State = {
  itinerary: Itinerary[] | null
  setItinerary: (itinerary: Itinerary[]) => void
  clearItinerary: () => void
}

export const useItineraryStore = create<State>((set) => ({
  itinerary: null,
  setItinerary: (itinerary) => set({ itinerary }),
  clearItinerary: () => set({ itinerary: null })
}))
