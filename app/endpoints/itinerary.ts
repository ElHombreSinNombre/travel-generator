import { Itinerary } from "../models/itinerary";
import itineraryParser from "../parsers/itinerary";
import { Configuration, OpenAIApi } from "openai";
import axios from "axios";
import { Media } from "../models/media";
import mediaParsers from "../parsers/media";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OpenAI,
});
const openai = new OpenAIApi(configuration);

export const searchItinerary = async (
  destination: string,
  language: string,
  number: number,
  option: string
): Promise<Itinerary[]> => {
  const prompt = `Créame un itinerario con ${number} actividades sobre ${destination} centrado en ${option}, los valores tienen que estar en el idioma que significa este código ${language} . Para ello, create un JSON que tenga solo id, activity, description y location de la actividad. La raiz del JSON tiene que llamarse itinerary. Solo quiero el itinerario, sin ninguna otra explicación.`;
  try {
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "assistant",
          content: prompt,
        },
      ],
    });

    if (!res.data?.choices) {
      throw new Error("No response was received from the OpenAI API.");
    }
    const content = res.data.choices && res.data.choices[0]?.message?.content;
    if (!content) {
      throw new Error(
        "The response from the OpenAI API does not contain valid content."
      );
    }
    return itineraryParser(content);
  } catch (error) {
    throw new Error("Failed to fetch itineraries");
  }
};

export const getImages = async (
  name: string,
  quantity: number
): Promise<Media[]> => {
  try {
    const response = await axios.get("https://api.pexels.com/v1/search", {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_Pexels,
      },
      params: {
        size: "medium",
        query: name,
        per_page: quantity,
        page: Math.floor(Math.random() * quantity) + 1,
      },
    });
    const data = response.data;
    if (!data) {
      throw new Error("No data was received.");
    }
    const photos = data.photos;
    return mediaParsers(photos);
  } catch (error) {
    throw new Error("Failed to fetch imagnes");
  }
};
