import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(<NotFoundPage />);
    expect(tree).toMatchSnapshot();
  });
});
