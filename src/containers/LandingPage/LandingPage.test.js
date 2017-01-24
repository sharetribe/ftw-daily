import React from 'react';
import { BrowserRouter } from 'react-router';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import LandingPage from './LandingPage';

describe('LandingPage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      (
        <IntlProvider locale="en">
          <BrowserRouter>
            <LandingPage />
          </BrowserRouter>
        </IntlProvider>
      ),
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
