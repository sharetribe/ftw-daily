import React from 'react';
import { BrowserRouter } from 'react-router';
import renderer from 'react-test-renderer';
import NotificationSettingsPage from './NotificationSettingsPage';

describe('NotificationSettingsPage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <BrowserRouter>
        <NotificationSettingsPage />
      </BrowserRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
