import { defineMessages } from 'react-intl'

const IMAGE_LIST_MESSAGES = defineMessages({
  title: { id: 'admin/editor.image-list.title' },
  description: {
    id: 'admin/editor.image-list.description',
  },
  imagesImageTitle: {
    id: 'admin/editor.image-list.images.image.title',
  },
  imagesMobileImageTitle: {
    id: 'admin/editor.image-list.images.mobileImage.title',
  },
  imagesImageDescription: {
    id: 'admin/editor.image-list.images.description.title',
  },
  imagesImageAttributeTitle: {
    id: 'admin/editor.image-list.images.title.title',
  },
  imagesImageLinkUrl: {
    id: 'admin/editor.image-list.images.link.url.title',
  },
  imagesImageLinkOpenNewTab: {
    id: 'admin/editor.image-list.images.link.openNewTab.title',
  },
  imagesImageLinkNoFollow: {
    id: 'admin/editor.image-list.images.link.noFollow.title',
  },
  imagesImageLinkTitle: {
    id: 'admin/editor.image-list.images.link.title.title',
  },
  imagesTitle: {
    id: 'admin/editor.image-list.images.title',
  },
  heightTitle: {
    id: 'admin/editor.image-list.height.title',
  },
  widthTitle: {
    id: 'admin/editor.image-list.images.width.title',
  },
  widthDescription: {
    id: 'admin/editor.image-list.images.width.description',
  },
  analyticsTitle: {
    id: 'admin/editor.image.analytics.title',
  },
  analyticsNone: {
    id: 'admin/editor.image.analytics.none',
  },
  analyticsProvide: {
    id: 'admin/editor.image.analytics.provide',
  },
  analyticsPromotionId: {
    id: 'admin/editor.image.analytics.promotionId',
  },
  analyticsPromotionName: {
    id: 'admin/editor.image.analytics.promotionName',
  },
  analyticsPromotionPosition: {
    id: 'admin/editor.image.analytics.promotionPosition',
  },
})

export const IMAGE_LIST_SCHEMA = {
  title: IMAGE_LIST_MESSAGES.title.id,
  description: IMAGE_LIST_MESSAGES.description.id,
  type: 'object',
  properties: {
    height: {
      default: 420,
      enum: [420, 440],
      isLayout: true,
      title: IMAGE_LIST_MESSAGES.heightTitle.id,
      type: 'number',
    },
  },
}

interface Link {
  url: string
  attributeNofollow: boolean
  attributeTitle?: string
  /**
   * These two properties need to both exist because
   * there was a mismatch in the API defined by this component,
   * which exposes a openNewTab prop, and the native link type
   * from vtex.native-types, which expects a newTab property
   * instead of openNewTab.
   */
  openNewTab?: boolean
  newTab?: boolean
}

export interface ImageSchema {
  src?: string
  link?: Link
  alt?: string
  title?: string
  analyticsProperties?: 'none' | 'provide'
  promotionId?: string
  promotionName?: string
  promotionPosition?: string
}

export type ImagesSchema = Array<{
  image: string
  mobileImage: string
  link?: Link
  title?: string
  description: string
  experimentalPreventLayoutShift?: boolean
  width?: number | string
  analyticsProperties?: 'none' | 'provide'
  promotionId?: string
  promotionName?: string
  promotionPosition?: string
}>
