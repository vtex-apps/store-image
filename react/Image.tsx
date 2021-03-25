import React, { Fragment, useState, useRef, useEffect } from 'react'
import type { ImgHTMLAttributes, RefObject } from 'react'
import { useOnView } from 'vtex.on-view'
import { useCssHandles } from 'vtex.css-handles'
import type { CssHandlesTypes } from 'vtex.css-handles'
import { useIntl, defineMessages } from 'react-intl'
import { formatIOMessage } from 'vtex.native-types'
import { usePixel } from 'vtex.pixel-manager'

import type { ImageSchema } from './ImageTypes'

const CSS_HANDLES = ['imageElement', 'imageElementLink'] as const

export interface ImageProps
  extends ImageSchema,
    ImgHTMLAttributes<HTMLImageElement> {
  width?: string | number,
  height?: string | number,
  inlineWidth?: string | number,
  inlineHeight?: string | number,
  maxWidth?: string | number
  maxHeight?: string | number
  minWidth?: string | number
  minHeight?: string | number
  blockClass?: string
  experimentalPreventLayoutShift?: boolean
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

const useImageLoad = (
  imageRef: RefObject<HTMLImageElement | null>,
  { bailOut = false } = {}
) => {
  const [isLoaded, setLoaded] = useState(false)

  useEffect(() => {
    if (bailOut) {
      return
    }

    const imageElement = imageRef.current

    if (!imageElement) {
      return
    }

    if (imageElement.complete) {
      setLoaded(true)

      return
    }

    const handleLoad = () => {
      setLoaded(true)
    }

    imageElement.addEventListener('load', handleLoad)

    return () => {
      imageElement.removeEventListener('load', handleLoad)
    }
  }, [imageRef, bailOut])

  return isLoaded
}

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
    inlineWidth,
    inlineHeight,
    srcSet = '',
    sizes = '',
    link,
    title,
    experimentalPreventLayoutShift,
    analyticsProperties = 'none',
    promotionId,
    promotionName,
    promotionPosition,
    classes,
  } = props

  const imageRef = useRef<HTMLImageElement | null>(null)
  const isLoaded = useImageLoad(imageRef, {
    bailOut: !experimentalPreventLayoutShift,
  })

  const intl = useIntl()
  const { handles } = useCssHandles(CSS_HANDLES, {
    migrationFrom: 'vtex.store-components@3.x',
    classes,
  })

  const imageDimensions = {
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    width,
    height,
  }

  const placeholderSize = height ?? minHeight ?? maxHeight ?? 'auto'

  const formattedSrc = formatIOMessage({ id: src, intl })
  const formattedAlt = formatIOMessage({ id: alt, intl })

  const imgElement = (
    <img
      width={inlineWidth}
      height={inlineHeight}
      title={title}
      sizes={sizes}
      srcSet={srcSet}
      src={formattedSrc}
      alt={formattedAlt}
      style={imageDimensions}
      ref={imageRef}
      className={handles.imageElement}
    />
  )

  /**
   * To understand why we need to check for both newTab and openNewTab
   * properties, check the Image type definition at './typings/image.d.ts'.
   */
  const shouldOpenLinkInNewTab = link?.newTab ?? link?.openNewTab

  const { push } = usePixel()

  const promotionEventData =
    analyticsProperties === 'provide'
      ? {
          id: promotionId,
          name: promotionName,
          creative: formattedSrc,
          position: promotionPosition,
        }
      : undefined

  const maybeLink = link ? (
    <a
      href={formatIOMessage({ id: link.url, intl })}
      rel={link.attributeNofollow ? 'nofollow' : ''}
      target={shouldOpenLinkInNewTab ? '_blank' : undefined}
      title={formatIOMessage({ id: link?.attributeTitle, intl })}
      className={handles.imageElementLink}
      onClick={() => {
        if (analyticsProperties === 'none') return

        push({ event: 'promotionClick', promotions: [promotionEventData] })
      }}
    >
      {imgElement}
    </a>
  ) : (
    <Fragment>{imgElement}</Fragment>
  )

  useOnView({
    ref: imageRef,
    onView: () => {
      if (analyticsProperties === 'none') return

      push({
        event: 'promoView',
        promotions: [promotionEventData],
      })
    },
    once: true,
  })

  return experimentalPreventLayoutShift ? (
    <span
      className="dib"
      style={{
        height: isLoaded ? 'auto' : placeholderSize,
      }}
    >
      {maybeLink}
    </span>
  ) : (
    maybeLink
  )
}

const messages = defineMessages({
  title: {
    id: 'admin/editor.store-image.title',
  },
})

Image.schema = {
  title: messages.title.id,
}

Image.cssHandles = CSS_HANDLES

export default Image
