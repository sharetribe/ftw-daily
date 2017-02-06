import React from 'react';
import { renderTree } from '../../util/test-helpers';
import ContactDetailsPage from './ContactDetailsPage';

describe('ContactDetailsPage', () => {
  it('matches snapshot', () => {
    const tree = renderTree(<ContactDetailsPage params={{ displayName: 'my-shop' }} />);
    expect(tree).toMatchSnapshot();
  });
});
