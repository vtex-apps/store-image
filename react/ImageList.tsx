import { useDevice } from 'vtex.device-detector'

import React from 'react'

import { IMAGE_LIST_SCHEMA } from './utils/schema'
import { getImagesAsJSXList } from './utils/imageUtils'

interface ImageListProps {
  images: Image[]
  height: number
}

const ImageList = (props: ImageListProps) => {
  const { images, height = 420 } = props
  const { isMobile } = useDevice()

  const imageListContent = getImagesAsJSXList(images, isMobile, height)

  return <React.Fragment>{imageListContent}</React.Fragment>
}

ImageList.schema = IMAGE_LIST_SCHEMA

export default ImageList
