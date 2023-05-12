"use client";
import {
  PinAlt,
  YouTube,
  InfoEmpty,
  Map,
  Book,
  Leaf,
  Running,
  OrganicFood,
  MediaImage,
} from "iconoir-react";
import Select from "./components/Select";
import Button from "./components/Button";
import Toast from "./components/Toast";
import Input from "./components/Input";
import Divider from "./components/Divider";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedDestinationName } from "./store/slices/destination";
import { setItinerary, itineraryActivities } from "./store/slices/itinerary";
import { setMedias, allMedias } from "./store/slices/media";
import { Itinerary } from "./models/itinerary";
import { searchItinerary, getImages } from "./endpoints/itinerary";
import { Options } from "./models/options";
import Gallery from "./components/Gallery";
import Image from "next/image";
import Searcher from "./components/Select/Searcher";
import FadeIn from "./components/Framer/FadeIn/FadeIn";

const Home = () => {
  const dispatch = useDispatch();

  const destination = useSelector(selectedDestinationName);

  const itinerary = useSelector(itineraryActivities);

  const medias = useSelector(allMedias);

  const [error, setError] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const [language, setLanguage] = useState<string>("");

  const [numActivities, setNumActivities] = useState<number>(1);

  const options: Options[] = [
    { id: 1, name: "Culture", icon: <Book /> },
    { id: 2, name: "Sport", icon: <Running /> },
    { id: 3, name: "Nature", icon: <Leaf /> },
    { id: 4, name: "Gastronomy", icon: <OrganicFood /> },
  ];

  const [option, setOption] = useState<Options>(options[0]);

  const generate = () => {
    setLoading(true);
    setError(false);
    dispatch(setItinerary([]));
    setTimeout(getStore, 300);
  };

  async function getStore() {
    setMedias([]);
    dispatch(setItinerary([]));
    try {
      const itinerary = await searchItinerary(
        destination,
        language,
        numActivities,
        option.name
      );
      if (process.env.NEXT_PUBLIC_Pexels) {
        const promises = itinerary.map(async (element: Itinerary) => {
          const image = await getImages(element.activity, 1);
          return { ...element, media: image.at(0) };
        });
        const itineraryWithMedia = await Promise.all(promises);
        dispatch(setItinerary(itineraryWithMedia));
        const media = await getImages(destination, 5);
        dispatch(setMedias(media));
        console.log(medias);
      } else {
        dispatch(setItinerary(itinerary));
      }
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }

  const Itineraries = () => {
    if (itinerary && itinerary.length) {
      return (
        <FadeIn>
          <div className="card pa-2 hover:shadow-lg hover:border-black border">
            <div className="grid gap-y-4">
              <div className="flex overflow-x-scroll sm:overflow-x-scroll snap-x-mandatory snap-align-start md:overflow-x-hidden md:hover:overflow-x-auto">
                {itinerary.map((itinerary: Itinerary) => (
                  <div
                    key={itinerary.id}
                    className="sm:snap-center max-w-sm rounded border-opacity-10 border-black border flex-grow-1 flex-shrink-0 mx-2 p-4 m-4 hover:shadow-md"
                  >
                    {itinerary.media ? (
                      <Image
                        width={350}
                        height={300}
                        alt={itinerary.media.alt}
                        src={itinerary.media.photo}
                        title={itinerary.media.alt}
                      />
                    ) : (
                      <div
                        className="w-[350px] h-[300px] bg-slate-400 flex flex-col items-center justify-center text-white"
                        title="No image"
                      >
                        <MediaImage />
                      </div>
                    )}
                    <p className="text-2xl font-bold line-clamp-1">
                      {itinerary.activity}
                    </p>
                    <p className="font-bold line-clamp-1">
                      {itinerary.location}
                    </p>
                    <p>{itinerary.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      );
    }
    return null;
  };

  const ImageGallery = () => {
    if (medias && medias.length) {
      return (
        <FadeIn>
          <div className="card grid gap-y-4 hover:shadow-lg hover:border-black border">
            <p className="text-2xl font-bold ">{destination}</p>
            <Gallery items={medias} />
            <ExtraInfo />
          </div>
        </FadeIn>
      );
    } else {
      return null;
    }
  };

  const ExtraInfo = () => {
    return (
      <div className="grid gap-y-4">
        <Divider />
        <div className="flex gap-x-4 items-center justify-center">
          <a
            className=" cursor-pointer hover:text-red-700"
            title="Youtube"
            target="_blank"
            href={`https://www.youtube.com/results?search_query=${destination}`}
          >
            <YouTube />
          </a>
          <a
            className="cursor-pointer hover:text-blue-700"
            title="Wikipedia"
            target="_blank"
            href={`https://wikipedia.org/wiki/${destination}`}
          >
            <InfoEmpty />
          </a>
          <a
            className="cursor-pointer hover:text-green-700"
            title="Google maps"
            target="_blank"
            href={`http://maps.google.com/?q=${destination}`}
          >
            <Map />
          </a>
        </div>
      </div>
    );
  };

  const ToastMessage = () => {
    if (error) {
      return (
        <FadeIn>
          <Toast
            text="Check API Key or internet connection"
            backgroundColor="error"
          />
        </FadeIn>
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    setLanguage(
      typeof window !== "undefined" ? window.navigator.language : "EN-en"
    );
  }, []);

  return (
    <main className="center ">
      <div className="flex flex-col overflow-hidden m-8 max-w-full gap-14">
        <div className="card max-w-5xl mx-auto border hover:shadow-lg hover:border-black ">
          <PinAlt className="my-3 w-full" width="2em" height="2em" />
          <Searcher />
          <div className="grid-container grid  grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="col-span-2">
              <Select
                items={options}
                name="Options"
                onChange={(selected) => setOption(selected)}
                value={option}
              />
            </div>
            <div className="col-span-1">
              <Input
                placeholder="Days"
                onChange={(value) => setNumActivities(+value)}
                type="number"
                value={numActivities}
                min={1}
                max={7}
              />
            </div>
          </div>
          <Button
            onClick={generate}
            disabled={numActivities && destination ? false : true}
            loading={loading}
          />
          <ToastMessage />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-16">
          <Itineraries />
          <ImageGallery />
        </div>
      </div>
    </main>
  );
};

export default Home;

