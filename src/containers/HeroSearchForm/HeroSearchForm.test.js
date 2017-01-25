import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { injectIntl, IntlProvider } from 'react-intl';
import configureStore from '../../store';
import HeroSearchForm from './HeroSearchForm';

describe('HeroSearchForm', () => {
  it('matches snapshot', () => {
    const store = configureStore();
    const component = renderer.create(
      (
        <Provider store={store}>
          <IntlProvider locale="en">
            <HeroSearchForm />
          </IntlProvider>
        </Provider>
      ),
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
