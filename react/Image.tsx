import React, { ImgHTMLAttributes, Fragment } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useIntl, defineMessages } from 'react-intl'
import { formatIOMessage } from 'vtex.native-types'

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  maxWidth?: string | number
  maxHeight?: string | number
  minWidth?: string | number
  minHeight?: string | number
  blockClass?: string
  link?: {
    url: string
    noFollow: boolean
    title: string
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
}

const CSS_HANDLES = ['imageElement', 'imageElementLink'] as const

function Image(props: ImageProps) {
  const {
    src,
    alt = '',
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
    width,
    height,
    srcSet = '',
    sizes = '',
    link,
    title,
  } = props
  const intl = useIntl()
  const handles = useCssHandles(CSS_HANDLES, {
    migrationFrom: 'vtex.store-components@3.x',
  })
  const imageDimensions = {
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    width,
    height,
  }

  const formattedSrc = formatIOMessage({ id: src, intl })
  const formattedAlt = formatIOMessage({ id: alt, intl })

  const imgElement = (
    <img
      title={title}
      sizes={sizes}
      srcSet={srcSet}
      src={formattedSrc}
      alt={formattedAlt}
      style={imageDimensions}
      className={handles.imageElement}
    />
  )

  const shouldOpenLinkInNewTab = link?.newTab ?? link?.openNewTab

  return link ? (
    <a
      href={formatIOMessage({ id: link.url, intl })}
      rel={link.noFollow ? 'nofollow' : ''}
      target={shouldOpenLinkInNewTab ? '_blank' : ''}
      title={formatIOMessage({ id: link.title, intl })}
      className={handles.imageElementLink}
    >
      {imgElement}
    </a>
  ) : (
    <Fragment>{imgElement}</Fragment>
  )
}

const messages = defineMessages({
  title: {
    defaultMessage: '',
    id: 'admin/editor.store-image.title',
  },
  description: {
    defaultMessage: '',
    id: 'admin/editor.store-image.description',
  },
  blockClassTitle: {
    defaultMessage: '',
    id: 'admin/editor.store-image.blockClass.title',
  },
  blockClassDescription: {
    defaultMessage: '',
    id: 'admin/editor.store-image.blockClass.description',
  },
})

Image.schema = {
  title: messages.title.id,
  description: messages.description.id,
  type: 'object',
  properties: {
    blockClass: {
      title: messages.blockClassTitle.id,
      description: messages.blockClassDescription.id,
      type: 'string',
      isLayout: true,
    },
  },
}

export default Image
