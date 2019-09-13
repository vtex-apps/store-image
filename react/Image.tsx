import React, { ImgHTMLAttributes, Fragment } from 'react'
import { generateBlockClass } from '@vtex/css-handles'
import { injectIntl, InjectedIntl, defineMessages } from 'react-intl'
import { formatIOMessage } from 'vtex.native-types'

import styles from './styles.css'

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  maxWidth: string
  maxHeight: string
  blockClass: string
  link: {
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
  srcSet = '',
  sizes = '',
  blockClass,
  link,
  intl,
}) => {
  const classes = generateBlockClass(styles.imageElement, blockClass)
  const maxDimensions = {
    maxWidth: maxWidth,
    maxHeight: maxHeight,
  }

  const formattedSrc = formatIOMessage({ id: src, intl })
  const formattedAlt = formatIOMessage({ id: alt, intl })

  const imgElement = (
    <img
      src={formattedSrc}
      srcSet={srcSet}
      sizes={sizes}
      alt={formattedAlt}
      style={maxDimensions}
      className={classes}
    />
  )

  return link ? (
    <a
      href={formatIOMessage({ id: link.url, intl })}
      rel={link.noFollow ? 'nofollow' : ''}
      target={link.openNewTab ? '_blank' : ''}
      title={formatIOMessage({ id: link.title, intl })}>
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
  title: messages.title,
  description: messages.description,
  type: 'object',
  properties: {
    blockClass: {
      title: 'admin/editor.blockClass.title',
      description: 'admin/editor.blockClass.description',
      type: 'string',
      isLayout: true,
    },
  },
}

export default injectIntl(Image)
