import React from 'react'

import { IMAGE_LIST_SCHEMA } from './modules/schema'
import { getImagesAsJSXList } from './modules/imageAsList'
import type { ImageListProps } from './ImageList'

const ImageListWithoutContext = (props: ImageListProps) => {
  const { images, height = 420 } = props

  const imageListContent = getImagesAsJSXList(images, height)

  return <React.Fragment>{imageListContent}</React.Fragment>
}

ImageListWithoutContext.schema = IMAGE_LIST_SCHEMA

export default ImageListWithoutContext
