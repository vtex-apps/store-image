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
      isLayout: false,
      title: IMAGE_LIST_MESSAGES.heightTitle.id,
      type: 'number',
    },
  },
}
