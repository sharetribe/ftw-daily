import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from '../../store';
import PasswordForgottenForm from './PasswordForgottenForm';

describe('PasswordForgottenForm', () => {
  it('matches snapshot', () => {
    const store = configureStore();
    const component = renderer.create(
      <Provider store={store}>
        <PasswordForgottenForm />
      </Provider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
