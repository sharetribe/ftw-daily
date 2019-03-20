import { types as sdkTypes } from './sdkLoader';
import {
  createSlug,
  parseFloatNum,
  encodeLatLng,
  decodeLatLng,
  encodeLatLngBounds,
  decodeLatLngBounds,
  stringify,
  parse,
} from './urlHelpers';

const { LatLng, LatLngBounds } = sdkTypes;

const SPACE = encodeURIComponent(' ');
const COMMA = encodeURIComponent(',');

describe('urlHelpers', () => {
  describe('parseFloatNum()', () => {
    it('handles empty string (returns "")', () => {
      expect(createSlug('')).toEqual('no-slug');
    });

    it('handles space characters', () => {
      expect(createSlug('ice hockey    tournament')).toEqual('ice-hockey-tournament');
    });

    it('handles special characters', () => {
      expect(createSlug('ice hockey!%/@$€ for the win')).toEqual('ice-hockey-for-the-win');
    });

    it('handles multiple "-"', () => {
      expect(createSlug('testing ---- dashes')).toEqual('testing-dashes');
    });

    it('handles umlauts', () => {
      expect(createSlug('jääkiekko / pesäpallo')).toEqual('jaakiekko-pesapallo');
    });

    it('handles Emojis', () => {
      expect(createSlug('smiling 💩 emoji')).toEqual('smiling-emoji');
    });
  });

  describe('parseFloatNum()', () => {
    it('handles empty value', () => {
      expect(parseFloatNum('')).toBeNull();
    });

    it('handles non-numeric value', () => {
      expect(parseFloatNum('abc')).toBeNull();
    });

    it('handles int value with surrounding whitespace', () => {
      expect(parseFloatNum(' 123 \t')).toEqual(123);
    });

    it('handles float value', () => {
      expect(parseFloatNum('123.01')).toBeCloseTo(123.01, 2);
    });

    it('handles trailing chars', () => {
      expect(parseFloatNum('123abc')).toBeNull();
    });

    it('does not parse comma as a separator', () => {
      expect(parseFloatNum('10,20')).toBeNull();
    });
  });

  describe('LatLng serialisation', () => {
    it('encodes and decodes', () => {
      const location = new LatLng(40, 60);
      expect(decodeLatLng(encodeLatLng(location))).toEqual(location);
    });
  });

  describe('LatLngBounds serialisation', () => {
    it('encodes and decodes', () => {
      const bounds = new LatLngBounds(new LatLng(50, 70), new LatLng(30, 50));
      expect(decodeLatLngBounds(encodeLatLngBounds(bounds))).toEqual(bounds);
    });
  });

  describe('stringify()', () => {
    it('handles empty params', () => {
      expect(stringify({})).toEqual('');
    });

    it('sorts params', () => {
      const params = { b: 'B', c: 'C', a: 'A' };
      expect(stringify(params)).toEqual('a=A&b=B&c=C');
    });

    it('encodes values', () => {
      const params = {
        space: 'A and b',
        num: 123,
        bool: true,
        undef: undefined,
        nil: null,
      };
      expect(stringify(params)).toEqual(`bool=true&num=123&space=A${SPACE}and${SPACE}b`);
    });

    it('encodes SDK types', () => {
      const params = {
        origin: new LatLng(40, 60),
        bounds: new LatLngBounds(new LatLng(50, 70), new LatLng(30, 50)),
      };
      const origin = `40${COMMA}60`;
      const bounds = `50${COMMA}70${COMMA}30${COMMA}50`;
      expect(stringify(params)).toEqual(`bounds=${bounds}&origin=${origin}`);
    });
  });

  describe('parse()', () => {
    it('handles empty string', () => {
      expect(parse('')).toEqual({});
    });

    it('handles question mark', () => {
      expect(parse('?')).toEqual({});
    });

    it('decodes values', () => {
      const search = `bool1=true&bool2=false&num1=123&num2=-1.01&space=A${SPACE}and${SPACE}b`;
      expect(parse(search)).toEqual({
        space: 'A and b',
        num1: 123,
        num2: -1.01,
        bool2: false,
        bool1: true,
      });
    });

    it('decodes SDK types', () => {
      const origin = `40${COMMA}60`;
      const bounds = `50${COMMA}70${COMMA}30${COMMA}50`;
      const search = `bounds=${bounds}&origin=${origin}&invalid=a,10&badBounds=true`;
      const options = {
        latlng: ['origin', 'invalid'],
        latlngBounds: ['bounds', 'badBounds'],
      };
      expect(parse(search, options)).toEqual({
        origin: new LatLng(40, 60),
        invalid: null,
        bounds: new LatLngBounds(new LatLng(50, 70), new LatLng(30, 50)),
        badBounds: null,
      });
    });

    it('keeps SDK type info without options', () => {
      const origin = `40${COMMA}60`;
      const bounds = `50${COMMA}70${COMMA}30${COMMA}50`;
      const search = `bounds=${bounds}&origin=${origin}`;
      expect(parse(search)).toEqual({
        bounds: '50,70,30,50',
        origin: '40,60',
      });
    });
  });
});
