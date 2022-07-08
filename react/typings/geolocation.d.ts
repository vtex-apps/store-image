interface Coordinate {
  latitude: number | undefined
  longitude: number | undefined
}

interface Position {
  coords: Coordinate
  timestamp: number
}

interface GeolocationPositionError {
  code: number
  message: string
}
