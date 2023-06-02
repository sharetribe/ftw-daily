import {
  hasContent,
  exposeContentAsChildren,
  exposeContentString,
  exposeLinkProps,
  exposeImageProps,
  exposeCustomAppearanceProps,
  exposeYoutubeProps,
  exposeOpenGraphData,
} from './Field.helpers';

describe('Field helpers', () => {
  describe('hasContent(data)', () => {
    it('should return true if data has "content"', () => {
      expect(hasContent({ content: 'Hello world!' })).toEqual(true);
      expect(hasContent({ content: 'Hello world!', blaa: 'blaa' })).toEqual(true);
    });

    it('should return false if "content" is not included or if it is empty string', () => {
      expect(hasContent({ foo: 'bar' })).toEqual(false);
      expect(hasContent({ content: '' })).toEqual(false);
    });
  });

  describe('exposeContentAsChildren(data)', () => {
    it('should return only "children" prop containing the string from passed-in "content"', () => {
      expect(exposeContentAsChildren({ content: 'Hello world!' })).toEqual({
        children: 'Hello world!',
      });
      expect(exposeContentAsChildren({ content: 'Hello world!', blaa: 'blaa' })).toEqual({
        children: 'Hello world!',
      });
    });

    it('should return empty object if "content" is not string', () => {
      expect(exposeContentAsChildren({ content: ['Hello world!'] })).toEqual({});
      expect(exposeContentAsChildren({ content: {} })).toEqual({});
    });
  });

  describe('exposeContentString(data)', () => {
    it('should return only "children" prop containing the string from passed-in "content"', () => {
      expect(exposeContentString({ content: 'Hello world!' })).toEqual({ content: 'Hello world!' });
      expect(exposeContentString({ content: 'Hello world!', blaa: 'blaa' })).toEqual({
        content: 'Hello world!',
      });
    });

    it('should return empty object if "content" is not string', () => {
      expect(exposeContentString({ content: ['Hello world!'] })).toEqual({});
      expect(exposeContentString({ content: {} })).toEqual({});
    });
  });

  describe('exposeLinkProps(data)', () => {
    it('should return only "content" and "href" props containing valid strings"', () => {
      expect(
        exposeLinkProps({ content: 'Hello world!', href: 'https://my.example.com/some/image.png' })
      ).toEqual({ children: 'Hello world!', href: 'https://my.example.com/some/image.png' });
      expect(
        exposeLinkProps({
          content: 'Hello world!',
          href: 'https://my.example.com/some/image.png',
          blaa: 'blaa',
        })
      ).toEqual({ children: 'Hello world!', href: 'https://my.example.com/some/image.png' });
    });
    it('should return empty object if data is not valid', () => {
      expect(exposeLinkProps({ content: 'Hello world!', blaa: 'blaa' })).toEqual({});
    });
    it('should return href as "children" if label is not valid', () => {
      const href = 'https://my.example.com/some/image.png';
      expect(exposeLinkProps({ href })).toEqual({ children: href, href: href });
      expect(exposeLinkProps({ content: 0, href })).toEqual({ children: href, href: href });
    });
    it('should return "about:blank" in href if url in data is not valid', () => {
      expect(
        exposeLinkProps({ content: 'Hello world!', href: "jav&#x09;ascript:alert('XSS');" })
      ).toEqual({ children: 'Hello world!', href: 'about:blank' });
    });
  });

  describe('exposeImageProps(data)', () => {
    it('should return only "alt" and "variants" props', () => {
      const image = {
        id: 'image-id',
        type: 'imageAsset',
        attributes: {
          variants: {
            square: {
              url: 'https://something.imgix.com/foo/bar/baz',
              width: 1200,
              height: 580,
            },
            square2x: {
              url: 'https://something.imgix.com/foo/bar/baz',
              width: 2400,
              height: 1160,
            },
          },
        },
      };

      expect(exposeImageProps({ alt: 'Hello world!', image })).toEqual({
        alt: 'Hello world!',
        image,
      });
      expect(exposeImageProps({ alt: 'Hello world!', image, blaa: 'blaa' })).toEqual({
        alt: 'Hello world!',
        image,
      });
    });

    it('should return empty object if data is not valid', () => {
      const image = {
        id: 'image-id',
        type: 'imageAsset',
        attributes: {
          variants: {
            square: {
              url: 'https://something.imgix.com/foo/bar/baz',
              width: 1200,
              height: 580,
            },
          },
        },
      };
      expect(exposeLinkProps({ alt: 'Hello world!', blaa: 'blaa' })).toEqual({});
      expect(exposeLinkProps({ alt: 0, image })).toEqual({});
      expect(exposeLinkProps({ alt: 'Hello world!', image: {} })).toEqual({});
    });

    it('should return "about:blank" in href if url in data is not valid', () => {
      const image = {
        id: 'image-id',
        type: 'imageAsset',
        attributes: {
          variants: {
            square: {
              url: "jav&#x09;ascript:alert('XSS');",
              width: 1200,
              height: 580,
            },
          },
        },
      };

      const expected = {
        id: 'image-id',
        type: 'imageAsset',
        attributes: {
          variants: {
            square: {
              url: 'about:blank',
              width: 1200,
              height: 580,
            },
          },
        },
      };

      expect(exposeImageProps({ alt: 'Hello world!', image })).toEqual({
        alt: 'Hello world!',
        image: expected,
      });
    });
  });

  describe('exposeCustomAppearanceProps(data)', () => {
    it('should return "backgroundColor" prop containing valid hexadecimal color code', () => {
      expect(exposeCustomAppearanceProps({ backgroundColor: '#FFAA00' })).toEqual({
        backgroundColor: '#FFAA00',
      });
      expect(exposeCustomAppearanceProps({ backgroundColor: '#FA0' })).toEqual({
        backgroundColor: '#FA0',
      });
      expect(exposeCustomAppearanceProps({ backgroundColor: '#000000', foo: 'bar' })).toEqual({
        backgroundColor: '#000000',
      });
    });
    it('should return empty "backgroundColor" prop if invalid hexadecimal color code was detected', () => {
      expect(exposeCustomAppearanceProps({ backgroundColor: '#FFAA0000' })).toEqual({});
      expect(exposeCustomAppearanceProps({ backgroundColor: 'FA0' })).toEqual({});
      expect(exposeCustomAppearanceProps({ backgroundColor: '000000' })).toEqual({});
      expect(exposeCustomAppearanceProps({ backgroundColor: '#XX0000' })).toEqual({});
      expect(exposeCustomAppearanceProps({ backgroundColor: '#FFAA0' })).toEqual({});
      expect(exposeCustomAppearanceProps({ backgroundColor: 'rgb(100, 100, 100)' })).toEqual({});
      expect(exposeCustomAppearanceProps({ backgroundColor: 'hsl(60 100% 50%)' })).toEqual({});
      expect(exposeCustomAppearanceProps({ backgroundColor: 'hwb(90 10% 10%)' })).toEqual({});
      expect(exposeCustomAppearanceProps({ backgroundColor: 'tomato' })).toEqual({});
    });

    it('should return "textColor" prop containing valid value (light or dark)', () => {
      expect(exposeCustomAppearanceProps({ textColor: 'light' })).toEqual({ textColor: 'light' });
      expect(exposeCustomAppearanceProps({ textColor: 'dark' })).toEqual({ textColor: 'dark' });
    });
    it('should return empty "textColor" prop if invalid hexadecimal color code was detected', () => {
      expect(exposeCustomAppearanceProps({ textColor: 'blaa' })).toEqual({});
    });

    it('should return "backgroundImage" prop containing valid imageAsset', () => {
      const backgroundImage = {
        id: 'image',
        type: 'imageAsset',
        attributes: {
          variants: {
            square1x: {
              url: `https://picsum.photos/100/100`,
              width: 100,
              height: 100,
            },
            square2x: {
              url: `https://picsum.photos/200/200`,
              width: 200,
              height: 200,
            },
          },
        },
      };
      const alt = 'gb';
      expect(exposeCustomAppearanceProps({ backgroundImage })).toEqual({ backgroundImage });
      expect(exposeCustomAppearanceProps({ backgroundImage, alt })).toEqual({
        backgroundImage,
        alt,
      });
    });

    it('should return empty "backgroundImage" prop if invalid value is passed', () => {
      const backgroundImageWrongType = {
        id: 'image',
        type: 'blaa',
        attributes: {
          variants: {
            square1x: {
              url: `https://picsum.photos/100/100`,
              width: 100,
              height: 100,
            },
          },
        },
      };
      const backgroundImageNoHeight = {
        id: 'image',
        type: 'imageAsset',
        attributes: {
          variants: {
            square1x: {
              url: `https://picsum.photos/100/100`,
              width: 100,
              // height: 100,
            },
          },
        },
      };
      const alt = 'gb';
      const backgroundImage = backgroundImageWrongType;
      expect(exposeCustomAppearanceProps({ backgroundImage })).toEqual({});
      expect(exposeCustomAppearanceProps({ backgroundImage, alt })).toEqual({});
      expect(exposeCustomAppearanceProps({ backgroundImage, backgroundColor: '#FFAA00' })).toEqual(
        {}
      );
      expect(exposeCustomAppearanceProps({ backgroundImage: backgroundImageNoHeight })).toEqual({});
    });

    it('should return partial prop if one of the props is invalid', () => {
      const backgroundImageNoHeight = {
        id: 'image',
        type: 'imageAsset',
        attributes: {
          variants: {
            square1x: {
              url: `https://picsum.photos/100/100`,
              width: 100,
              //height: 100,
            },
          },
        },
      };
      const backgroundImage = {
        id: 'image',
        type: 'imageAsset',
        attributes: {
          variants: {
            square1x: {
              url: `https://picsum.photos/100/100`,
              width: 100,
              height: 100,
            },
          },
        },
      };

      const testA = exposeCustomAppearanceProps({
        backgroundImage: backgroundImageNoHeight,
        backgroundColor: '#FFAA00',
      });
      expect(testA).toEqual({ backgroundColor: '#FFAA00' });

      const alt = 'gb';
      const testB = exposeCustomAppearanceProps({
        backgroundImage,
        alt,
        backgroundColor: 'tomato',
      });
      expect(testB).toEqual({ backgroundImage, alt });
    });
  });

  describe('exposeYoutubeProps(data)', () => {
    it('should return "youtubeVideoId" prop ', () => {
      const youtubeVideoId = '9RQlikX4vvw';
      expect(exposeYoutubeProps({ youtubeVideoId })).toEqual({ youtubeVideoId });
    });
    it('should return empty object if invalid "youtubeVideoId" was detected', () => {
      expect(exposeYoutubeProps({ youtubeVideoId: '9RQli?kX4vvw' })).toEqual({});
      expect(exposeYoutubeProps({ youtubeVideoId: '9RQli&kX4vvw' })).toEqual({});
      expect(exposeYoutubeProps({ youtubeVideoId: '9RQli<kX4vvw' })).toEqual({});
      expect(exposeYoutubeProps({ youtubeVideoId: '9RQli>kX4vvw' })).toEqual({});
    });
  });

  describe('exposeOpenGraphData(data)', () => {
    it('should return title, description, images1200, and images600 props ', () => {
      const title = 'Title';
      const description = 'Description';
      const imageVariant1200 = {
        url: `https://picsum.photos/1200/630`,
        width: 1200,
        height: 630,
      };
      const imageVariant600 = {
        url: `https://picsum.photos/600/315`,
        width: 600,
        height: 315,
      };

      const image = {
        id: 'image',
        type: 'imageAsset',
        attributes: {
          variants: {
            social1200: imageVariant1200,
            social600: imageVariant600,
          },
        },
      };

      const data = { title, description, image };
      expect(exposeOpenGraphData(data)).toEqual({
        title,
        description,
        images1200: [imageVariant1200],
        images600: [imageVariant600],
      });
      expect(exposeOpenGraphData({ title })).toEqual({
        title,
        description: null,
        images1200: null,
        images600: null,
      });
      expect(exposeOpenGraphData({ description })).toEqual({
        title: null,
        description,
        images1200: null,
        images600: null,
      });
      expect(exposeOpenGraphData()).toEqual({
        title: null,
        description: null,
        images1200: null,
        images600: null,
      });
      expect(exposeOpenGraphData({ unKnownKey: null })).toEqual({
        title: null,
        description: null,
        images1200: null,
        images600: null,
      });
    });
  });
});
