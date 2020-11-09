import React from 'react'
import { useDevice } from 'vtex.device-detector'
import { ListContextProvider, useListContext } from 'vtex.list-context'

import { ImagesSchema, IMAGE_LIST_SCHEMA } from './modules/schema'
import { getImagesAsJSXList } from './modules/imageAsList'

interface Props {
  images: ImagesSchema
  height: number
}

const ImageList: StorefrontFunctionComponent<Props> = ({
  images,
  height = 420,
  children,
}) => {
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
