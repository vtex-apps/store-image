# VTEX Store Image

This app exports a set of blocks to work with images inside of our Store Framework.

## Blocks API

A few interfaces are exported by this app. For now, only `image-slider` is documented and allowed for use inside of `store`.

To configure an image-slider, these are the props you should edit at your theme:

| Prop name            | Type                                    | Description                                             | Default value    |
| -------------------- | --------------------------------------- | ------------------------------------------------------- | ---------------- |
| `height`             | `String`&#124;`Number`                  | The maximum height for the images inside of the slider. | `'none'`         |
| `sliderLayoutConfig` | `Object` (described below)              | Controls slider's behavior.                             | Described below. |
| `images`             | `Array (ImageObject)` (described below) | An array of images to be rendered as a slider.          | `null`           |

### sliderLayoutConfig object

| Prop name       | Type                                                | Description                                                                                    | Default value                        |
| --------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------ |
| `infinite`      | `Boolean`                                           | Controls if the slider should or should not be infinite.                                       | `true`                              |
| `usePagination` | `Boolean`                                           | Toggles whether or not to use a fluid scroll for navigation, disabling the notion of a "page". | `true`                               |
| `itemsPerPage`  | `{ destop: Number, tablet: Number, phone: Number }` | Controls how many slides should be shown on each type of device.                               | `{ destop: 1, tablet: 1, phone: 1 }` |
| `showNavigationArrows`                | `mobileOnly`&#124;`desktopOnly`&#124;`always`&#124;`never`  | Controls when should navigation arrows be rendered.                       | `'always'`   |
| `showPaginationDots`                | `mobileOnly`&#124;`desktopOnly`&#124;`always`&#124;`never`  | Controls when should pagination dots be rendered.                       | `'always'`   |

### ImageObject

| Prop name     | Type                                                | Description                                                                                    | Default value                        |
| ------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------ |
| `image`             | `String`  | Link for the image                                                | N/A           |
| `mobileImage`       | `String`  | Link for the mobile image                                         | N/A           |
| `description`       | `String`  | The image's description                                                         | N/A           
| `link`        | [`Link`](https://github.com/vtex-apps/native-types/blob/f63aeeb8f6e62f4a9aaec052a8be34973be7389b/pages/contentSchemas.json#L52-L74)| Specifies the link the image will redirect when clicked on                 |

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

| Class name        | Description                                 |
| ----------------- | ------------------------------------------- |
| `imageElement` | Class for each image rendered. |

Note that the `image-slider` uses our `vtex.slider-layout` app, so all the CSS namespaces defined by it are also available for `image-slider`. Take a look at [Slider-Layout](https://vtex.io/docs/app/vtex.slider-layout).
