import { defineMessages } from "react-intl"

const IMAGE_LIST_MESSAGES = defineMessages({
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
