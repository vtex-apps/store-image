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
  link?: Link
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

  /**
   * To understand why we need to check for both newTab and openNewTab
   * properties, check the Image type definition at './typings/image.d.ts'.
   */
  const shouldOpenLinkInNewTab = link?.newTab ?? link?.openNewTab

  return link ? (
    <a
      href={formatIOMessage({ id: link.url, intl })}
      rel={link.noFollow ? 'nofollow' : ''}
      target={shouldOpenLinkInNewTab ? '_blank' : undefined}
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
    id: 'admin/editor.store-image.title',
  },
  description: {
    id: 'admin/editor.store-image.description',
  },
})

Image.schema = {
  title: messages.title.id,
}

export default Image
