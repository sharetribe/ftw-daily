import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import * as propTypes from '../../util/propTypes';
import { DateRangeInput } from './DateRangeInputField';

const noop = () => null;

describe('DateRangeInput', () => {
  it('matches snapshot', () => {
    const props = {
      unitType: propTypes.LINE_ITEM_NIGHT,
      name: 'bookingDates',
      onBlur: noop,
      onChange: noop,
      onFocus: noop,
      onDragStart: noop,
      onDrop: noop,
      startDateId: 'bookingStartDate',
      startDatePlaceholderText: 'today',
      endDateId: 'bookingEndDate',
      endDatePlaceholderText: 'tomorrow',
    };
    const tree = renderDeep(<DateRangeInput {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
