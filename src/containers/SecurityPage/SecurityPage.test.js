import React from 'react';
import { renderTree } from '../../util/test-helpers';
import SecurityPage from './SecurityPage';

describe('SecurityPage', () => {
  it('matches snapshot', () => {
    const tree = renderTree(<SecurityPage />);
    expect(tree).toMatchSnapshot();
  });
});
