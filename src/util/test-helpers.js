import React from 'react';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from '../store';

export const TestProvider = props => {
  const store = configureStore();
  return (
    <IntlProvider locale="en">
      <BrowserRouter>
        <Provider store={store}>
          {props.children}
        </Provider>
      </BrowserRouter>
    </IntlProvider>
  );
};

export const renderTree = children => {
  const comp = renderer.create(
    <TestProvider>
      {children}
    </TestProvider>,
  );
  return comp.toJSON();
};
