import React from 'react'

import Image from '../Image'
import type { ImagesSchema } from '../ImageTypes'

export const getImagesAsJSXList = (
  images: ImagesSchema,
  isMobile: boolean,
  height: string | number,
  preload?: boolean,
  experimentalPreventLayoutShift?: boolean,
  experimentalSetExplicitDimensions?: boolean
) => {
  return images.map(
    (
      {
        image,
        mobileImage,
        description,
        experimentalPreventLayoutShift: experimentalPreventLayoutShiftChild,
        experimentalSetExplicitDimensions: experimentalSetExplicitDimensionsChild,
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
        experimentalPreventLayoutShift={
          experimentalPreventLayoutShift ?? experimentalPreventLayoutShiftChild
        }
        experimentalSetExplicitDimensions={
          experimentalSetExplicitDimensions ??
          experimentalSetExplicitDimensionsChild
        }
        preload={preload && idx === 0}
        {...props}
      />
    )
  )
}
