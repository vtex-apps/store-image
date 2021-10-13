import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { SliderLayout } from 'vtex.slider-layout'
import { useDevice } from 'vtex.device-detector'
import { formatIOMessage } from 'vtex.native-types'

import Image from './Image'
import type { SliderConfig, ImagesSchema } from './ImageTypes'

export interface ImageSliderProps {
  images: ImagesSchema
  height: number
  sliderLayoutConfig: SliderConfig
  preload?: boolean
}

function getImageUrl(isMobile: boolean, image: string, mobileImage: string) {
  return !!mobileImage && isMobile ? mobileImage : image
}

function ImageSlider(props: ImageSliderProps) {
  const {
    images,
    height,
    sliderLayoutConfig = {
      itemsPerPage: {
        desktop: 1,
        tablet: 1,
        phone: 1,
      },
      infinite: true,
      showNavigationArrows: 'always',
      showPaginationDots: 'always',
      usePagination: true,
    },
    preload,
  } = props

  const { isMobile } = useDevice()
  const intl = useIntl()

  return (
    <SliderLayout {...sliderLayoutConfig} totalItems={images.length}>
      {images.map(
        ({ image, mobileImage, link, description, ...otherProps }, idx) => {
          const formattedImage = formatIOMessage({ id: image, intl })
          const formattedMobileImage = formatIOMessage({
            id: mobileImage,
            intl,
          })

          const imageUrl = getImageUrl(
            isMobile,
            typeof formattedImage === 'string' ? formattedImage : '',
            typeof formattedMobileImage === 'string' ? formattedMobileImage : ''
          )

          const formattedAltDescription = formatIOMessage({
            id: description,
            intl,
          })

          const formattedUrl = link
            ? formatIOMessage({ id: link.url, intl })
            : ''

          const formattedTitle = link
            ? formatIOMessage({
                id: link.attributeTitle,
                intl,
              })
            : ''

          const imageLink = link && {
            ...link,
            url: typeof formattedUrl === 'string' ? formattedUrl : '',
            title: typeof formattedTitle === 'string' ? formattedTitle : '',
          }

          return (
            <Image
              key={idx}
              src={imageUrl}
              alt={
                typeof formattedAltDescription === 'string'
                  ? formattedAltDescription
                  : ''
              }
              link={imageLink}
              maxHeight={height}
              width="100%"
              preload={preload && idx === 0}
              {...otherProps}
            />
          )
        }
      )}
    </SliderLayout>
  )
}

const messages = defineMessages({
  title: { id: 'admin/editor.image-slider.title', defaultMessage: '' },
  description: {
    id: 'admin/editor.image-slider.description',
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
  imagesImageAttributeTitle: {
    id: 'admin/editor.image-list.images.title.title',
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
  sliderTitle: {
    id: 'admin/editor.image-slider.slider.title',
    defaultMessage: '',
  },
  sliderInfinite: {
    id: 'admin/editor.image-slider.slider.infinite',
    defaultMessage: '',
  },
  sliderShowNavigation: {
    id: 'admin/editor.image-slider.slider.showNavigation',
    defaultMessage: '',
  },
  sliderShowPaginationDots: {
    id: 'admin/editor.image-slider.slider.showPaginationDots',
    defaultMessage: '',
  },
  sliderUsePagination: {
    id: 'admin/editor.image-slider.slider.usePagination',
    defaultMessage: '',
  },
})

ImageSlider.schema = {
  title: messages.title.id,
  description: messages.description.id,
  type: 'object',
  properties: {
    height: {
      default: 420,
      enum: [420, 440],
      isLayout: true,
      title: messages.heightTitle.id,
      type: 'number',
    },
    sliderLayoutConfig: {
      title: messages.sliderTitle.id,
      properties: {
        infinite: {
          default: true,
          title: messages.sliderInfinite.id,
          type: 'boolean',
        },
        showNavigationArrows: {
          default: 'always',
          enum: ['mobileOnly', 'desktopOnly', 'always', 'never'],
          title: messages.sliderShowNavigation.id,
          type: 'string',
        },
        showPaginationDots: {
          default: 'always',
          enum: ['mobileOnly', 'desktopOnly', 'always', 'never'],
          title: messages.sliderShowPaginationDots.id,
          type: 'string',
        },
        usePagination: {
          default: true,
          title: messages.sliderUsePagination.id,
          type: 'boolean',
        },
      },
      type: 'object',
    },
  },
}

export default ImageSlider
