import type { ImageProps } from './Image'
import type { ImageListProps } from './ImageList'
import type { ImageSliderProps } from './ImageSlider'

export { ImageProps, ImageListProps, ImageSliderProps }

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

export interface SliderConfig {
  itemsPerPage: {
    desktop: number
    tablet: number
    phone: number
  }
  showNavigationArrows: 'mobileOnly' | 'desktopOnly' | 'always' | 'never'
  showPaginationDots: 'mobileOnly' | 'desktopOnly' | 'always' | 'never'
  usePagination: boolean
  infinite: boolean
}
