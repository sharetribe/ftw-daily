import React from 'react';
import { fakeIntl } from '../../util/test-data';
import { renderShallow } from '../../util/test-helpers';
import { PaginationLinksComponent as PaginationLinks } from './PaginationLinks';

describe('PaginationLinks', () => {
  it('should match snapshot with both links enabled', () => {
    const pagination = {
      page: 2,
      perPage: 10,
      totalItems: 30,
      totalPages: 3,
    };
    const props = {
      pageName: 'SomePage',
      pagePathParams: { id: 'some-page-id' },
      pageSearchParams: { param: 'foobar' },
      pagination,
      intl: fakeIntl,
    };
    const tree = renderShallow(<PaginationLinks {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should match snapshot with both links disabled', () => {
    const pagination = {
      page: 1,
      perPage: 10,
      totalItems: 10,
      totalPages: 1,
    };
    const props = {
      pageName: 'SomePage',
      pagePathParams: { id: 'some-page-id' },
      pageSearchParams: { param: 'foobar' },
      pagination,
      intl: fakeIntl,
    };
    const tree = renderShallow(<PaginationLinks {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should match snapshot with prev disabled and next enabled', () => {
    const pagination = {
      page: 1,
      perPage: 10,
      totalItems: 30,
      totalPages: 3,
    };
    const props = {
      pageName: 'SomePage',
      pagePathParams: { id: 'some-page-id' },
      pageSearchParams: { param: 'foobar' },
      pagination,
      intl: fakeIntl,
    };
    const tree = renderShallow(<PaginationLinks {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should match snapshot with prev enabled and next disabled', () => {
    const pagination = {
      page: 3,
      perPage: 10,
      totalItems: 30,
      totalPages: 3,
    };
    const props = {
      pageName: 'SomePage',
      pagePathParams: { id: 'some-page-id' },
      pageSearchParams: { param: 'foobar' },
      pagination,
      intl: fakeIntl,
    };
    const tree = renderShallow(<PaginationLinks {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
