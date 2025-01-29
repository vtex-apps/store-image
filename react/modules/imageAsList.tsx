import React from 'react'

import Image from '../Image'
import type { ImagesSchema } from '../ImageTypes'

export const getImagesAsJSXList = (
  images: ImagesSchema,
  isMobile: boolean,
  height: number | string,
  preload?: boolean,
  experimentalPreventLayoutShift?: boolean,
  experimentalSetExplicitDimensions?: boolean
  // eslint-disable-next-line max-params
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
        height: explicitHeight,
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
        explicitHeight={explicitHeight}
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
