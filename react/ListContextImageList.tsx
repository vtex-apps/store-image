import { ListContextProvider, useListContext } from 'vtex.list-context'

import React from 'react'

import ImageList from "./ImageList"
import { IMAGE_LIST_SCHEMA } from "./utils/schema"

interface Props {
  images: Image[]
  height: number
}

const ListContextImageList: StorefrontFunctionComponent<Props> = ({
  images,
  height = 420,
  children
}) => {
  const list = useListContext()?.list ?? []

  const imageListContent = () => <ImageList images={images} height={height} />

  const newListContextValue = list.concat(imageListContent())

  return (
    <ListContextProvider list={newListContextValue}>
      {children}
    </ListContextProvider>
  )
}

ListContextImageList.schema = IMAGE_LIST_SCHEMA

export default ListContextImageList
