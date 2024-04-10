import { create } from 'zustand'
import { Media } from '@/app/types/media'

type State = {
  medias: Media[] | null
  setMedias: (medias: Media[]) => void
  clearMedias: () => void
}

export const useMediaStore = create<State>((set) => ({
  medias: null,
  setMedias: (medias) => set({ medias }),
  clearMedias: () => set({ medias: null })
}))
