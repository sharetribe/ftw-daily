import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import SearchForm from './SearchForm';

describe('SearchForm', () => {
  it('matches snapshot', () => {
    window.google = { maps: {} };
    const tree = renderDeep(<SearchForm />);
    expect(tree).toMatchSnapshot();
    delete window.google;
  });
});
