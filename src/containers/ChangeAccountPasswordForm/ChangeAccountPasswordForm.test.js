import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from '../../store';
import ChangeAccountPasswordForm from './ChangeAccountPasswordForm';

describe('ChangeAccountPasswordForm', () => {
  it('matches snapshot', () => {
    const store = configureStore();
    const component = renderer.create(
      (
        <Provider store={store}>
          <ChangeAccountPasswordForm />
        </Provider>
      ),
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
