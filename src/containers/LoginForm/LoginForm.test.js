import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from '../../store';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('matches snapshot', () => {
    const store = configureStore();
    const component = renderer.create(
      (
        <Provider store={store}>
          <LoginForm />
        </Provider>
      ),
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
