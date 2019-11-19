# VTEX Store Image

This app exports a set of blocks to work with images inside of our Store Framework.

## Blocks API

Documentation on the `image` interface can be found at: <https://vtex.io/docs/app/vtex.store-components/image>

A few interfaces are exported by this app. For now, only `image-slider` and `image-list` are documented and allowed for use inside of `store`.

There's a common `ImageObject` type used by both blocks:

### ImageObject

| Prop name     | Type                                                                                                                                | Description                                                | Default value |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------- |
| `image`       | `String`                                                                                                                            | Link for the image                                         | N/A           |
| `mobileImage` | `String`                                                                                                                            | Link for the mobile image                                  | N/A           |
| `description` | `String`                                                                                                                            | The image's description                                    | N/A           |
| `link`        | [`Link`](https://github.com/vtex-apps/native-types/blob/f63aeeb8f6e62f4a9aaec052a8be34973be7389b/pages/contentSchemas.json#L52-L74) | Specifies the link the image will redirect when clicked on |

### ImageList

The `list-context.image-list` interface is a stance of the `list-context` interfaces, which means its part of a set of special interfaces that enables you to create lists of content that can be edited via Site Editor.

Currently, this should be used to create a block analogous to an `ImageSlider`, but in a more composable way, since you could use it along with other `list-context` blocks to create a more flexible and customizable slider. The following example shows how you could use this to replicate an `ImageSlider`:

```json
  "list-context.image-list#demo": {
    "children": ["slider-layout#demo-images"],
    "props": {
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

Now, for a more complex scenario, this is what you would do to create a slider with images, products and `flex-layout`s, which is possible because of `slider-layout`:

```json
  "product-list-block#demo2": {
    "blocks": ["product-summary.shelf#demo2", "list-context.product-list#demo2"]
  },
  "list-context.product-list#demo2": {
    "children": ["list-context.image-list#demo2"]
  },
  "list-context.image-list#demo2": {
    "children": ["slider-layout#demo-lists"],
    "props": {
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
  "slider-layout#demo-lists": {
    "children": ["flex-layout.row#about-us", "flex-layout.row#about-us2"],
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

### ImageSlider

To configure an `image-slider`, these are the props you should edit at your theme:

| Prop name            | Type                                    | Description                                             | Default value    |
| -------------------- | --------------------------------------- | ------------------------------------------------------- | ---------------- |
| `height`             | `String`&#124;`Number`                  | The maximum height for the images inside of the slider. | `'none'`         |
| `sliderLayoutConfig` | `Object` (described below)              | Controls slider's behavior.                             | Described below. |
| `images`             | `Array (ImageObject)` (described below) | An array of images to be rendered as a slider.          | `null`           |

#### sliderLayoutConfig object

| Prop name              | Type                                                       | Description                                                                                    | Default value                        |
| ---------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------ |
| `infinite`             | `Boolean`                                                  | Controls if the slider should or should not be infinite.                                       | `true`                               |
| `usePagination`        | `Boolean`                                                  | Toggles whether or not to use a fluid scroll for navigation, disabling the notion of a "page". | `true`                               |
| `itemsPerPage`         | `{ destop: Number, tablet: Number, phone: Number }`        | Controls how many slides should be shown on each type of device.                               | `{ destop: 1, tablet: 1, phone: 1 }` |
| `showNavigationArrows` | `mobileOnly`&#124;`desktopOnly`&#124;`always`&#124;`never` | Controls when should navigation arrows be rendered.                                            | `'always'`                           |
| `showPaginationDots`   | `mobileOnly`&#124;`desktopOnly`&#124;`always`&#124;`never` | Controls when should pagination dots be rendered.                                              | `'always'`                           |


## Styles API

This app provides some CSS classes as an API for style customization.

To use this CSS API, you must add the `styles` builder and create an app styling CSS file.

1. Add the `styles` builder to your `manifest.json`:

```json
"builders": {
  "styles": "1.x"
}
```

2. Create a file called `vtex.store-image.css` inside the `styles/css` folder. Add your custom styles:

```css
.imageElement {
  margin-top: 10px;
}
```

### CSS namespaces

Below, we describe the namespaces that are defined by `store-image`.

| CSS Handle         |
| ------------------ |
| `imageElement`     |
| `imageElementLink` |

Note that the `image-slider` uses our `vtex.slider-layout` app, so all the CSS namespaces defined by it are also available for `image-slider`. Take a look at [Slider-Layout](https://vtex.io/docs/app/vtex.slider-layout).
