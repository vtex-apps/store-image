import React from 'react'

import Image from '../Image'
import type { ImagesSchema } from '../ImageTypes'

export const getImagesAsJSXList = (
  images: ImagesSchema,
  isMobile: boolean,
  height: string | number,
  preload?: boolean
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
        src={isMobile && mobileImage ? mobileImage : image}
        alt={description}
        maxHeight={height}
        width={width}
        experimentalPreventLayoutShift={experimentalPreventLayoutShift}
        preload={preload && idx === 0}
        {...props}
      />
    )
  )
}
