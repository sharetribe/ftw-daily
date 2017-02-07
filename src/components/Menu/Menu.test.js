import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import Menu from './Menu';

describe('Menu', () => {
  it('matches snapshot', () => {
    const tree = renderDeep(<Menu />);
    expect(tree).toMatchSnapshot();
  });
});
