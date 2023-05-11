import { Media } from "../models/media";

const mediaParsers = (data: any): Media[] => {
  const photos = data.map((photo: any) => {
    return {
      id: photo.id,
      alt: photo.alt,
      photo: photo.src.landscape,
    };
  });
  return photos;
};

export default mediaParsers;
