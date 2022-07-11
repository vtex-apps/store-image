import { useEffect, useState } from 'react'

export const usePosition = () => {
  const [position, setPosition] = useState<LatLong>({
    latitude: undefined,
    longitude: undefined,
  })

  const [error, setError] = useState<boolean | undefined>(undefined)

  const onSuccess = (gelocation: LatLongHistory) => {
    const { coords } = gelocation

    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    })
    setError(false)
  }

  const onError = () => {
    setError(true)
  }

  useEffect(() => {
    const geo = navigator.geolocation

    if (!navigator || !geo) {
      setError(true)
    }

    geo.getCurrentPosition(onSuccess, onError)
  }, [])

  return { ...position, error }
}
