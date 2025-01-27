import { useEffect, useRef } from 'react'
import BlazeSlider from 'blaze-slider'

export function useBlazeSlider(config) {
  const sliderRef = useRef()
  const elRef = useRef()

  useEffect(() => {
    // if not already initialized
    if (!sliderRef.current) {
      sliderRef.current = new BlazeSlider(elRef.current, config)
    }
  }, [])

  return elRef
}