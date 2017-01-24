import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from '../../store';
import ChangePasswordForm from './ChangePasswordForm';

describe('ChangePasswordForm', () => {
  it('matches snapshot', () => {
    const store = configureStore();
    const component = renderer.create(
      (
        <Provider store={store}>
          <ChangePasswordForm />
        </Provider>
      ),
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
