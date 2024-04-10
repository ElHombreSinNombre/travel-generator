import { useEffect, useState } from 'react'
import Select from '@/components/Select'
import { Destination } from '@/types/destination'
import { getAllDestinations } from '@/endpoints/destination'
import destinationParser from '@/parsers/destination'
import Input from '@/components/Input'
import { Google } from '@/types/google'
import { AnimatePresence } from 'framer-motion'
import List from '@/components/Framer/List'
import Spinner from '@/components/Spinner'
import { useDestinationStore } from '@/store/destination'

declare global {
  interface Window {
    google: any
  }
}

function Searcher() {
  const { setDestination } = useDestinationStore((state) => ({
    setDestination: state.setDestination
  }))
  const [destinations, setDestinations] = useState<Destination[] | null>(null)
  const [searchValue, setSearchValue] = useState<string | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [loading, setLoading] = useState<boolean>(false)
  const googleKey = process.env.NEXT_PUBLIC_GOOGLE_KEY

  const changeSelect = (selected: Destination) => {
    setDestination(selected)
    if (destinations) setSelectedIndex(destinations.indexOf(selected))
    setSearchValue(selected.name)
  }

  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true)
      const destinations = await getAllDestinations()
      setDestinations(destinations)
      if (!!googleKey) {
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleKey}&libraries=places`
        script.async = true
        script.defer = true
        document.body.appendChild(script)
        setDestinations(null)
        return () => {
          document.body.removeChild(script)
        }
      }
    }
    fetchDestinations()
    setLoading(false)
  }, [googleKey])

  const handleSuggestionsFetchRequested = (value: string) => {
    if (value.length) {
      if (searchValue != value) {
        setSearchValue(value)
        const service = new window.google.maps.places.AutocompleteService()
        service.getPlacePredictions(
          {
            input: value,
            types: ['geocode']
          },
          (predictions: Google[]) => {
            setTimeout(() => {
              setDestinations(destinationParser(predictions))
            }, 300)
          }
        )
      }
    } else {
      setDestinations(null)
      setSearchValue(null)
    }
  }

  const GoogleSearch = () => {
    return (
      <>
        <Input
          autofocus
          value={searchValue}
          name='searcher'
          placeholder='Destination'
          onChange={(value) =>
            handleSuggestionsFetchRequested(value.toString())
          }
        />
        {destinations && destinations.length ? (
          <ul className='border max-h-40 overflow-y-scroll'>
            <AnimatePresence>
              {destinations.map((destination, index) => (
                <List key={destination.id}>
                  <div
                    className={`p-2 cursor-pointer  ${
                      selectedIndex === index
                        ? 'bg-black text-white'
                        : 'hover:bg-black hover:text-white transition duration-500'
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
    )
  }

  const DefaultSearch = () => {
    return <Select items={destinations} onChange={changeSelect} mandatory />
  }

  return (
    <>
      {loading ? (
        <div className='flex w-full justify-center'>
          <Spinner />
        </div>
      ) : googleKey ? (
        <GoogleSearch />
      ) : (
        <DefaultSearch />
      )}
    </>
  )
}

export default Searcher
