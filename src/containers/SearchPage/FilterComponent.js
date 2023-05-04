import React from 'react';
import {
  BookingDateRangeFilter,
  PriceFilter,
  KeywordFilter,
  SelectSingleFilter,
  SelectMultipleFilter,
} from '../../components';
import css from './SearchPage.module.css';

/**
 * FilterComponent is used to map configured filter types
 * to actual filter components
 */
const FilterComponent = props => {
  const {
    PageName,
    idPrefix,
    filterConfig,
    urlQueryParams,
    initialValues,
    getHandleChangedValueFn,
    pageName,
    isSelect,
    isDateSelect,
    ...rest
  } = props;

  const { id, type, queryParamNames, label, config } = filterConfig;
  const { liveEdit, showAsPopup } = rest;
  


 
  const useHistoryPush = liveEdit || showAsPopup;
  const prefix = idPrefix || 'SearchPage';
  const componentId = `${prefix}.${id.toLowerCase()}`;
  const name = id.replace(/\s+/g, '-').toLowerCase();

  switch (type) {
    case 'SelectSingleFilter': {
      return (
        <SelectSingleFilter
          id={componentId}
          isSelect={isSelect}
          label={label}
          queryParamNames={queryParamNames}
          initialValues={initialValues(queryParamNames)}
          PageName={PageName}
          // onSelect={(e) => PageName == "LandingPage" ? getHandleChangedValueFn(e) : getHandleChangedValueFn(useHistoryPush)}
          onSubmit={pageName != "SearchPage" ? (e) => getHandleChangedValueFn(e) : getHandleChangedValueFn(useHistoryPush)}
          {...config}
          {...rest}
        />
      );
    }
    case 'SelectMultipleFilter': {
      return (
        <SelectMultipleFilter
          id={componentId}
          label={label}
          name={name}
          queryParamNames={queryParamNames}
          initialValues={initialValues(queryParamNames)}
          onSubmit={pageName != "SearchPage" ? (e) => getHandleChangedValueFn(e) : getHandleChangedValueFn(useHistoryPush)}
          {...config}
          {...rest}
        />
      );
    }
    case 'BookingDateRangeFilter': {
      return (
        <BookingDateRangeFilter
          id={componentId}
          label={label}
          queryParamNames={queryParamNames}
          // filtersFor={Landingpage}
          initialValues={initialValues(queryParamNames)}
          // onSelect={(e) => PageName == "LandingPage" ? getHandleChangedValueFn(useHistoryPush) : getHandleChangedValueFn(e)}
          onSubmit={pageName != "SearchPage" ? (e) => getHandleChangedValueFn(e) : getHandleChangedValueFn(useHistoryPush)}
          isDateSelect={isDateSelect}
          className={isDateSelect ? css.dateSelect : null}
          {...config}
          {...rest}
        />
      );
    }
    case 'PriceFilter': {
      return (
        PageName == "LandingPage"
          ? null : <PriceFilter
            id={componentId}
            label={label}
            queryParamNames={queryParamNames}
            initialValues={initialValues(queryParamNames)}
            onSubmit={pageName != "SearchPage" ? (e) => getHandleChangedValueFn(e) : getHandleChangedValueFn(useHistoryPush)}
            {...config}
            {...rest}
          />
      );
    }



    default:
      return null;
  }
};

export default FilterComponent;
