import React from 'react';
import { renderTree } from '../../util/test-helpers';
import HeroSearchForm from './HeroSearchForm';

describe('HeroSearchForm', () => {
  it('matches snapshot', () => {
    const tree = renderTree(<HeroSearchForm />);
    expect(tree).toMatchSnapshot();
  });
});
