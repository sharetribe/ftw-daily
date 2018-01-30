import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import { DateInput } from './FieldDateInput';

const noop = () => null;

describe('DateInput', () => {
  it('matches snapshot', () => {
    const props = {
      name: 'bookingDate',
      onBlur: noop,
      onChange: noop,
      onFocus: noop,
      onDragStart: noop,
      onDrop: noop,
      id: 'bookingDate',
      placeholderText: 'today',
    };
    const tree = renderDeep(<DateInput {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
