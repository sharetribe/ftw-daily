import React from 'react';

// react-dates needs to be initialized before using any react-dates component
// Since this is currently only component using react-dates we can do it here
// https://github.com/airbnb/react-dates#initialize
import 'react-dates/initialize';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { BookingDateRangeFilterComponent } from './BookingDateRangeFilter';

describe('BookingDateRangeFilter', () => {
  it('matches popup snapshot', () => {
    const tree = renderShallow(
      <BookingDateRangeFilterComponent
        id="BookingDateRangeFilter"
        queryParamNames={['dates']}
        liveEdit={false}
        showAsPopup={true}
        contentPlacementOffset={-14}
        initialValues={{}}
        onSubmit={() => null}
        intl={fakeIntl}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it('matches plain snapshot', () => {
    const tree = renderShallow(
      <BookingDateRangeFilterComponent
        id="BookingDateRangeFilter"
        queryParamNames={['dates']}
        liveEdit={true}
        showAsPopup={false}
        contentPlacementOffset={-14}
        initialValues={{}}
        onSubmit={() => null}
        intl={fakeIntl}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
