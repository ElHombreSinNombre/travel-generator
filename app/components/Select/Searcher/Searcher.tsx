import { SetStateAction, useEffect, useState } from "react";
import Select from "../Select";
import { Destination } from "@/app/models/destination";
import { useDispatch } from "react-redux";
import { getAllDestinations } from "@/app/endpoints/destination";
import { setDestination } from "@/app/store/slices/destination";
import destinationParser from "@/app/parsers/destination";
declare global {
  interface Window {
    google: any;
  }
}

function Searcher() {
  const dispatch = useDispatch();

  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [suggestions, setSuggestions] = useState([]);
  const [hasApiKey, setHasApiKey] = useState(false);

  const changeSelect = (selected: Destination) => {
    dispatch(setDestination(selected));
  };

  const handleSuggestionsFetchRequested = ({ value }: { value: string }) => {
    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions(
      {
        input: value,
        types: ["geocode"],
      },
      (predictions: SetStateAction<never[]>) => {
        setSuggestions(predictions);
      }
    );
  };

  const handleSuggestionSelected = (event: { target: { value: any } }) => {
    const parsedData = destinationParser("google", event.target.value);
    setDestination(parsedData);
    setSuggestions([]);
  };

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_GooglePlace) {
      setHasApiKey(true);
    } else {
      setHasApiKey(false);
      const fetchData = async () => {
        const destinations = await getAllDestinations();
        setDestinations(destinations);
      };
      fetchData();
    }
  }, []);

  return (
    <div>
      {hasApiKey ? (
        <>
          <Select
            items={destinations}
            //onChange={handleSuggestionSelected}
            //onFocus={handleSuggestionsFetchRequested}
          />
        </>
      ) : (
        <Select
          items={destinations}
          name="Destination"
          onChange={changeSelect}
        />
      )}
    </div>
  );
}

export default Searcher;
