import React from 'react'

import Image from '../Image'
import type { ImagesSchema } from '../ImageTypes'

interface ResponsiveImageParams {
  device: string
  image: string
  mobileImage: string
  phoneImage: string
}
const getResponsiveImage = ({ device, image, mobileImage, phoneImage }: ResponsiveImageParams) => {
  let currentImage = image;

  if( device == 'tablet' && mobileImage) currentImage = mobileImage;
  if(device == 'phone' && phoneImage) currentImage = phoneImage;
  else if (device == 'phone' && mobileImage) currentImage = mobileImage;
  
  return currentImage;
}

export const getImagesAsJSXList = (
  images: ImagesSchema,
  device: string,
  height: string | number,
  preload?: boolean
) => {
  return images.map(
    (
      {
        image,
        mobileImage,
        phoneImage,
        description,
        experimentalPreventLayoutShift,
        width = '100%',
        ...props
      },
      idx
    ) => {
      
      const currentImage = getResponsiveImage(device, image, mobileImage,phoneImage)
      
      return (
      <Image
        key={idx}
        src={currentImage}
        alt={description}
        maxHeight={height}
        width={width}
        experimentalPreventLayoutShift={experimentalPreventLayoutShift}
        preload={preload && idx === 0}
        {...props}
      />)
    }
  )
}
