import React, { Component } from 'react';
import { bool, func, number, object, string } from 'prop-types';
import { injectIntl, intlShape } from '../../util/reactIntl';

import { FieldDateRangeController, FilterPopup, FilterPlain } from '../../components';
import css from './BookingDateRangeFilter.css';

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
      initialValues: initialValuesRaw,
      id,
      contentPlacementOffset,
      onSubmit,
      urlParam,
      intl,
      ...rest
    } = this.props;

    const isSelected = !!initialValuesRaw && !!initialValuesRaw.dates;
    const initialValues = isSelected ? initialValuesRaw : { dates: null };

    const startDate = isSelected ? initialValues.dates.startDate : null;
    const endDate = isSelected ? initialValues.dates.endDate : null;

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
      : intl.formatMessage({ id: 'BookingDateRangeFilter.labelPlain' });

    const labelForPopup = isSelected
      ? intl.formatMessage(
          { id: 'BookingDateRangeFilter.labelSelectedPopup' },
          {
            dates: `${formattedStartDate} - ${formattedEndDate}`,
          }
        )
      : intl.formatMessage({ id: 'BookingDateRangeFilter.labelPopup' });

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
        onSubmit={onSubmit}
        {...onClearPopupMaybe}
        {...onCancelPopupMaybe}
        initialValues={initialValues}
        urlParam={urlParam}
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
        onSubmit={onSubmit}
        {...onClearPlainMaybe}
        initialValues={initialValues}
        urlParam={urlParam}
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
  showAsPopup: bool,
  liveEdit: bool,
  urlParam: string.isRequired,
  onSubmit: func.isRequired,
  initialValues: object,
  contentPlacementOffset: number,

  // form injectIntl
  intl: intlShape.isRequired,
};

const BookingDateRangeFilter = injectIntl(BookingDateRangeFilterComponent);

export default BookingDateRangeFilter;
