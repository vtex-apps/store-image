import React, { ImgHTMLAttributes, Fragment } from 'react'
import { generateBlockClass } from '@vtex/css-handles'
import { injectIntl, InjectedIntl, defineMessages } from 'react-intl'
import { formatIOMessage } from 'vtex.native-types'

import styles from './styles.css'

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  maxWidth?: string | number
  maxHeight?: string | number
  minWidth?: string | number
  minHeight?: string | number
  shouldFillWidth?: boolean
  blockClass?: string
  link?: {
    url: string
    noFollow: boolean
    openNewTab: boolean
    title: string
  }
  intl: InjectedIntl
}

const Image: StorefrontFunctionComponent<ImageProps> = ({
  src,
  alt = '',
  maxWidth = 'none',
  maxHeight = 'none',
  minWidth = 'none',
  minHeight = 'none',
  width = undefined,
  height = undefined,
  shouldFillWidth = false,
  srcSet = '',
  sizes = '',
  blockClass,
  link,
  intl,
}) => {
  const classes = generateBlockClass(styles.imageElement, blockClass)
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
      src={formattedSrc}
      srcSet={srcSet}
      sizes={sizes}
      alt={formattedAlt}
      style={{
        ...imageDimensions,
        width: shouldFillWidth ? '100%' : width,
      }}
      className={classes}
    />
  )

  return link ? (
    <a
      href={formatIOMessage({ id: link.url, intl })}
      rel={link.noFollow ? 'nofollow' : ''}
      target={link.openNewTab ? '_blank' : ''}
      title={formatIOMessage({ id: link.title, intl })}
      style={{ width: shouldFillWidth ? '100%' : width }}>
      {imgElement}
    </a>
  ) : (
    <Fragment>{imgElement}</Fragment>
  )
}

const messages = defineMessages({
  title: {
    defaultMessage: '',
    id: 'admin/editor.image.title',
  },
  description: {
    defaultMessage: '',
    id: 'admin/editor.image.description',
  },
  blockClassTitle: {
    defaultMessage: '',
    id: 'admin/editor.blockClass.title',
  },
  blockClassDescription: {
    defaultMessage: '',
    id: 'admin/editor.blockClass.description',
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

export default injectIntl(Image)
