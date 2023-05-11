import { useEffect, useState } from 'react'
import { Destination } from '@/types/destination'
import { Options } from '@/types/options'
import { NavArrowUp } from 'iconoir-react'
import React from 'react'
import { AnimatePresence } from 'framer-motion'
import List from '@/components/Framer/List'
import { useDestinationStore } from '@/store/destination'

interface SelectProps {
  items: (Destination | Options)[] | null
  mandatory?: boolean
  onChange?: (selected: Destination | Options) => void
}

function Select({ items = null, onChange, mandatory }: SelectProps) {
  const destination = useDestinationStore.name
  const { setDestination } = useDestinationStore((state) => ({
    setDestination: state.setDestination
  }))
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelected] = useState<Destination | Options>()

  const change = (selected: Destination | Options) => {
    if (selected != selectedValue) {
      setSelected(selected)
      setDestination(selected)
      if (onChange) onChange(selected)
    }
    setIsOpen(false)
  }

  useEffect(() => {
    const item = items && items.find((item) => item.name === destination)
    if (item) {
      setSelected(item)
      setDestination(item)
    } else if (mandatory && items) {
      setDestination(items[0])
      setSelected(items[0] as Destination)
    }
  }, [destination, items, mandatory, selectedValue])

  const IconName = ({ item }: { item: Destination | Options }) => {
    return (
      <div className='flex items-center'>
        {'icon' in item && item.icon ? (
          <div className='flex items-center justify-center mr-2'>
            {React.isValidElement(item.icon) ? item.icon : null}
          </div>
        ) : null}
        <div className='flex-grow'>{item.name}</div>
      </div>
    )
  }

  return (
    <div className='relative'>
      <div
        className='flex select items-center'
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue ? (
          <IconName item={selectedValue} />
        ) : (
          <div className='flex w-full'>Select option</div>
        )}
        <div className='ml-auto'>
          <NavArrowUp
            className={`w-3 h-3 ${
              !isOpen
                ? 'transform rotate-180 transition-transform duration-300'
                : 'transform transition-transform duration-300'
            }`}
          />
        </div>
      </div>
      {isOpen && (
        <ul className='absolute z-10 w-full bg-white border rounded overflow-y-scroll h-32 '>
          <AnimatePresence>
            {items &&
              items.map((item) => (
                <List key={item.id}>
                  <div
                    className={`px-2 py-1 cursor-pointer flex items-center ${
                      selectedValue?.id === item.id
                        ? 'bg-gray-200'
                        : 'hover:bg-gray-200 transition duration-500'
                    }`}
                    onClick={() => change(item)}
                  >
                    <IconName item={item} />
                  </div>
                </List>
              ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  )
}

export default Select
