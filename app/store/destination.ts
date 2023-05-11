import { create } from 'zustand'
import { Destination } from '@/app/types/destination'

type State = {
  destination: Destination | null
  setDestination: (destination: Destination) => void
}

export const useDestinationStore = create<State>((set) => ({
  destination: null,
  setDestination: (destination: Destination) => set({ destination })
}))
