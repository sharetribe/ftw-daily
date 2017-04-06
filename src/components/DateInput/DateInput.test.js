import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import DateInput from './DateInput';

const noop = () => null;

describe('DateInput', () => {
  it('matches snapshot', () => {
    const props = {
      onBlur: noop,
      onChange: noop,
      onFocus: noop,
    }
    const tree = renderDeep(<DateInput {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
