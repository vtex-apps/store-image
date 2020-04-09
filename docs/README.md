📢 Use this project, [contribute](https://github.com/vtex-apps/store-image) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Store Image

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

The Store Image app exports the `list-context.image-list` block, which is responsible for working with image content in the store's theme.

![store-image](https://user-images.githubusercontent.com/52087100/78939489-a3c69f00-7a8a-11ea-8c66-7475f1a3f69e.png)


## Configuration

1. Add the `store-image` app to your theme's dependencies in the `manifest.json`, for example:

```json
dependencies: {
"vtex.store-image": "0.x"
}
```

You are now able to use the `list-context.image-list` block, exported by the Store Image app. The block allows you to display images in your store with a higher degree of composability, since you can use it along with other `list-context` blocks to create a more flexible and customizable image slider.

2. In any desired theme template, add the `list-context.image-list` block, declaring the `slider-layout` block as child. For example:

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

Note that the `slider-layout` block, exported from the Slider Layout app, is given as a child of `list-context.image-list`. It is responsible for defining which images will be displayed, as well as their behavior once rendered.

This means that the `list-context.image-list` block is in fact not rendered and therefore does not have its own props that can be configured. Instead, you should use the `slider-layout` props - check out the Configuration section in the [Slider Layout documentation](https://vtex.io/docs/app/vtex.slider-layout).

## Customization

The block still doesn't have CSS Handles for its specific customization. 

All CSS Handles available for the Image block are the ones available for the `slider-layout` block. Take a look at the Customization section in the [Slider Layout documentation](https://vtex.io/docs/app/vtex.slider-layout).
