![imagekit logo](https://imagekit.io/static/img/logo-dark.png)

* [Overview / Requirement](#overview-and-resources)
* [Installation](#installation)
* [Usage](#usage)
  * [`$(elm).imagekit()`](#using-jquery)
  * [`imagekit.url(options)`](#using-url)
* [Options](#options)


<a name="overview-and-resources"></a>
## Overview / Requirement

ImageKit provides ready-to-use image delivery servers along with dedicated image storage, on-the-fly image transformation like resize, crop, rotate directly from the URL and image uploads.

By using ImageKit, you can experience about 30% improvement in page load time thanks to the tons of image optimizations that work out of the box without you putting in any effort. Migrating to ImageKit is super simple and takes just a few minutes with our Plug-and-Play technology. Images are delivered across the globe using a CDN ensuring lightning fast experience for your users.

If you haven't already registered then first [create an account](https://imagekit.io/registration) on ImageKit before using this library.

<a name="installation"></a>
## Installation

There are two ways to install imagekit.js depending on your project.

1. **Bower**: `bower install --save imagekit`
2. **Manual**: [Download imagekit.js](https://github.com/imagekit-developer/imagekit.js), and use `dist/imagekit.min.js`.

imagekit.js has a following global options:

* `imagekitid`: ImageKit ID for your account.
* `url-pattern`: Your [ImageKit URL pattern](https://docs.imagekit.io/#url-patterns) you want to use to access imags. It (defaults to `img`).
* `useHttps`: A boolean (defaults to `true`), specifying whether to generate `http` or `https` URLs.
* `usesubdomain`: A boolean (defaults to `false`).
  1. If true then image URL will become like `https://<imagekitid>.imagekit.io/<url-pattern>/...`
  2. If false then image URL will become like `https://.ik.imagekit.io/<imagekit-id>/<url-pattern>/...`
* `srcattribute`: Attribute which will be set with image url. Defaults to `src`

You can set these options manually on the global `imagekit.config` object:

``` html
<script src="imagekit.min.js"></script>
<script>
  // Sepecify imagekitid
  imagekit.config.imagekitid = 'demo';
  // Optionally disable HTTPS image URL generation (defaults to `true`).
  imagekit.config.usesecure = false;
</script>
```


<a name="usage"></a>
## Usage

Now that everything's installed and set up, you can start using ImageKit on your page. There are a few ways to do this.

<a name="using-jquery"></a>
### `$(elm).imagekit()`

The simplest way to use imagekit.js is to create an `img` tag with the `data-path` attribute:

``` html
<img data-path="static/img/landingpage-icons/outofbox.png" data-width="500">
<script src="imagekit.min.js"></script>
<script>
  // Sepecify imagekitid
  imagekit.config.imagekitid = 'demo';
  $("img").imagekit();
</script>
```

This will generate HTML something like the following:

``` html
<img src="https://ik.imagekit.io/demo/img/tr:w-500/static/img/landingpage-icons/outofbox.png">
```

You can override `imagekitid` by specifying in the attribute itself like

``` html
<img data-imagekitid="override-demo" src="https://ik.imagekit.io/override-demo/img/tr:w-500/static/img/landingpage-icons/outofbox.png">
```


<a name="using-url"></a>
### `imagekit.url(options)`

Here's how we can use `imagekit.url()` function and pass it [options](#options) to get URL:

``` html
<script>
    imagekit.config.imagekitid = "demo";
    var options = {
      width: 100,
      heigh: 200,
      path : "static/img/landingpage-icons/outofbox.png"
    };
    var url = imagekit.url(options);
    console.log(url); // https://ik.imagekit.io/demo/img/tr:w-100,h-200/static/img/landingpage-icons/outofbox.png
</script>
```
<a name="options"></a>
## Options

You can pass options object while using `imagekit.url(options)`. The same options can be set as attributes in an image element prefixed with `data-` and `$(elm).imagekit()` will automatically pick/override values.

You can refer [documentation](https://docs.imagekit.io/#transformations) to learn more about a particular transformations.

Valid options:

* `width`
* `height`
* `quality`
* `crop`
* `crop-mode`
* `focus`
* `format`
* `rounded-corner`
* `border`
* `rotation`
* `blur`
* `named`
* `overlay-image`
* `overlay-x`
* `overlay-y`
* `overlay-focus`
* `transformation` : Array of transformation to apply [chained transformation](https://docs.imagekit.io/#chained-transformations)
``` html
<script>
    window.imagekit.config.imagekitid = "demo";
    var url = window.imagekit.url({
        path : "static/img/landingpage-icons/outofbox.png",
        transformation : [{width: 100, height: 300}, {blur:100}]
    });
    console.log(url); // https://ik.imagekit.io/demo/img/tr:w-100,h-300:bl-100/static/img/landingpage-icons/outofbox.png
</script>
```
