import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import classNames from 'classnames';
import { omit } from 'lodash';

import config from '../../config';
import { stringify } from '../../util/urlHelpers';
import { Menu, MenuContent, MenuItem, MenuLabel, NamedLink } from '../../components';
import css from './SearchAttributes.css';

const SelectSingleCustomAttribute = props => {
  const { customAttribute, urlQueryParams, intl } = props;

  const ca = customAttribute && config.customAttributes[customAttribute];

  // name of the corresponding query parameter
  const caParam = `ca_${customAttribute}`;
  // current value of this custom attribute filter
  const currentValue = urlQueryParams[caParam];
  // query params where this custom attribute is cleared
  const clearUrlQueryParams = omit(urlQueryParams, caParam);
  // query string for clearing this custom attribute
  const clearQueryString = stringify(clearUrlQueryParams);

  // resolve menu label text and class
  const menuLabel =
    currentValue || intl.formatMessage({ id: `SearchAttributes.${customAttribute}.label` });
  const menuLabelClass = currentValue ? css.menuLabelSelected : css.menuLabel;

  return (
    <Menu className={css.menu} useArrow={false} contentPlacementOffset={-14}>
      <MenuLabel className={menuLabelClass}>{menuLabel}</MenuLabel>
      <MenuContent className={css.menuContent}>
        {ca.values.map(v => {
          // check if this option is selected
          const selected = currentValue === v;
          // search query string with this option added
          const queryString = stringify({ ...urlQueryParams, [caParam]: v });
          // menu item border class
          const menuItemBorderClass = selected ? css.menuItemBorderSelected : css.menuItemBorder;

          return (
            <MenuItem key={v}>
              <NamedLink className={css.menuItem} name="SearchPage" to={{ search: queryString }}>
                <span className={menuItemBorderClass} />
                {v}
              </NamedLink>
            </MenuItem>
          );
        })}
        <MenuItem key={'clearLink'}>
          <NamedLink
            className={css.clearMenuItem}
            name="SearchPage"
            to={{ search: clearQueryString }}
          >
            <FormattedMessage id={'SearchAttributes.clear'} />
          </NamedLink>
        </MenuItem>
      </MenuContent>
    </Menu>
  );
};

const SearchAttributesComponent = props => {
  const {
    rootClassName,
    className,
    urlQueryParams,
    listingsAreLoaded,
    resultsCount,
    searchInProgress,
    onMapIconClick,
    intl,
  } = props;

  const loadingResults = <FormattedMessage id="SearchAttributes.loadingResults" />;

  const resultsFound = (
    <FormattedMessage id="SearchAttributes.foundResults" values={{ count: resultsCount }} />
  );

  const noResults = <FormattedMessage id="SearchAttributes.noResults" />;

  const resultsFoundMobile = (
    <h2>
      <FormattedMessage id="SearchAttributes.foundResults" values={{ count: resultsCount }} />
    </h2>
  );

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.filters}>
        <SelectSingleCustomAttribute
          customAttribute="category"
          urlQueryParams={urlQueryParams}
          intl={intl}
        />
      </div>

      <div className={css.searchResultSummary}>
        {listingsAreLoaded && resultsCount > 0 ? resultsFound : null}
        {listingsAreLoaded && resultsCount === 0 ? noResults : null}
        {searchInProgress ? loadingResults : null}
      </div>

      <div className={css.searchResultSummaryMobile}>
        <div>
          {listingsAreLoaded && resultsCount > 0 ? resultsFoundMobile : null}
          {listingsAreLoaded && resultsCount === 0 ? noResults : null}
          {searchInProgress ? loadingResults : null}
        </div>
        <div className={css.mapIcon} onClick={onMapIconClick}>
          <FormattedMessage id="SearchAttributes.openMapView" className={css.mapIconText} />
        </div>
      </div>
    </div>
  );
};

const SearchAttributes = injectIntl(SearchAttributesComponent);

export default SearchAttributes;
