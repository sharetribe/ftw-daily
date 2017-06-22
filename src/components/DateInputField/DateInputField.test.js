import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import { DateInput } from './DateInputField';

const noop = () => null;

describe('DateInput', () => {
  it('matches snapshot', () => {
    const props = {
      name: 'someDate',
      onBlur: noop,
      onChange: noop,
      onFocus: noop,
      onDragStart: noop,
      onDrop: noop,
    };
    const tree = renderDeep(<DateInput {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
