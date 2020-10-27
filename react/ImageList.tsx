import { ListContextProvider, useListContext } from 'vtex.list-context'
import { useDevice } from 'vtex.device-detector'

import React from 'react'

import { IMAGE_LIST_SCHEMA } from './utils/schema'
import { getImagesAsJSXList } from './utils/imageUtils'

interface Props {
  images: Image[]
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
