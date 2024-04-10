import { Destination } from '@/types/destination'
import { Google } from '@/types/google'

const destinationParser = (data: Destination[] | Google[]): Destination[] => {
  let parsedDestination: Destination[] = []
  if (data.every((item) => item.hasOwnProperty('place_id'))) {
    parsedDestination = (data as Google[]).map((item: Google) => {
      const destination: Destination = {
        id: Number(item.place_id),
        name: item.description
      }
      return destination
    })
  } else {
    parsedDestination = (data as Destination[]).map(
      (item: Destination, index) => {
        return { id: index + 1, name: item.name }
      }
    )
  }
  return sort(parsedDestination)
}

function sort(data: Destination[]) {
  return data.sort(function (a, b) {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
    return 0
  })
}

export default destinationParser
