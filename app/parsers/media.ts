import { Media } from '@/types/media'

const mediaParsers = (data: Media[]) => {
  const photos = data.map((photo: Media) => {
    return {
      id: photo.id,
      alt: photo.alt,
      src: { landscape: photo.src.landscape }
    }
  })
  return photos
}

export default mediaParsers
