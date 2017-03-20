import Decimal from 'decimal.js';
import {
  convertDecimalToString,
  convertToDecimal,
  convertUnitToSubUnit,
  ensureSeparator,
  truncateToSubUnitPrecision,
} from './currency';

describe('currency utils', () => {
  describe('ensureSeparator(str)', () => {
    it('changes points in string to dots ', () => {
      expect(ensureSeparator('0')).toEqual('0');
      expect(ensureSeparator('0.0')).toEqual('0.0');
      expect(ensureSeparator('0.')).toEqual('0.');
      expect(ensureSeparator('0,')).toEqual('0.');
      expect(ensureSeparator('0,0')).toEqual('0.0');
      expect(ensureSeparator('0,1234')).toEqual('0.1234');
      expect(ensureSeparator('asdf')).toEqual('asdf');
    });

    it('changes dots in string to points ', () => {
      expect(ensureSeparator('0', true)).toEqual('0');
      expect(ensureSeparator('0.0', true)).toEqual('0,0');
      expect(ensureSeparator('0.', true)).toEqual('0,');
      expect(ensureSeparator('0,', true)).toEqual('0,');
      expect(ensureSeparator('0,0', true)).toEqual('0,0');
      expect(ensureSeparator('0,1234', true)).toEqual('0,1234');
      expect(ensureSeparator('asdf', true)).toEqual('asdf');
    });

    it('Throws exceptions if parameter is not a string', () => {
      expect(() => ensureSeparator(0)).toThrowError('Parameter must be a string');
      expect(() => ensureSeparator(true)).toThrowError('Parameter must be a string');
      expect(() => ensureSeparator([])).toThrowError('Parameter must be a string');
      expect(() => ensureSeparator({})).toThrowError('Parameter must be a string');
      expect(() => ensureSeparator(0, true)).toThrowError('Parameter must be a string');
      expect(() => ensureSeparator(true, true)).toThrowError('Parameter must be a string');
      expect(() => ensureSeparator([], true)).toThrowError('Parameter must be a string');
      expect(() => ensureSeparator({}, true)).toThrowError('Parameter must be a string');
    });
  });

  describe('convertToDecimal(valueStr)', () => {
    it('converts numbers in string format to Decimal', () => {
      expect(convertToDecimal('0')).toEqual(new Decimal('0'));
      expect(convertToDecimal('-0')).toEqual(new Decimal('-0'));
      expect(convertToDecimal('1.23')).toEqual(new Decimal('1.23'));
      expect(convertToDecimal('999999999.99999999')).toEqual(new Decimal('999999999.99999999'));
      expect(convertToDecimal('-999999999.99999999')).toEqual(new Decimal('-999999999.99999999'));
    });

    it('Throws exceptions if string formatted parameter can not be converted to Decimal', () => {
      expect(() => convertToDecimal('asdf')).toThrowError('[DecimalError] Invalid argument: asdf');
      expect(() => convertToDecimal('123asdf')).toThrowError(
        '[DecimalError] Invalid argument: 123asdf'
      );
    });

    it('Throws exceptions if parameter is not a string', () => {
      expect(() => convertToDecimal(true)).toThrowError('Parameter must be a string');
      expect(() => convertToDecimal([])).toThrowError('Parameter must be a string');
      expect(() => convertToDecimal(undefined)).toThrowError('Parameter must be a string');
      expect(() => convertToDecimal(null)).toThrowError('Parameter must be a string');
    });
  });

  describe('convertDecimalToString(<Decimal>)', () => {
    it('converts Decimals to string', () => {
      expect(convertDecimalToString(new Decimal('0'))).toEqual('0');
      expect(convertDecimalToString(new Decimal('-0'))).toEqual('0');
      expect(convertDecimalToString(new Decimal('1.23'))).toEqual('1.23');
      expect(convertDecimalToString(new Decimal('999999999.99999999'))).toEqual(
        '999999999.99999999'
      );
      expect(convertDecimalToString(new Decimal('-999999999.99999999'))).toEqual(
        '-999999999.99999999'
      );
    });

    it('converts numbers in string format to string', () => {
      expect(convertDecimalToString('0')).toEqual('0');
      expect(convertDecimalToString('-0')).toEqual('0');
      expect(convertDecimalToString('1.23')).toEqual('1.23');
      expect(convertDecimalToString('999999999.99999999')).toEqual('999999999.99999999');
      expect(convertDecimalToString('-999999999.99999999')).toEqual('-999999999.99999999');
    });

    it('Throws exceptions if string formatted parameter is not a number', () => {
      expect(() => convertDecimalToString('asdf')).toThrowError(
        '[DecimalError] Invalid argument: asdf'
      );
      expect(() => convertDecimalToString('123asdf')).toThrowError(
        '[DecimalError] Invalid argument: 123asdf'
      );
    });
  });

  describe('truncateToSubUnitPrecision(valueStr, currency)', () => {
    it('positive values', () => {
      expect(truncateToSubUnitPrecision('0', 'USD')).toEqual('0');
      expect(truncateToSubUnitPrecision('1', 'EUR')).toEqual('1');
      expect(truncateToSubUnitPrecision('10', 'USD')).toEqual('10');
      expect(truncateToSubUnitPrecision('10000', 'EUR')).toEqual('10000');
      expect(truncateToSubUnitPrecision('10000.00', 'USD')).toEqual('10000.00');
      expect(truncateToSubUnitPrecision('99.9', 'EUR')).toEqual('99.9');
      expect(truncateToSubUnitPrecision('99.99', 'USD')).toEqual('99.99');
    });

    it('truncate excess amount of decimal values', () => {
      expect(truncateToSubUnitPrecision('99.999999', 'USD')).toEqual('99.99');
      expect(truncateToSubUnitPrecision('1.111', 'USD')).toEqual('1.11');
      expect(truncateToSubUnitPrecision('1.110000', 'USD')).toEqual('1.11');
    });

    it('negative values to throw errors', () => {
      expect(() => truncateToSubUnitPrecision('-0', 'USD')).toThrowError(
        'Parameter must be a positive number'
      );
      expect(() => truncateToSubUnitPrecision('-1', 'USD')).toThrowError(
        'Parameter must be a positive number'
      );
      expect(() => truncateToSubUnitPrecision('-10000', 'USD')).toThrowError(
        'Parameter must be a positive number'
      );
      expect(() => truncateToSubUnitPrecision('-99.99', 'USD')).toThrowError(
        'Parameter must be a positive number'
      );
      expect(() => truncateToSubUnitPrecision('-99.99999', 'USD')).toThrowError(
        'Parameter must be a positive number'
      );
      expect(() => truncateToSubUnitPrecision('-1.111', 'USD')).toThrowError(
        'Parameter must be a positive number'
      );
    });

    it('text input to throw errors', () => {
      expect(() => truncateToSubUnitPrecision('asdf', 'USD')).toThrowError();
      expect(() => truncateToSubUnitPrecision('100asdf', 'USD')).toThrowError();
      expect(() => truncateToSubUnitPrecision('asdf100', 'USD')).toThrowError();
      expect(() => truncateToSubUnitPrecision('@', 'USD')).toThrowError();
    });

    it('wrong currency to throw errors', () => {
      expect(() => truncateToSubUnitPrecision('asdf', 'JPN')).toThrowError();
      expect(() => truncateToSubUnitPrecision('100asdf', 'JPN')).toThrowError();
      expect(() => truncateToSubUnitPrecision('asdf100', 'JPN')).toThrowError();
      expect(() => truncateToSubUnitPrecision('@', 'JPN')).toThrowError();
    });
  });

  describe('convertUnitToSubUnit(value, currency)', () => {
    it('numbers as value', () => {
      expect(convertUnitToSubUnit(0, 'USD')).toEqual(0);
      expect(convertUnitToSubUnit(10, 'USD')).toEqual(1000);
      expect(convertUnitToSubUnit(1, 'EUR')).toEqual(100);
    });

    it('strings as value', () => {
      expect(convertUnitToSubUnit('0', 'USD')).toEqual(0);
      expect(convertUnitToSubUnit('10', 'USD')).toEqual(1000);
      expect(convertUnitToSubUnit('1', 'EUR')).toEqual(100);
      expect(convertUnitToSubUnit('0.10', 'USD')).toEqual(10);
      expect(convertUnitToSubUnit('10,99', 'USD')).toEqual(1099);
    });

    it('wrong type', () => {
      expect(() => convertUnitToSubUnit({}, 'USD')).toThrowError(
        'Value must be either number or string'
      );
      expect(() => convertUnitToSubUnit([], 'USD')).toThrowError(
        'Value must be either number or string'
      );
      expect(() => convertUnitToSubUnit(null, 'EUR')).toThrowError(
        'Value must be either number or string'
      );
    });

    it('wrong currency', () => {
      expect(() => convertUnitToSubUnit(1, 'JPN')).toThrowError(
        'Currency must be either USD or EUR'
      );
    });
  });
});
