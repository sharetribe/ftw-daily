import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import SectionHero from './SectionHero';

const noop = () => null;

describe('SectionHero', () => {
  it('matches snapshot', () => {
    window.google = { maps: {} };
    const heroProps = {
      history: { push: noop },
      location: { search: '' },
    };
    const tree = renderDeep(<SectionHero {...heroProps} />);
    delete window.google;
    expect(tree).toMatchSnapshot();
  });
});
