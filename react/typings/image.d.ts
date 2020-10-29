interface Link {
  url: string
  noFollow: boolean
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

interface Image {
  image: string
  mobileImage: string
  link?: Link
  title?: string
  description: string
  experimentalPreventLayoutShift?: boolean
  width?: string
}
