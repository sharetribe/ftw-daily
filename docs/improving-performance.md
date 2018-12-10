# Improving page rendering performance

When we think about page speed there are actually two different scenarios that we need to address:

- The speed of initial page load and possible reloads after that
- The speed of changing the page within Single page application (SPA)

The first one is usually a slower process. A browser needs to load all the HTML, CSS, JavaScript,
and images - and then it needs to understand and execute those files, calculate layout, paint
components and finally composite the whole view. The initial page load is the slowest since the
consequent page reloads can take benefit from browser caches.

SPAs can improve from that since they don't necessarily need to download anymore JavaScript, HTML,
or CSS - already downloaded JavaScript might be enough for rendering consequent pages when a user
wants to navigate to another page. Most of the time SPAs just fetch data for that page.

These two UX scenarios might also conflict with each other. If all the JavaScript is in one big
bundle, page changes within a SPA are fast. However, downloading and evaluating a big JavaScript
file is slowing initial page rendering down. Even though users rarely experience the full initial
page load speed when they use an SPA like Flex Template for Web, it is good to keep track of that
speed. Especially since that is what search engine bots are experiencing and therefore it might
affect your page rank.

Read more about
[website performance](https://developers.google.com/web/fundamentals/performance/why-performance-matters/).

We haven't yet implemented code splitting to reduce initial page rendering time, but there're other
improvements that could be done to improve both cases of page rendering.

- [Check page performance](#check-page-performance)
- [Optimize image sizes](#optimize-image-sizes)
- [Lazy load off-screen images and other components](#lazy-load-off-screen-images-and-other-components)
- [Use sparse fields](#use-sparse-fields)
- [About code-splitting](#about-code-splitting)

## Check page performance

The first step is, of course, to start measuring performance.
[Lighthouse](https://developers.google.com/web/tools/lighthouse/) is a good tool to check rendering
performance. At least check those pages that are visible to unauthenticated users (e.g. landing
page, search page, listing page, about page and other static pages).

Lighthouse will give you some tips about how to improve performance and other aspects that website
developers should think about.

## Optimize image sizes

If your page is showing images, you should check that the image size is not bigger than what is
needed. So, adjusting image dimensions is the first step, but you should also think about image
quality, advanced rendering options and possibly serving those images from CDN instead of from
within your web app.

Quick checklist:

- Check that the actual dimensions of an image match with DOM element's dimensions.
- Lighthouse suggests that image compression level should be 85% or lower.
  [Read more](https://developers.google.com/web/tools/lighthouse/audits/optimize-images)
- Good rule-of-thumb is that use JPEG for images and photos, where PNG is better for graphics, such
  as logos, graphs and illustrations.
- If you are using JPEG images, think about saving them as progressive JPEGs.
  [Read more](https://cloudinary.com/blog/progressive_jpegs_and_green_martians) +
  [Photoshop guide](https://helpx.adobe.com/photoshop-elements/using/optimizing-images-jpeg-format.html)
- If you are using PNG images, consider running them through PNG optimizers to reduce file size.
  Plenty of options available, one example is [TinyPNG.com](https://tinypng.com)
- Think about serving images and other static assets from some CDN.
  [Read more.](https://www.smashingmagazine.com/2017/04/content-delivery-network-optimize-images/)

## Lazy load off-screen images and other components

Another way of dealing with images is to lazy load those images that are not visible inside an
initially rendered part of the screen. Lazy loading these off-screen images can be done with helper
function: `lazyLoadWithDimensions` (from `util/contextHelpers/`). Check `SectionLocations` component
for details.

## Use sparse fields

Another way to reduce the amount of data that is fetched from API is sparse fields. This is a
relatively new feature and Flex template app has not yet leveraged it fully, but it is created to
reduce unnecessary data and speed up rendering. You can read more from
[Flex API docs](https://flex-docs.sharetribe.com/#sparse-attributes).

## About code-splitting

We haven't yet implemented code-splitting to template app. Our current setup is creating one UMD
bundle file that is used on both client-side and server-side rendering (SSR). Unfortunately, Webpack
(a bundling tool used by `sharetribe-scripts` dependency) has
[a bug](https://github.com/webpack/webpack/issues/2471) that prevents using code-splitting. This
means that there need to be separate builds for browser and SSR for code-splitting to work.

In practice, it is probably best to add another Webpack build configuration for the server in Create
React App (CRA) fork (`sharetribe-scripts` is a fork of CRA repo). That will also mean some
refactoring in `server/` folder as well as in `app.js` file.

Furthermore, if you are considering code-splitting, you should also be aware that there might be a
problem with a "back" navigation button. (If the page loads asynchronously, a browser might not be
able to return the user to the correct scrolling position on the previous page.) We would also like
to be aware if users of the template app are considering code-splitting - if there's more demand for
this feature, we should prioritize it accordingly.
