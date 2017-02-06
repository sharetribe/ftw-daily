import React from 'react';
import { renderTree } from '../../util/test-helpers';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  it('matches snapshot', () => {
    const tree = renderTree(<NotFoundPage />);
    expect(tree).toMatchSnapshot();
  });
});
