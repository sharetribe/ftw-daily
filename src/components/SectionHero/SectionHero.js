import React, { Component } from 'react';
import { string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { NamedLink } from '../../components';
import { TopbarSearchForm } from '../../forms';
import config from '../../config';
import { createResourceLocatorString } from '../../util/routes';
import routeConfiguration from '../../routeConfiguration';
import { parse, stringify } from '../../util/urlHelpers';

import css from './SectionHero.css';

class SectionHero extends Component {

  constructor(props) {
    super(props);
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  

  
  
  handleSubmit(values) {
    const { currentSearchParams } = this.props;
    const { search, selectedPlace } = values.location;
    const { history } = this.props;
    const { origin, bounds } = selectedPlace;
    const originMaybe = config.sortSearchByDistance ? { origin } : {};
    const searchParams = {
      ...currentSearchParams,
      ...originMaybe,
      address: search,
      bounds,
    };
    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, searchParams));
  }

  

  render() {

    const { rootClassName, className, location } = this.props;
    const { mobilemenu, mobilesearch, address, origin, bounds } = parse(location.search, {
      latlng: ['origin'],
      latlngBounds: ['bounds'],
    });
    const locationFieldsPresent = config.sortSearchByDistance
      ? address && origin && bounds
      : address && bounds;
    const initialSearchFormValues = {
      location: locationFieldsPresent
        ? {
            search: address,
            selectedPlace: { address, origin, bounds },
          }
        : null,
    };
    

    const classes = classNames(rootClassName || css.root, className);

    const search = (
      <TopbarSearchForm
        className={css.heroSearchLink}
        desktopInputRoot={css.topbarSearchWithLeftPadding}
        onSubmit={this.handleSubmit}
        initialValues={initialSearchFormValues}
      />
    );
    return (
      <div className={classes}>
        <div className={css.heroContent}>
          <h1 className={css.heroMainTitle}>
            <FormattedMessage id="SectionHero.title" />
          </h1>
          <h2 className={css.heroSubTitle}>
            <FormattedMessage id="SectionHero.subTitle" />
          </h2>
          <div id="searchFieldWrapper" className={css.searchFieldWrapper}>
            {search}
            <NamedLink
              name="SearchPage"
              to={{
                search:
                  'address=Sverige&bounds=66.92051817%2C27.09540066%2C55.02371294%2C6.64228397',
              }}
              className={css.heroButton}
            >
              <FormattedMessage id="SectionHero.browseButton" />
            </NamedLink>
          </div>
          
        </div>
      </div>
    );
  }
  
}

SectionHero.defaultProps = { rootClassName: null, className: null };

SectionHero.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionHero;
