import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
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

export const renderShallow = component => {
  return toJson(shallow(component));
};

export const renderDeep = component => {
  const comp = renderer.create(
    <TestProvider>
      {component}
    </TestProvider>,
  );
  return comp.toJSON();
};
