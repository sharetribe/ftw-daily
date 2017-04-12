import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { InboxPageComponent } from './InboxPage';

describe('InboxPage', () => {
  it('matches snapshot', () => {
    const props = {
      params: {
        tab: 'orders',
      },
      fetchInProgress: false,
      transactions: [],
      intl: fakeIntl,
    };
    const tree = renderShallow(<InboxPageComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
