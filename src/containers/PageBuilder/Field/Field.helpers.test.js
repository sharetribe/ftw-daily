import {
  exposeContentAsChildren,
  exposeContentString,
  exposeLinkProps,
  exposeImageProps,
  exposeCustomBackgroundProps,
} from './Field.helpers';

describe('Field helpers', () => {
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
    it('should return only "label" and "href" props containing valid strings"', () => {
      expect(
        exposeLinkProps({ label: 'Hello world!', href: 'https://my.example.com/some/image.png' })
      ).toEqual({ children: 'Hello world!', href: 'https://my.example.com/some/image.png' });
      expect(
        exposeLinkProps({
          label: 'Hello world!',
          href: 'https://my.example.com/some/image.png',
          blaa: 'blaa',
        })
      ).toEqual({ children: 'Hello world!', href: 'https://my.example.com/some/image.png' });
    });
    it('should return empty object if data is not valid', () => {
      expect(exposeLinkProps({ label: 'Hello world!', blaa: 'blaa' })).toEqual({});
      expect(exposeLinkProps({ label: 0, href: 'https://my.example.com/some/image.png' })).toEqual(
        {}
      );
    });
    it('should return "about:blank" in href if url in data is not valid', () => {
      expect(
        exposeLinkProps({ label: 'Hello world!', href: "jav&#x09;ascript:alert('XSS');" })
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

  describe('exposeCustomBackgroundProps(data)', () => {
    it('should return "color" prop containing valid hexadecimal color code', () => {
      expect(exposeCustomBackgroundProps({ color: '#FFAA00' })).toEqual({ color: '#FFAA00' });
      expect(exposeCustomBackgroundProps({ color: '#FA0' })).toEqual({ color: '#FA0' });
      expect(exposeCustomBackgroundProps({ color: '#000000', foo: 'bar' })).toEqual({
        color: '#000000',
      });
    });
    it('should return empty "color" prop if invalid hexadecimal color code was detected', () => {
      expect(exposeCustomBackgroundProps({ color: '#FFAA0000' })).toEqual({});
      expect(exposeCustomBackgroundProps({ color: 'FA0' })).toEqual({});
      expect(exposeCustomBackgroundProps({ color: '000000' })).toEqual({});
      expect(exposeCustomBackgroundProps({ color: '#XX0000' })).toEqual({});
      expect(exposeCustomBackgroundProps({ color: '#FFAA0' })).toEqual({});
      expect(exposeCustomBackgroundProps({ color: 'rgb(100, 100, 100)' })).toEqual({});
      expect(exposeCustomBackgroundProps({ color: 'hsl(60 100% 50%)' })).toEqual({});
      expect(exposeCustomBackgroundProps({ color: 'hwb(90 10% 10%)' })).toEqual({});
      expect(exposeCustomBackgroundProps({ color: 'tomato' })).toEqual({});
    });

    it('should return "textColor" prop containing valid value (light or dark)', () => {
      expect(exposeCustomBackgroundProps({ textColor: 'light' })).toEqual({ textColor: 'light' });
      expect(exposeCustomBackgroundProps({ textColor: 'dark' })).toEqual({ textColor: 'dark' });
    });
    it('should return empty "textColor" prop if invalid hexadecimal color code was detected', () => {
      expect(exposeCustomBackgroundProps({ textColor: 'blaa' })).toEqual({});
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
      expect(exposeCustomBackgroundProps({ backgroundImage })).toEqual({ backgroundImage });
      expect(exposeCustomBackgroundProps({ backgroundImage, alt })).toEqual({
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
      expect(exposeCustomBackgroundProps({ backgroundImage })).toEqual({});
      expect(exposeCustomBackgroundProps({ backgroundImage, alt })).toEqual({});
      expect(exposeCustomBackgroundProps({ backgroundImage, color: '#FFAA00' })).toEqual({});
      expect(exposeCustomBackgroundProps({ backgroundImage: backgroundImageNoHeight })).toEqual({});
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

      const testA = exposeCustomBackgroundProps({
        backgroundImage: backgroundImageNoHeight,
        color: '#FFAA00',
      });
      expect(testA).toEqual({ color: '#FFAA00' });

      const alt = 'gb';
      const testB = exposeCustomBackgroundProps({ backgroundImage, alt, color: 'tomato' });
      expect(testB).toEqual({ backgroundImage, alt });
    });
  });
});
