import React from 'react'
import { useDevice } from 'vtex.device-detector'

import type { ImagesSchema } from './modules/schema'
import { IMAGE_LIST_SCHEMA } from './modules/schema'
import { getImagesAsJSXList } from './modules/imageAsList'

interface ImageListProps {
  images: ImagesSchema
  height: number
}

const ImageListWithoutContext = (props: ImageListProps) => {
  const { images, height = 420 } = props
  const { isMobile } = useDevice()

  const imageListContent = getImagesAsJSXList(images, isMobile, height)

  return <React.Fragment>{imageListContent}</React.Fragment>
}

ImageListWithoutContext.schema = IMAGE_LIST_SCHEMA

export default ImageListWithoutContext
