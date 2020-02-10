import React from 'react';
import { instanceOf, string } from 'prop-types';
import classNames from 'classnames';
import { isSameDay, formatDateToText } from '../../util/dates';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { DATE_TYPE_DATE, DATE_TYPE_DATETIME, propTypes } from '../../util/types';

import css from './TimeRange.css';

export const TimeRangeComponent = props => {
  const { rootClassName, className, startDate, endDate, dateType, timeZone, intl } = props;
  const start = formatDateToText(intl, startDate, timeZone);
  const end = formatDateToText(intl, endDate, timeZone);
  const isSingleDay = isSameDay(startDate, endDate, timeZone);

  const classes = classNames(rootClassName || css.root, className);

  if (isSingleDay && dateType === DATE_TYPE_DATE) {
    return (
      <div className={classes}>
        <span className={css.dateSection}>{`${start.date}`}</span>
      </div>
    );
  } else if (dateType === DATE_TYPE_DATE) {
    return (
      <div className={classes}>
        <span className={css.dateSection}>{`${start.date} -`}</span>
        <span className={css.dateSection}>{`${end.date}`}</span>
      </div>
    );
  } else if (isSingleDay && dateType === DATE_TYPE_DATETIME) {
    return (
      <div className={classes}>
        <span className={css.dateSection}>{`${start.date}, ${start.time} - ${end.time}`}</span>
      </div>
    );
  } else {
    return (
      <div className={classes}>
        <span className={css.dateSection}>{`${start.dateAndTime} - `}</span>
        <span className={css.dateSection}>{`${end.dateAndTime}`}</span>
      </div>
    );
  }
};

TimeRangeComponent.defaultProps = {
  rootClassName: null,
  className: null,
  dateType: null,
  timeZone: null,
};

TimeRangeComponent.propTypes = {
  rootClassName: string,
  className: string,
  startDate: instanceOf(Date).isRequired,
  endDate: instanceOf(Date).isRequired,
  dateType: propTypes.dateType,
  timeZone: string,

  // from injectIntl
  intl: intlShape.isRequired,
};

export default injectIntl(TimeRangeComponent);