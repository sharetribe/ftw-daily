import React from 'react';
import renderer from 'react-test-renderer';
import { TestProvider } from '../../util/test-helpers';
import HeroSection from './HeroSection';

describe('HeroSection', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      (
        <TestProvider>
          <HeroSection params={{ displayName: 'most-awesome-shop' }}>
            test
          </HeroSection>
        </TestProvider>
      ),
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
