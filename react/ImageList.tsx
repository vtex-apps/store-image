import React, { Fragment } from 'react'
import { defineMessages } from 'react-intl'
import { useDevice } from 'vtex.device-detector'

import Image from './Image'

interface Props {
  images: {
    link?: {
      url: string
      noFollow: boolean
      openNewTab: boolean
      title: string
    }
    image: string
    mobileImage: string
    description: string
  }[]
  height: number
}

const ImageList: StorefrontFunctionComponent<Props> = ({
  images,
  height = 420,
}) => {
  const { isMobile } = useDevice()

  return (
    <Fragment>
      {images.map(({ link, image, mobileImage, description }, idx) => (
        <Image
          key={idx}
          src={isMobile && mobileImage ? mobileImage : image}
          alt={description}
          link={link}
          maxHeight={height}
        />
      ))}
    </Fragment>
  )
}

const messages = defineMessages({
  title: { id: 'admin/editor.image-list.title', defaultMessage: '' },
  description: {
    id: 'admin/editor.image-list.description',
    defaultMessage: '',
  },
  imagesImageTitle: {
    id: 'admin/editor.image-list.images.image.title',
    defaultMessage: '',
  },
  imagesMobileImageTitle: {
    id: 'admin/editor.image-list.images.mobileImage.title',
    defaultMessage: '',
  },
  imagesImageDescription: {
    id: 'admin/editor.image-list.images.description.title',
    defaultMessage: '',
  },
  imagesImageLinkUrl: {
    id: 'admin/editor.image-list.images.link.url.title',
    defaultMessage: '',
  },
  imagesImageLinkOpenNewTab: {
    id: 'admin/editor.image-list.images.link.openNewTab.title',
    defaultMessage: '',
  },
  imagesImageLinkNoFollow: {
    id: 'admin/editor.image-list.images.link.noFollow.title',
    defaultMessage: '',
  },
  imagesImageLinkTitle: {
    id: 'admin/editor.image-list.images.link.title.title',
    defaultMessage: '',
  },
  imagesTitle: {
    id: 'admin/editor.image-list.images.title',
    defaultMessage: '',
  },
  heightTitle: {
    id: 'admin/editor.image-list.height.title',
    defaultMessage: '',
  },
})

ImageList.schema = {
  title: messages.title.id,
  description: messages.description.id,
  type: 'object',
  properties: {
    images: {
      items: {
        properties: {
          image: {
            default: '',
            title: messages.imagesImageTitle.id,
            type: 'string',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          mobileImage: {
            default: '',
            title: messages.imagesMobileImageTitle.id,
            type: 'string',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          description: {
            default: '',
            title: messages.imagesImageDescription.id,
            type: 'string',
          },
          link: {
            default: '',
            title: '',
            type: 'object',
            properties: {
              url: {
                type: 'string',
                title: messages.imagesImageLinkUrl.id,
                default: '',
              },
              openNewTab: {
                type: 'boolean',
                title: messages.imagesImageLinkOpenNewTab.id,
                default: false,
              },
              noFollow: {
                type: 'boolean',
                title: messages.imagesImageLinkNoFollow.id,
                default: false,
              },
              title: {
                type: 'string',
                title: messages.imagesImageLinkTitle.id,
                default: '',
              },
            },
          },
        },
        title: messages.imagesTitle.id,
        type: 'object',
      },
      minItems: 1,
      title: messages.imagesTitle.id,
      type: 'array',
    },
    height: {
      default: 420,
      enum: [420, 440],
      isLayout: true,
      title: messages.heightTitle.id,
      type: 'number',
    },
  },
}

export default ImageList
