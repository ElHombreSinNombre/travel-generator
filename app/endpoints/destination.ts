import { Destination } from "../models/destination";
import destinationParser from "../parsers/destination";
import axios from "axios";

export const getAllDestinations = async (): Promise<Destination[]> => {
  try {
    const response = await axios.get("http://country.io/names.json");
    const data = response.data;
    if (!data) {
      throw new Error("No data was received.");
    }
    return destinationParser(data);
  } catch (error) {
    throw new Error("Failed to fetch destinations");
  }
};
