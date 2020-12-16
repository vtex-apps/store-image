import React from 'react'
import type { PropsWithChildren } from 'react'
import { useDevice } from 'vtex.device-detector'
import { ListContextProvider, useListContext } from 'vtex.list-context'

import type { ImagesSchema } from './modules/schema'
import { IMAGE_LIST_SCHEMA } from './modules/schema'
import { getImagesAsJSXList } from './modules/imageAsList'

interface Props {
  images: ImagesSchema
  height: number
}

function ImageList({
  images,
  height = 420,
  children,
}: PropsWithChildren<Props>) {
  const list = useListContext()?.list ?? []
  const { isMobile } = useDevice()

  const imageListContent = getImagesAsJSXList(images, isMobile, height)
  const newListContextValue = list.concat(imageListContent)

  return (
    <ListContextProvider list={newListContextValue}>
      {children}
    </ListContextProvider>
  )
}

ImageList.schema = IMAGE_LIST_SCHEMA

export default ImageList
