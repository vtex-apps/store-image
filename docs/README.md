📢 Use this project, [contribute](https://github.com/vtex-apps/store-image) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Store Image

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

The Store Image app exports the `list-context.image-list` block, which is responsible for the image content in the store theme.

![store-image](https://cdn.jsdelivr.net/gh/vtexdocs/dev-portal-content@main/images/vtex-store-image-0.png)

## Configuring the store image

1. Add the `store-image` app to your theme dependencies in the `manifest.json`. For example:

```diff
 "dependencies ": {
+  "vtex.store-image": "0.x"
 }
```

You can now use the `list-context.image-list` block exported by the Store Image app. This block allows you to display images in your store with more composability since you can use it along with other `list-context` blocks to create a more flexible and customizable image slider.

2. In any desired theme template, add the `list-context.image-list` block, declaring the `slider-layout` as a child block. For example:

```json
  "list-context.image-list#demo": {
    "children": ["slider-layout#demo-images"],
    "props": {
      "preload": true,
      "height": 650,
      "images": [
        {
          "loading": "eager",
          "image": "https://storecomponents.vteximg.com.br/arquivos/banner-infocard2.png",
          "description": "something something"
        },
        {
          "loading": "lazy",
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

Note that the `slider-layout` block exported from the Slider Layout app is a child block of `list-context.image-list`. It defines which images will be displayed and their behavior when rendered.

### `list-context.image-list` props

| Prop name                           | Type      | Description                                                                                                           | Default value |
| ----------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------- | ------------- |
| `images`                            | `array`   | Array of objects that declares all the images to be rendered.                                                         | `undefined`   |
| `height`                            | `number`  | Image height for all images declared in the `image` object (in `px`).                                                 | `undefined`   |
| `preload`                           | `boolean` | Preloads the first image in a list, prioritizing the image display over other assets.                                 | `false`       |
| `experimentalSetExplicitDimensions` | `boolean` | Sets explicit `width` and/or `height` attributes for an image, if `width` and/or `height` props are provided in `px`. |

### `image-list` props

| Prop name                        | Type      | Description                                                                                                           | Default value |
| -------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------- | ------------- |
| `images`                         | `array`   | Array of objects that declares all the images to be rendered.                                                         | `undefined`   |
| `height`                         | `number`  | Image height for all images declared in the `image` object (in `px`).                                                 | `undefined`   |
| `experimentalPreventLayoutShift` | `boolean` | Wraps the image in a `<span>` tag with a preset `width` and/or `height` to minimize layout shift during page loading. |

- **`images` array:**

| Prop name              | Type                | Description                                                                                         | Default value |
| ---------------------- | ------------------- | --------------------------------------------------------------------------------------------------- | ------------- |
| `image`                | `string`            | Image URL.                                                                                          | `undefined`   |
| `mobileImage`          | `string`            | Mobile image URL.                                                                                   | `undefined`   |
| `description`          | `string`            | Image description.                                                                                  | `undefined`   |
| `link`                 | `object`            | Links a URL to the image being rendered.                                                            | `undefined`   |
| `width`                | `string` / `number` | Image width (in `%` or `px`).                                                                       | `100%`        |
| `loading`              | `string`            | Loading strategy, either when the page loads (`'eager'`) or when closer to the viewport (`'lazy'`). | `'eager'`     |
| `fetchpriority`        | `string`            | The fetch priority hint (`'high'`, `'low'`, or `'auto'`).                                           | `'auto'`      |
| `analyticsProperties`  | `string`            | Whether analytics props should be set (`'provided'`) or not (`'none'`).                             | `'none'`      |
| `promotionId`          | `string`            | The ID of the promotion associated with the event.                                                  | `undefined`   |
| `promotionName`        | `string`            | The name of the promotion associated with the event.                                                | `undefined`   |
| `promotionPosition`    | `string`            | The name of the promotional creative slot associated with the event.                                | `undefined`   |
| `promotionProductId`   | `string`            | The ID of the product associated with the event.                                                    | `undefined`   |
| `promotionProductName` | `string`            | The name of the product associated with the event.                                                  | `undefined`   |

- **`link` object:**

| Prop name    | Type      | Description                                                                                                                                                    | Default value |
| ------------ | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `url`        | `string`  | URL users will be redirected to when they click the image.                                                                                                     | `undefined`   |
| `noFollow`   | `boolean` | Whether the page owner endorses the linked URL the user was navigating on, i.e., if there is a business relationship between both pages (`true`) or (`false`). | `false`       |
| `openNewTab` | `string`  | Whether a new tab will be opened on the browser (`true`) or (`false`).                                                                                         | `undefined`   |
| `title`      | `string`  | Text label used to identify the image in the Admin Site Editor.                                                                                                | `undefined`   |

> ℹ️ Use the **Admin Site Editor** to manage all images declared in the `list-context.image-list` block.

## Customization

The block does not have CSS handles for specific customization.

All CSS handles available for the Image block are available for the `slider-layout` block. Take a look at the Customization section in the [**Slider Layout documentation**](https://developers.vtex.com/docs/apps/vtex.slider-layout). Note that the `image-slider` uses our `vtex.slider-layout` app, so all the CSS namespaces defined by it are also available for `image-slider`. Learn more in [Slider Layout](https://developers.vtex.com/docs/apps/vtex.slider-layout).

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!
