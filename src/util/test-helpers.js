import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../store';
import localeData from '../translations/en.json';

// Provide all the context for components that connect to the Redux
// store, i18n, router, etc.
export const TestProvider = props => {
  const store = configureStore();
  addLocaleData([...en]);
  return (
    <IntlProvider locale="en" messages={localeData}>
      <BrowserRouter>
        <Provider store={store}>
          {props.children}
        </Provider>
      </BrowserRouter>
    </IntlProvider>
  );
};

// Use Enzyme's shallow rendering to render the given component to a
// JSON structure that can be used in snapshot tests. This doesn't
// render the children within the given component, only a
// representation of the child component and its props.
//
// Useful for snapshot testing components that contain shared
// components. With deep rendering, if the child component changes
// internally, the test for the given component would also fail. This
// avoids the problem by not rendering the full tree but only the
// relevant structure for the given component.
export const renderShallow = component => {
  return toJson(shallow(component));
};

// Fully render the given component to a JSON structure that can be
// used in snapshot tests.
export const renderDeep = component => {
  const comp = renderer.create(
    <TestProvider>
      {component}
    </TestProvider>
  );
  return comp.toJSON();
};

// Create fake Internalization object to help with shallow rendering.
export const fakeIntl = {
  formatDate: d => d,
  formatHTMLMessage: d => d,
  formatMessage: msg => msg.id,
  formatNumber: d => d,
  formatPlural: d => d,
  formatRelative: d => d,
  formatTime: d => d,
  now: d => d,
};
