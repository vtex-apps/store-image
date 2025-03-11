# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Possibility to explicit set height for images

## [0.22.3] - 2024-09-04

### Removed

- v0.22.1 and v0.22.0

## [0.22.2] - 2024-09-03

### Added

- `experimentalPreventLayoutShift` was added as an `image-list` prop within the `store-image` component.

## [0.22.1] - 2024-08-07

### Fixed

- Adds the height prop to the image but without adding the maxHeight as default value

## [0.22.0] - 2024-06-25

### Added

- height field in the site editor


### Fixed

- Bulgarian, German, English, Spanish, French, Italian, Japanese, Korean, Dutch, Portuguese, Romanian and Thai translations

## [0.21.0] - 2023-11-13

### Added

- `fetchpriority` prop for `Image` to allow fetch priority.

## [0.20.0] - 2023-05-05

### Fixed
- Bulgarian, German, English, Spanish, Korean, Portuguese and Romanian translations.

### Removed
- Pseudolanguage translation.

### Added
- Thai translation.

## [0.19.1] - 2023-05-02
### Fixed
- Fixes of i18n on readme.md according to task LOC-10606.

## [0.19.0] - 2023-05-02

### Added

- `promotionProductId` and `promotionProductName` props for `Image` and `ImageList` to be used by promotion analytics events. GA4's [view_promotion](https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#view_promotion) event now requires the product's ID or name.

## [0.18.0] - 2023-04-25

### Added

- `loading` prop for `Image` to allow lazy loading.

## [0.17.0] - 2023-03-28

### Added
- German translation.

## [0.16.0] - 2023-02-13

### Added

- `experimentalSetExplicitDimensions` prop for `Image` and `ImageList`

## [0.15.0] - 2022-09-08

### Added
- Support for `experimentalPreventLayoutShift` prop in `ImageList` which will apply the setting to all child images

## [0.14.2] - 2021-10-13
### Fixed
- Add Image title removed.

## [0.14.1] - 2021-10-01
### Fixed
- Query strings would not be carried over when users navigated through a link wrapping an Image component.

## [0.14.0] - 2021-09-24

### Added
- I18n Bg and Bs (pseudo-language to implement In-context tool).

# Fixed
- I18n es, it-IT, ko-KR, pt
## [0.13.0] - 2021-09-15
### Fixed
- `Image`: Prevent to trigger promoView event when `__isDuplicated` is enabled.

### Added
- `Image`:  `__isDuplicated` prop to handle when an image is duplicated inside the slider-layout.

## [0.12.1] - 2021-09-06
### Fixed
- prevent thruty value on condition

## [0.12.0] - 2021-06-22
### Added

- Allows preloading.

## [0.11.1] - 2021-06-17

### Fixed
- Crowdin configuration file

## [0.11.0] - 2021-05-05

### Added
- I18n It, Fr, Ko and Nl.
- Crowdin configuration file.

### Changed
- Changelog

## [0.10.0] - 2021-03-03


### Added

- I18n Ro and JP.
- Crowdin configuration file.

## [0.9.1] - 2021-02-03

### Fix
- `Height` not apearing in site editor and fixed to be a number instead of enum

## [0.9.0] - 2021-01-29
### Added
- Exports CSS Handles embedded within `Image` component.
- `ImageTypes.ts` file exporting all types of the app.

### Fixed
- Schema properties' titles not being displayed correctly when imported by other apps.

## [0.8.0] - 2020-12-16
### Changed
- Update `vtex.css-handles` to `1.x`.

## [0.7.0] - 2020-11-10
### Added
- Option to send image's analytics event.

## [0.6.0] - 2020-10-29

### Changed
- `list-context.image-list` has been refactored to use the `image-list` with a `list-context`

### Added
- `image-list` a new block that renders a simple list of images that can be editable via the Site Editor

## [0.5.3] - 2020-10-07
### Removed
- Remove description of `new-image` schema to make it not available in the new CMS.

## [0.5.2] - 2020-09-15
### Fixed
- `experimentalPreventLayoutShift` not being passed down to `Image`s rendered by `ImageList`.

## [0.5.1] - 2020-09-09

### Fixed
- `title` prop to `Image` component

## [0.5.0] - 2020-08-10
### Added
- `experimentalPreventLayoutShift` prop to `Image` component

### Changed
- `ImageList` component uses `experimentalPreventLayoutShift` prop.

## [0.4.5] - 2020-07-10
### Added
- Title and description to `image` block schema to make it compliant with the new cms.

### Security
- Bump dependency versions.

## [0.4.4] - 2020-05-14
### Fixed
- Users not able to configure links to open in new tabs via Site Editor.

## [0.4.3] - 2020-04-24
### Changed
- Use `useIntl` hook instead of the HOC.

### Fixed
- `react-intl` typings that was breaking the build.

### Security
- Bump dependencies versions.

## [0.4.2] - 2020-04-14

### Fixed
- README.md documentation

## [0.4.1] - 2020-03-04
### Fixed
- Potential runtime error on ImageList component.

## [0.4.0] - 2020-02-10
### Added
- `title` prop to the `Image` component.

## [0.3.1] - 2019-11-22
### Removed
- Default values for the props `maxWidth` and `maxHeight` in `Image`.

## [0.3.0] - 2019-11-01
### Added
- `image-uploader` widget to `Image` contentSchema.

## [0.2.1] - 2019-10-24

## [0.2.0] - 2019-10-22
### Added
- New `ImageList` component that uses `list-context`.

## [0.1.0] - 2019-10-10
### Added
- Initial implementation.
- Port `Image` component from `vtex.store-components`.
- Create `ImageSlider` component.
- New `image-slider` interface.
