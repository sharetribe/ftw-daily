import {
  exposeContentAsChildren,
  exposeContentString,
  exposeLinkProps,
  exposeImageProps,
  exposeColorProps,
} from './Field.helpers.js';

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

  // describe('exposeLinkProps(data)', () => {
  //   it('should return only "children" prop containing the string from passed-in "content"', () => {
  //     expect(exposeLinkProps({ content: 'Hello world!' })).toEqual({ content: 'Hello world!' });
  //     expect(exposeLinkProps({ content: 'Hello world!', blaa: 'blaa' })).toEqual({ content: 'Hello world!' });
  //   });
  // });

  // describe('exposeImageProps(data)', () => {
  //   it('should return only "children" prop containing the string from passed-in "content"', () => {
  //     expect(exposeImageProps({ content: 'Hello world!' })).toEqual({ content: 'Hello world!' });
  //     expect(exposeImageProps({ content: 'Hello world!', blaa: 'blaa' })).toEqual({ content: 'Hello world!' });
  //   });
  // });

  describe('exposeColorProps(data)', () => {
    it('should return only "color" prop containing valid hexadecimal color code', () => {
      expect(exposeColorProps({ color: '#FFAA00' })).toEqual({ color: '#FFAA00' });
      expect(exposeColorProps({ color: '#FA0' })).toEqual({ color: '#FA0' });
      expect(exposeColorProps({ color: '#000000' })).toEqual({ color: '#000000' });
    });
    it('should return empty "color" prop if invalid hexadecimal color code was detected', () => {
      expect(exposeColorProps({ color: '#FFAA0000' })).toEqual({});
      expect(exposeColorProps({ color: 'FA0' })).toEqual({});
      expect(exposeColorProps({ color: '000000' })).toEqual({});
      expect(exposeColorProps({ color: '#XX0000' })).toEqual({});
      expect(exposeColorProps({ color: '#FFAA0' })).toEqual({});
      expect(exposeColorProps({ color: 'rgb(100, 100, 100)' })).toEqual({});
      expect(exposeColorProps({ color: 'hsl(60 100% 50%)' })).toEqual({});
      expect(exposeColorProps({ color: 'hwb(90 10% 10%)' })).toEqual({});
      expect(exposeColorProps({ color: 'tomato' })).toEqual({});
    });
  });
});
