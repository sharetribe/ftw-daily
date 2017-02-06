import React from 'react';
import { renderTree } from '../../util/test-helpers';
import Menu from './Menu';

describe('Menu', () => {
  it('matches snapshot', () => {
    const tree = renderTree(<Menu />);
    expect(tree).toMatchSnapshot();
  });
});
