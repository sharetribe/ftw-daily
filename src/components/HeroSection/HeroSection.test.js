import React from 'react';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import HeroSection from './HeroSection';

describe('HeroSection', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      (
        <IntlProvider locale="en">
          <HeroSection params={{ displayName: 'most-awesome-shop' }}>
            test
          </HeroSection>
        </IntlProvider>
      ),
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
