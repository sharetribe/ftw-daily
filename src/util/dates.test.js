import { fakeIntl } from './test-data';
import { isDate, isSameDate, nightsBetween, daysBetween, formatDate } from './dates';

describe('date utils', () => {
  describe('isDate()', () => {
    it('should return false if parameters is string', () => {
      expect(isDate('Monday')).toBeFalsy();
    });
    it('should return false if parameters is number', () => {
      expect(isDate('1546293600000')).toBeFalsy();
    });
    it('should return false if parameters is incorrect Date', () => {
      expect(isDate(new Date('random string'))).toBeFalsy();
    });
    it('should return true if parameters is Date', () => {
      expect(isDate(new Date(1546293600000))).toBeTruthy();
    });
  });

  describe('isSameDate()', () => {
    it('should return falsy if parameters do not match', () => {
      const a = new Date(1546293600000);
      const b = new Date(1546293600001);
      expect(isSameDate(a, b)).toBeFalsy();
    });
    it('should be truthy if parameters match', () => {
      expect(isSameDate(new Date(2019, 0, 1), new Date(2019, 0, 1))).toBeTruthy();
    });
  });

  describe('nightsBetween()', () => {
    it('should fail if end date is before start date', () => {
      const start = new Date(2017, 0, 2);
      const end = new Date(2017, 0, 1);
      expect(() => nightsBetween(start, end)).toThrow('End date cannot be before start date');
    });
    it('should handle equal start and end dates', () => {
      const d = new Date(2017, 0, 1);
      expect(nightsBetween(d, d)).toEqual(0);
    });
    it('should calculate night count for a single night', () => {
      const start = new Date(2017, 0, 1);
      const end = new Date(2017, 0, 2);
      expect(nightsBetween(start, end)).toEqual(1);
    });
    it('should calculate night count', () => {
      const start = new Date(2017, 0, 1);
      const end = new Date(2017, 0, 3);
      expect(nightsBetween(start, end)).toEqual(2);
    });
  });

  describe('daysBetween()', () => {
    it('should fail if end date is before start date', () => {
      const start = new Date(2017, 0, 2);
      const end = new Date(2017, 0, 1);
      expect(() => daysBetween(start, end)).toThrow('End date cannot be before start date');
    });
    it('should handle equal start and end dates', () => {
      const d = new Date(2017, 0, 1);
      expect(daysBetween(d, d)).toEqual(0);
    });
    it('should calculate night count for a single day', () => {
      const start = new Date(2017, 0, 1);
      const end = new Date(2017, 0, 2);
      expect(daysBetween(start, end)).toEqual(1);
    });
    it('should calculate day count', () => {
      const start = new Date(2017, 0, 1);
      const end = new Date(2017, 0, 3);
      expect(daysBetween(start, end)).toEqual(2);
    });
  });

  describe('formatDate()', () => {
    /*
      NOTE: These are not really testing the formatting properly since
      the fakeIntl object has to be used in the tests.
     */

    it('formats a date today', () => {
      const d = new Date(Date.UTC(2017, 10, 23, 13, 51));
      expect(formatDate(fakeIntl, 'Today', d)).toEqual('Today, 13:51');
    });
    it('formats a date', () => {
      const d = new Date(Date.UTC(2017, 10, 22, 13, 51));
      expect(formatDate(fakeIntl, 'Today', d)).toEqual('2017-11-22, 13:51');
    });
  });
});
