import React from 'react'
import { useDevice } from 'vtex.device-detector'

import { IMAGE_LIST_SCHEMA } from './modules/schema'
import { getImagesAsJSXList } from './modules/imageAsList'
import type { ImageListProps } from './ImageList'

const ImageListWithoutContext = (props: ImageListProps) => {
  const { images, height = 420, useDesktopImage = false } = props

  const { isMobile, device } = useDevice()

  const isTablet = device === "tablet"

  const imageListContent = getImagesAsJSXList(images, isMobile, useDesktopImage, isTablet, height)

  return <React.Fragment>{imageListContent}</React.Fragment>
}

ImageListWithoutContext.schema = IMAGE_LIST_SCHEMA

export default ImageListWithoutContext
