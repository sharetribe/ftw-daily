import React, { Component } from 'react';
import { arrayOf, bool, func, node, number, object, string } from 'prop-types';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { parseDateFromISO8601, stringifyDateToISO8601 } from '../../util/dates';

import { FieldDateRangeController, FilterPopup, FilterPlain } from '../../components';
import css from './BookingDateRangeFilter.css';

const getDatesQueryParamName = queryParamNames => {
  return Array.isArray(queryParamNames)
    ? queryParamNames[0]
    : typeof queryParamNames === 'string'
    ? queryParamNames
    : 'dates';
};

// Parse query parameter, which should look like "2020-05-28,2020-05-31"
const parseValue = value => {
  const rawValuesFromParams = value ? value.split(',') : [];
  const [startDate, endDate] = rawValuesFromParams.map(v => parseDateFromISO8601(v));
  return value && startDate && endDate ? { dates: { startDate, endDate } } : { dates: null };
};
// Format dateRange value for the query. It's given by FieldDateRangeInput:
// { dates: { startDate, endDate } }
const formatValue = (dateRange, queryParamName) => {
  const hasDates = dateRange && dateRange.dates;
  const { startDate, endDate } = hasDates ? dateRange.dates : {};
  const start = startDate ? stringifyDateToISO8601(startDate) : null;
  const end = endDate ? stringifyDateToISO8601(endDate) : null;
  const value = start && end ? `${start},${end}` : null;
  return { [queryParamName]: value };
};

export class BookingDateRangeFilterComponent extends Component {
  constructor(props) {
    super(props);

    this.popupControllerRef = null;
    this.plainControllerRef = null;
  }

  render() {
    const {
      className,
      rootClassName,
      showAsPopup,
      initialValues,
      id,
      contentPlacementOffset,
      onSubmit,
      queryParamNames,
      label,
      intl,
      ...rest
    } = this.props;

    const datesQueryParamName = getDatesQueryParamName(queryParamNames);
    const initialDates =
      initialValues && initialValues[datesQueryParamName]
        ? parseValue(initialValues[datesQueryParamName])
        : { dates: null };

    const isSelected = !!initialDates.dates;
    const startDate = isSelected ? initialDates.dates.startDate : null;
    const endDate = isSelected ? initialDates.dates.endDate : null;

    const format = {
      month: 'short',
      day: 'numeric',
    };

    const formattedStartDate = isSelected ? intl.formatDate(startDate, format) : null;
    const formattedEndDate = isSelected ? intl.formatDate(endDate, format) : null;

    const labelForPlain = isSelected
      ? intl.formatMessage(
          { id: 'BookingDateRangeFilter.labelSelectedPlain' },
          {
            dates: `${formattedStartDate} - ${formattedEndDate}`,
          }
        )
      : label
      ? label
      : intl.formatMessage({ id: 'BookingDateRangeFilter.labelPlain' });

    const labelForPopup = isSelected
      ? intl.formatMessage(
          { id: 'BookingDateRangeFilter.labelSelectedPopup' },
          {
            dates: `${formattedStartDate} - ${formattedEndDate}`,
          }
        )
      : label
      ? label
      : intl.formatMessage({ id: 'BookingDateRangeFilter.labelPopup' });

    const handleSubmit = values => {
      onSubmit(formatValue(values, datesQueryParamName));
    };

    const onClearPopupMaybe =
      this.popupControllerRef && this.popupControllerRef.onReset
        ? { onClear: () => this.popupControllerRef.onReset(null, null) }
        : {};

    const onCancelPopupMaybe =
      this.popupControllerRef && this.popupControllerRef.onReset
        ? { onCancel: () => this.popupControllerRef.onReset(startDate, endDate) }
        : {};

    const onClearPlainMaybe =
      this.plainControllerRef && this.plainControllerRef.onReset
        ? { onClear: () => this.plainControllerRef.onReset(null, null) }
        : {};

    return showAsPopup ? (
      <FilterPopup
        className={className}
        rootClassName={rootClassName}
        popupClassName={css.popupSize}
        label={labelForPopup}
        isSelected={isSelected}
        id={`${id}.popup`}
        showAsPopup
        contentPlacementOffset={contentPlacementOffset}
        onSubmit={handleSubmit}
        {...onClearPopupMaybe}
        {...onCancelPopupMaybe}
        initialValues={initialDates}
        {...rest}
      >
        <FieldDateRangeController
          name="dates"
          controllerRef={node => {
            this.popupControllerRef = node;
          }}
        />
      </FilterPopup>
    ) : (
      <FilterPlain
        className={className}
        rootClassName={rootClassName}
        label={labelForPlain}
        isSelected={isSelected}
        id={`${id}.plain`}
        liveEdit
        contentPlacementOffset={contentPlacementOffset}
        onSubmit={handleSubmit}
        {...onClearPlainMaybe}
        initialValues={initialDates}
        {...rest}
      >
        <FieldDateRangeController
          name="dates"
          controllerRef={node => {
            this.plainControllerRef = node;
          }}
        />
      </FilterPlain>
    );
  }
}

BookingDateRangeFilterComponent.defaultProps = {
  rootClassName: null,
  className: null,
  showAsPopup: true,
  liveEdit: false,
  initialValues: null,
  contentPlacementOffset: 0,
};

BookingDateRangeFilterComponent.propTypes = {
  rootClassName: string,
  className: string,
  id: string.isRequired,
  label: node,
  showAsPopup: bool,
  liveEdit: bool,
  queryParamNames: arrayOf(string).isRequired,
  onSubmit: func.isRequired,
  initialValues: object,
  contentPlacementOffset: number,

  // form injectIntl
  intl: intlShape.isRequired,
};

const BookingDateRangeFilter = injectIntl(BookingDateRangeFilterComponent);

export default BookingDateRangeFilter;
