import { fakeIntl } from './test-data';
import { nightsBetween, formatDate } from './dates';

describe('date utils', () => {
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
