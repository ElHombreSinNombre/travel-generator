import { Destination } from "../models/destination";

const destinationParser = (
  data: Destination | string,
  type: string = "default"
) => {
  let newData: Destination[] = [];
  if (type === "google") {
    const parsedData = JSON.parse(data as string);
    newData = parsedData.predictions.map((destinationData: any) => {
      const destination: Destination = {
        id: destinationData.place_id,
        name: destinationData.description,
      };
      return destination;
    });
  } else {
    newData = Object.entries(data).map(([code, name], index) => {
      return { id: index + 1, code, name: name as string };
    });
    newData.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }
  return newData;
};

export default destinationParser;
