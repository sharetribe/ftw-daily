import React from 'react';
import { BrowserRouter } from 'react-router';
import renderer from 'react-test-renderer';
import ContactDetailsPage from './ContactDetailsPage';

describe('ContactDetailsPage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <BrowserRouter>
        <ContactDetailsPage params={{ displayName: 'my-shop' }} />
      </BrowserRouter>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
