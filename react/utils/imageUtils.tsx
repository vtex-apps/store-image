import React from 'react'

import Image from '../Image'

export const getImagesAsJSXList = (
  images: Image[],
  isMobile: boolean,
  height: string | number
) => {
  return images.map(
    (
      {
        image,
        mobileImage,
        link,
        title,
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
        link={link}
        title={title}
        alt={description}
        maxHeight={height}
        width={width}
        experimentalPreventLayoutShift={experimentalPreventLayoutShift}
        {...props}
      />
    )
  )
}
