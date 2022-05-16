import React, { Fragment, useState, useRef, useEffect } from 'react'
<<<<<<< HEAD
import { useLazyQuery } from 'react-apollo'
=======
import { useQuery } from 'react-apollo'
>>>>>>> b5be315 (first commit customDropdown)
import type { ImgHTMLAttributes, RefObject } from 'react'
import { useOnView } from 'vtex.on-view'
import { useCssHandles } from 'vtex.css-handles'
import type { CssHandlesTypes } from 'vtex.css-handles'
import { useIntl, defineMessages } from 'react-intl'
import { formatIOMessage } from 'vtex.native-types'
import { Link } from 'vtex.render-runtime'
import { usePixel } from 'vtex.pixel-manager'
import type { SessionSuccess } from 'vtex.session-client'
import { useRenderSession } from 'vtex.session-client'

import { usePosition } from './hooks/usePosition'
import type { SessionSuccess } from 'vtex.session-client'
import { useRenderSession } from 'vtex.session-client'

import type { ImageSchema } from './ImageTypes'
import GET_IMAGE_PROTOCOL_QUERY from './graphql/getImgUrl.gql'
import GET_IMAGE_PROTOCOL_IMAGES from './graphql/getImgUrl.gql'

const CSS_HANDLES = ['imageElement', 'imageElementLink'] as const

export interface ImageProps
  extends ImageSchema,
    ImgHTMLAttributes<HTMLImageElement> {
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

const handleSuccess = async (position: any) => {
  const { latitude, longitude } = position.coords

  console.log(`longitud:${longitude} latitud:${latitude}`)
}

const handleError = () => {
  console.log('error')
  /* get geolocation from user IP address?? */
}

function Image(props: ImageProps) {
  const {
    isMobile = false,
    imageProtocolId = '',
    isMobile = false,
    imageProtocolId = '',
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

  const imageDimensions = {
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    width,
    height,
  }

  const placeholderSize = height ?? minHeight ?? maxHeight ?? 'auto'

  const widthWithoutUnits = width ? width.toString().replace(/\D/g, '') : null
  const heightWithoutUnits = height
    ? height.toString().replace(/\D/g, '')
    : null

  const explicitDimensionsAreAvailable =
    !width?.toString().includes('%') &&
    !height?.toString().includes('%') &&
    (widthWithoutUnits || heightWithoutUnits)

  const { loading2, session, error2 } = useRenderSession()

  // Image Protocol Start

  const { session } = useRenderSession()
  const { latitude, longitude, error: positionError } = usePosition()

  const [getPersonalizedImages, { data: imageData }] = useLazyQuery(
    GET_IMAGE_PROTOCOL_QUERY,
    {
      ssr: false,
    }
  )
  let userId = ''

  useEffect(() => {
    if (session && imageProtocolId && positionError !== undefined) {
      getPersonalizedImages({
        variables: {
          userId: session?.namespaces?.profile?.id?.value,
          imageProtocolId,
          latitude,
          longitude,
        },
      })
    }
  }, [positionError, session, imageProtocolId])
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError)
  }, [])

  const { loading: loading2, session, error: error2 } = useRenderSession()

  if (session) {
    const {
      namespaces: { profile },
    } = session as SessionSuccess

    userId = profile?.id?.value
  }

  let imgElement
  let formattedSrc
  let formattedAlt
  console.log('session: ', session)
  console.log('image protocol id:', imageProtocolId)
  console.log('userId: ', userId)
  if (loading2) {
    // eslint-disable-next-line no-console
    console.log('loading')
  }

  if (imageData?.getImage) {
    const { urlMobile, url } = imageData.getImage

  const query = GET_IMAGE_PROTOCOL_IMAGES
  let imgElement, formattedSrc, formattedAlt, formattedLink, maybeLink
  const { loading, error, data } = useQuery(query, {
    variables: { userId: userId, imageProtocolId: imageProtocolId},
    skip: !userId || !imageProtocolId,
    ssr: false
  })

  if (!error && !loading && data && data.getImage && data.getImage.url !== null && data.getImage.urlMobile !== null && imageProtocolId !== '') {
    // eslint-disable-next-line no-console
    console.log('data: ',data.getImage)
    console.log('imageProtocolId: ',imageProtocolId)
    
    if(isMobile){
      formattedSrc = formatIOMessage({ id: data.getImage.urlMobile, intl })
      // eslint-disable-next-line no-console
      console.log('urlMobile: ',data.getImage.urlMobile)
    }else{
      formattedSrc = formatIOMessage({ id: data.getImage.url, intl })
      // eslint-disable-next-line no-console
      console.log('urlDesktop: ',data.getImage.url)
    }

    formattedAlt = formatIOMessage({ id: alt, intl })

    imgElement = (
      <img
        title={title}
        sizes={sizes}
        srcSet={srcSet}
        src={typeof formattedSrc === 'string' ? formattedSrc : ''}
        alt={typeof formattedAlt === 'string' ? formattedAlt : ''}
        style={imageDimensions}
        ref={imageRef}
        className={handles.imageElement}
        {...(preload
          ? {
              'data-vtex-preload': 'true',
            }
          : {})}
      />
    )
    const shouldOpenLinkInNewTab = link?.newTab ?? link?.openNewTab

  const formattedTitle = formatIOMessage({ id: link?.attributeTitle, intl })

 maybeLink = data.getImage.hrefImg ? (
    <Link
      to={typeof formattedLink === 'string' ? formattedLink : ''}
      title={typeof formattedTitle === 'string' ? formattedTitle : ''}
      rel={link?.attributeNofollow ? 'nofollow' : ''}
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


  } else {
    // eslint-disable-next-line no-console
    console.log('error: ', error)
    console.log('loading', loading)
    console.log('inside else imageProtocolId: ', imageProtocolId)
    formattedSrc = formatIOMessage({ id: src, intl })
    console.log('else src:', formattedSrc)
    formattedAlt = formatIOMessage({ id: alt, intl })

    console.log('src: ', src)
    imgElement = (
      <img
        title={title}
        sizes={sizes}
        srcSet={srcSet}
        src={typeof formattedSrc === 'string' ? formattedSrc : ''}
        alt={typeof formattedAlt === 'string' ? formattedAlt : ''}
        style={imageDimensions}
        ref={imageRef}
        className={handles.imageElement}
        {...(experimentalSetExplicitDimensions && explicitDimensionsAreAvailable
        ? {
            width: widthWithoutUnits ?? undefined,
            height: heightWithoutUnits ?? undefined,
          }
        : {})}
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
      }
      : undefined

  const formattedLink = formatIOMessage({ id: link?.url, intl })
  const formattedTitle = formatIOMessage({ id: link?.attributeTitle, intl })

    const shouldOpenLinkInNewTab = link?.newTab ?? link?.openNewTab
    maybeLink = link?.url ? (
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
    
  }

  /**
   * To understand why we need to check for both newTab and openNewTab
   * properties, check the Image type definition at './typings/image.d.ts'.
   */


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
