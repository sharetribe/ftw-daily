import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import SecurityPage from './SecurityPage';

describe('SecurityPage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(<SecurityPage />);
    expect(tree).toMatchSnapshot();
  });
});
