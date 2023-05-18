import { Destination } from "../models/destination";
import { Google } from "../models/google";
import { useState } from "react";

const destinationParser = (
  data: Destination | Google[],
  type: string = "default"
): Destination[] => {
  let newData: Destination[] = [];
  if (data) {
    if (type === "google") {
      newData = Object.values(data).map((destinationData: Google) => {
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
    }
  }

  return sort(newData);
};

function sort(data: Destination[]) {
  return data.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
}

export default destinationParser;
