import React from 'react'

import Image from '../Image'
import type { ImagesSchema } from '../ImageTypes'

export const getImagesAsJSXList = (
  images: ImagesSchema,
  isMobile: boolean,
  useDesktopImage: boolean,
  isTablet: boolean,
  height: string | number
) => {
  return images.map(
    (
      {
        image,
        mobileImage,
        description,
        experimentalPreventLayoutShift,
        width = '100%',
        ...props
      },
      idx
    ) => (
      <Image
        key={idx}
        src={(isTablet && useDesktopImage ? image : isMobile && mobileImage ? mobileImage : image)}
        alt={description}
        maxHeight={height}
        width={width}
        experimentalPreventLayoutShift={experimentalPreventLayoutShift}
        {...props}
      />
    )
  )
}
