import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { injectIntl, IntlProvider } from 'react-intl';
import configureStore from '../../store';
import { TestProvider } from '../../util/test-helpers';
import HeroSearchForm from './HeroSearchForm';

describe('HeroSearchForm', () => {
  it('matches snapshot', () => {
    const store = configureStore();
    const component = renderer.create(
      (
        <TestProvider>
          <HeroSearchForm />
        </TestProvider>
      ),
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
