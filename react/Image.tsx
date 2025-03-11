import React, { Fragment, useState, useRef, useEffect } from 'react'
import type { ImgHTMLAttributes, RefObject } from 'react'
import { useOnView } from 'vtex.on-view'
import { useCssHandles } from 'vtex.css-handles'
import type { CssHandlesTypes } from 'vtex.css-handles'
import { useIntl, defineMessages } from 'react-intl'
import { formatIOMessage } from 'vtex.native-types'
import { Link } from 'vtex.render-runtime'
import { usePixel } from 'vtex.pixel-manager'

import type { ImageSchema } from './ImageTypes'

const CSS_HANDLES = ['imageElement', 'imageElementLink'] as const

export interface ImageProps
  extends ImageSchema,
    ImgHTMLAttributes<HTMLImageElement> {
  maxWidth?: string | number
  maxHeight?: string | number
  minWidth?: string | number
  minHeight?: string | number
  blockClass?: string
  experimentalPreventLayoutShift?: boolean
  experimentalSetExplicitDimensions?: boolean
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
  preload?: boolean
  loading?: 'eager' | 'lazy'
  fetchpriority?: 'high' | 'low' | 'auto'
  width?: string | number
  height?: string | number
  specificHeight?: string | number
  /**
   * Warning: This property is for internal usage, please avoid using it.
   * This property is used when the Image is children of the SliderTrack component and it prevents triggering the promoView event twice for cloned images.
   * https://github.com/vtex-apps/slider-layout/blob/master/react/components/SliderTrack.tsx
   */
  __isDuplicated?: boolean
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
    height: genericHeight,
    specificHeight,
    srcSet = '',
    sizes = '',
    link,
    title,
    experimentalPreventLayoutShift,
    experimentalSetExplicitDimensions,
    analyticsProperties = 'none',
    promotionId,
    promotionName,
    promotionPosition,
    promotionProductId,
    promotionProductName,
    classes,
    preload,
    loading = 'eager',
    fetchpriority = 'auto',
    // eslint-disable-next-line
    __isDuplicated,
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

  const imageDimensionsWithoutExplicitDimensions = {
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
  }

  const imageDimensionsWithExplicitDimensions = {
    ...imageDimensionsWithoutExplicitDimensions,
    genericHeight,
    width,
  }

  const placeholderSize =
    specificHeight ?? genericHeight ?? maxHeight ?? minHeight ?? 'auto'

  const allowedExplicitDimensionsRegex = /(auto|inherit|initial|unset)|[^\d]/g

  const explicitDimensions = (dimension: string | number | undefined) =>
    dimension !== '' && dimension
      ? dimension.toString().replace(allowedExplicitDimensionsRegex, '$1')
      : null

  const widthWithoutUnits = explicitDimensions(width)

  const heightWithoutUnits =
    explicitDimensions(specificHeight) ??
    explicitDimensions(genericHeight) ??
    explicitDimensions(maxHeight)

  const hasPercentage = (dimension: string | number | undefined) =>
    dimension?.toString().includes('%')

  const explicitDimensionsAreAvailable =
    !!width &&
    (!!specificHeight || !!maxHeight || !!genericHeight) &&
    !hasPercentage(width) &&
    (!hasPercentage(specificHeight) ||
      !hasPercentage(maxHeight) ||
      !hasPercentage(genericHeight))

  const formattedSrc = formatIOMessage({ id: src, intl })
  const formattedAlt = formatIOMessage({ id: alt, intl })

  const imgElement = (
    <img
      title={title}
      sizes={sizes}
      srcSet={srcSet}
      src={typeof formattedSrc === 'string' ? formattedSrc : ''}
      alt={typeof formattedAlt === 'string' ? formattedAlt : ''}
      ref={imageRef}
      className={handles.imageElement}
      loading={loading}
      fetchpriority={fetchpriority}
      {...(experimentalSetExplicitDimensions && explicitDimensionsAreAvailable
        ? {
            width: widthWithoutUnits ?? width ?? 'auto',
            height: heightWithoutUnits ?? 'auto',
            style: imageDimensionsWithoutExplicitDimensions,
          }
        : { style: imageDimensionsWithExplicitDimensions })}
      {...(preload
        ? {
            'data-vtex-preload': 'true',
          }
        : {})}
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
          products: [
            {
              productId: promotionProductId,
              productName: promotionProductName,
            },
          ],
        }
      : undefined

  const formattedLink = formatIOMessage({ id: link?.url, intl })
  const formattedTitle = formatIOMessage({ id: link?.attributeTitle, intl })

  const maybeLink = link?.url ? (
    // The onClick function and the <Link> component are necessary,
    // knowing this, it seems good to disable the anchor-is-valid rule.
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link
      to={typeof formattedLink === 'string' ? formattedLink : ''}
      title={typeof formattedTitle === 'string' ? formattedTitle : ''}
      rel={link.attributeNofollow ? 'nofollow' : ''}
      target={shouldOpenLinkInNewTab ? '_blank' : undefined}
      className={handles.imageElementLink}
      onClick={() => {
        if (analyticsProperties === 'none') return

        push({ event: 'promotionClick', promotions: [promotionEventData] })
      }}
    >
      {imgElement}
    </Link>
  ) : (
    <Fragment>{imgElement}</Fragment>
  )

  useOnView({
    ref: imageRef,
    onView: () => {
      if (analyticsProperties === 'none' || __isDuplicated) return

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
