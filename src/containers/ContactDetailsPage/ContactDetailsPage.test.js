import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import ContactDetailsPage from './ContactDetailsPage';

describe('ContactDetailsPage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(<ContactDetailsPage params={{ displayName: 'my-shop' }} />);
    expect(tree).toMatchSnapshot();
  });
});
