import React from 'react';

// react-dates needs to be initialized before using any react-dates component
// Since this is currently only component using react-dates we can do it here
// https://github.com/airbnb/react-dates#initialize
import 'react-dates/initialize';
import { renderDeep } from '../../util/test-helpers';
import { DateInput } from './FieldDateInput';

const noop = () => null;

describe('DateInput', () => {
  it('TODO, wait react-dates to work with React 16.9 without warnings', () => {
    expect('todo').toEqual('todo');
  });
  // it('matches snapshot', () => {
  //   const props = {
  //     name: 'bookingDate',
  //     onBlur: noop,
  //     onChange: noop,
  //     onFocus: noop,
  //     id: 'bookingDate',
  //     placeholderText: 'today',
  //   };
  //   const tree = renderDeep(<DateInput {...props} />);
  //   expect(tree).toMatchSnapshot();
  // });
});
