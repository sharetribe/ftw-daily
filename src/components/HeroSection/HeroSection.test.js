import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import HeroSection from './HeroSection';

describe('HeroSection', () => {
  it('matches snapshot', () => {
    const tree = renderDeep(
      <HeroSection params={{ displayName: 'most-awesome-shop' }}>
        test
      </HeroSection>
    );
    expect(tree).toMatchSnapshot();
  });
});
