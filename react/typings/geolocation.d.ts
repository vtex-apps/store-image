interface LatLong {
  latitude: number | undefined
  longitude: number | undefined
}

interface LatLongHistory {
  coords: LatLong
  timestamp: number
}

interface GeolocationPositionError {
  code: number
  message: string
}
