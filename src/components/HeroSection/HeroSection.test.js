import React from 'react';
import { renderTree } from '../../util/test-helpers';
import HeroSection from './HeroSection';

describe('HeroSection', () => {
  it('matches snapshot', () => {
    const tree = renderTree(
      <HeroSection params={{ displayName: 'most-awesome-shop' }}>
        test
      </HeroSection>,
    );
    expect(tree).toMatchSnapshot();
  });
});
