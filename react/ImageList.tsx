import React from 'react'
import Image from "./Image"
import { useDevice } from "vtex.device-detector"
import { IMAGE_LIST_SCHEMA } from "./utils/schema"

interface ImageListProps {
  images: Image[]
  height: number
}

const ImageList = (props: ImageListProps) => {
  const { images, height = 420 } = props
  const { isMobile } = useDevice()

  const imageListContent = images.map(
    (
      {
        image,
        mobileImage,
        link,
        title,
        description,
        experimentalPreventLayoutShift,
        width = '100%',
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
      />
    )
  )

  return (
    <React.Fragment>
      {imageListContent}
    </React.Fragment>
  )
}

ImageList.schema = IMAGE_LIST_SCHEMA

export default ImageList
