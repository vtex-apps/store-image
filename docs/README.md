📢 Use this project, [contribute](https://github.com/vtex-apps/store-image) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Store Image

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

The Store Image app exports the `list-context.image-list` block, which is responsible for working with image content in the store's theme.

![store-image](https://user-images.githubusercontent.com/52087100/78939489-a3c69f00-7a8a-11ea-8c66-7475f1a3f69e.png)

## Configuration

1. Add the `store-image` app to your theme's dependencies in the `manifest.json`, for example:

```diff
 "dependencies ": {
+  "vtex.store-image": "0.x"
 }
```

You are now able to use the `list-context.image-list` block, exported by the Store Image app. The block allows you to display images in your store with a higher degree of composability, since you can use it along with other `list-context` blocks to create a more flexible and customizable image slider.

2. In any desired theme template, add the `list-context.image-list` block, declaring the `slider-layout` block as child. For example:

```json
  "list-context.image-list#demo": {
    "children": ["slider-layout#demo-images"],
    "props": {
      "preload": true,
      "height": 650,
      "images": [
        {
          "image": "https://storecomponents.vteximg.com.br/arquivos/banner-infocard2.png",
          "description": "something something"
        },
        {
          "image": "https://storecomponents.vteximg.com.br/assets/vtex.file-manager-graphql/images/Group%207%20(1)%20(1)%20(1)%20(1)%20(1)___c6b3ed853fb16a08b265753b50e0c57a.png",
          "description": "something something"
        }
      ]
    }
  },

  "slider-layout#demo-images": {
    "props": {
      "itemsPerPage": {
        "desktop": 1,
        "tablet": 1,
        "phone": 1
      },
      "infinite": true
    }
  },
```

Note that the `slider-layout` block, exported from the Slider Layout app, is given as a child of `list-context.image-list`. It is responsible for defining which images will be displayed, as well as their behavior once rendered.

### `list-context.image-list` props

| Prop name | Type     | Description                                                   | Default value |
| --------- | -------- | ------------------------------------------------------------- | ------------- |
| `images`  | `array`  | Array of objects declaring all desired images to be rendered. | `undefined`   |
| `height`  | `number` | Image height for all images declared in the `image` object (in `px`).   | `undefined`   |
| `preload`  | `boolean` | Preloads the first image in a list, which helps prioritizing the display of images over other assets | `false`   |

### `image-list` props

| Prop name | Type     | Description                                                   | Default value |
| --------- | -------- | ------------------------------------------------------------- | ------------- |
| `images`  | `array`  | Array of objects declaring all desired images to be rendered. | `undefined`   |
| `height`  | `number` | Image height for all images declared in the `image` object (in `px`).   | `undefined`   |

- **`images` array:**

| Prop name     | Type     | Description                               | Default value |
| ------------- | -------- | ----------------------------------------- | ------------- |
| `image`       | `string` | Image URL.                                | `undefined`   |
| `mobileImage` | `string` | Mobile image URL.                         | `undefined`   |
| `description` | `string` | Image description.                        | `undefined`   |
| `link`        | `object` | Links an URL to the image being rendered. | `undefined`   |
| `width` | `string` / `number` | Image width (in `%` or `px`). | `100%` |

- **`link` object:**

| Prop name    | Type      | Description                                                                                                                                                                     | Default value |
| ------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `url`        | `string`  | URL users will be redirected to when clicking on the image.                                                                                                                     | `undefined`   |
| `noFollow`   | `boolean` | Whether the linked URL is endorsed by the owner of the page the user was navigating on i.e. if there is a commercial relationship between both pages (`true`) or not (`false`). | `false`       |
| `openNewTab` | `string`  | Whether a new tab on browser will be opened (`true`) or not (`false`) .                                                                                                         | `undefined`   |
| `title`      | `string`  | Text label used to identify the image in the admin's Site Editor.                                                                                                               | `undefined`   |

:information_source: Use the **admin's Site Editor** to manage all images declared in the `list-context.image-list` block.

## Customization

The block still doesn't have CSS Handles for its specific customization.

All CSS Handles available for the Image block are the ones available for the `slider-layout` block. Take a look at the Customization section in the [**Slider Layout documentation**](https://vtex.io/docs/app/vtex.slider-layout).
Note that the `image-slider` uses our `vtex.slider-layout` app, so all the CSS namespaces defined by it are also available for `image-slider`. Take a look at [Slider-Layout](https://vtex.io/docs/app/vtex.slider-layout).

## Implementing Image Protocol 
The Image Protocol is an app that displays personalized images to use alongside the Store Image app in your store's images. Follow the steps below to implement the Image Protocol in your code.
1. In your theme's `manifest.json`, add the Session Client app and also the Image Protocol app as a dependency:

```json
 "dependencies": {
    "vtex.session-client": "1.x",
    "vtex.image-protocol": "0.x"
  }
```
The interface `ImageTypes.ts` is modified to have the isMobile and imageProtocolId props:

```ts
export interface ImageSchema {
  isMobile?: boolean
  imageProtocolId? : string
  ...
}
```
2. To personalize a specific image, the props defined in the interface must be exposed in the Image component as the example below: 

```tsx
const{
  isMobile=false,
  imageProtocolId='',
  ...
}=props
``` 

>**NOTE**: The prop imageProtocolId can be modified from the Site Editor.

To implement the URLs from the image protocol example we have created inside the `react/graphql` the `getImgUrl.gql` that will use the resolver in the `image-protocol` app.

```graphql
query getImage($userId: String!, $imageProtocolId: String!) {
    getImage(userId: $userId, imageProtocolId: $imageProtocolId) @context(provider: "vtex.image-protocol"){
    url,
    urlMobile
  }
}
```

In order to get the user Id we use the useRenderSession and the SessionSuccess from the vtex.session-client package in the `Image.tsx`. Also to use the query created inside the graphq folder we also import it as well as the useQuery.

```tsx
import { useQuery } from 'react-apollo'
import GET_ImgUrl from './graphql/getImgUrl.gql'

import { SessionSuccess, useRenderSession } from 'vtex.session-client'
```

Now as the Image component has the imageProtocolId prop if it has an Id and we can get the user Id we can use the query defined in `getImgUrl.gql` that receives these two variables and is skipped if no user id is provided.

We set the src for this imgElement depending on the response of the query and also if this is for mobile or not. Other image elements that don't have the image protocol Id or the result of the query has the URLs as null we then set the default URLs.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
