import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import HeroSection from './HeroSection';

const noop = () => null;

describe('HeroSection', () => {
  it('matches snapshot', () => {
    window.google = { maps: {} };
    const heroProps = {
      history: { push: noop },
      location: { search: '' },
    };
    const tree = renderDeep(<HeroSection {...heroProps} />);
    delete window.google;
    expect(tree).toMatchSnapshot();
  });
});
