import { useEffect, useState } from "react";
import Select from "../Select";
import { Destination } from "@/app/models/destination";
import { getAllDestinations } from "@/app/endpoints/destination";
import { setDestination } from "@/app/store/slices/destination";
import destinationParser from "@/app/parsers/destination";
import Input from "../../Input";
import { useDispatch, useSelector } from "react-redux";
import { Google } from "@/app/models/google";
import { googleapi } from "../../../store/slices/apis";
import { AnimatePresence } from "framer-motion";
import List from "../../Framer/List";
import Spinner from "../../Spinner";

declare global {
  interface Window {
    google: any;
  }
}

function Searcher() {
  const dispatch = useDispatch();

  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [loading, setLoading] = useState<boolean>(false);
  const googleKey = useSelector(googleapi);

  const changeSelect = (selected: Destination) => {
    dispatch(setDestination(selected));
    setSelectedIndex(destinations.indexOf(selected));
    setSearchValue(selected.name);
  };

  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);
      const destinations = await getAllDestinations();
      setDestinations(destinations);
      if (!!googleKey) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        setDestinations([]);
        return () => {
          document.body.removeChild(script);
        };
      }
    };
    fetchDestinations();
    setLoading(false);
  }, [googleKey]);

  const handleSuggestionsFetchRequested = (value: string) => {
    if (value.length) {
      if (searchValue != value) {
        setSearchValue(value);
        const service = new window.google.maps.places.AutocompleteService();
        service.getPlacePredictions(
          {
            input: value,
            types: ["geocode"],
          },
          (predictions: Google[]) => {
            setTimeout(() => {
              setDestinations(destinationParser(predictions, "google"));
            }, 300);
          }
        );
      }
    } else {
      setDestinations([]);
      setSearchValue("");
    }
  };

  const GoogleSearch = () => {
    return (
      <>
        <Input
          autofocus
          value={searchValue}
          name="searcher"
          placeholder="Destination"
          onChange={(value) =>
            handleSuggestionsFetchRequested(value.toString())
          }
        />
        {destinations.length ? (
          <ul className="border max-h-40 overflow-y-scroll">
            <AnimatePresence>
              {destinations.map((destination, index) => (
                <List key={destination.id}>
                  <div
                    className={`p-2 cursor-pointer  ${
                      selectedIndex === index
                        ? "bg-black text-white"
                        : "hover:bg-black hover:text-white transition duration-500"
                    }`}
                    onClick={() => changeSelect(destination)}
                  >
                    {destination.name}
                  </div>
                </List>
              ))}
            </AnimatePresence>
          </ul>
        ) : null}
      </>
    );
  };

  const DefaultSearch = () => {
    return <Select items={destinations} onChange={changeSelect} mandatory />;
  };

  return (
    <>
      {loading ? (
        <div className="flex w-full justify-center">
          <Spinner />
        </div>
      ) : googleKey ? (
        <GoogleSearch />
      ) : (
        <DefaultSearch />
      )}
    </>
  );
}

export default Searcher;
