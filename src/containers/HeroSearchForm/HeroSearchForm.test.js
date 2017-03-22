import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import HeroSearchForm from './HeroSearchForm';

describe('HeroSearchForm', () => {
  it('matches snapshot', () => {
    window.google = { maps: {} };
    const tree = renderDeep(<HeroSearchForm />);
    expect(tree).toMatchSnapshot();
    delete window.google;
  });
});
