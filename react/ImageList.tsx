import React from 'react'
import type { PropsWithChildren } from 'react'
import { useDevice } from 'vtex.device-detector'
import { ListContextProvider, useListContext } from 'vtex.list-context'

import { IMAGE_LIST_SCHEMA } from './modules/schema'
import { getImagesAsJSXList } from './modules/imageAsList'
import type { ImagesSchema } from './ImageTypes'

export interface ImageListProps {
  images: ImagesSchema
  height?: number
  preload?: boolean
}

function ImageList({
  images,
  height = 420,
  children,
  preload,
}: PropsWithChildren<ImageListProps>) {
  const list = useListContext()?.list ?? []
  const { isMobile } = useDevice()

  const imageListContent = getImagesAsJSXList(images, isMobile, height, preload)
  const newListContextValue = list.concat(imageListContent)

  return (
    <ListContextProvider list={newListContextValue}>
      {children}
    </ListContextProvider>
  )
}

ImageList.schema = IMAGE_LIST_SCHEMA

export default ImageList
