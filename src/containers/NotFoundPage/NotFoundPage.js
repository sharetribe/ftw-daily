import React, { Component, PropTypes } from 'react'; // eslint-disable-line react/no-deprecated
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import routeConfiguration from '../../routeConfiguration';
import { createResourceLocatorString } from '../../util/routes';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { Page } from '../../components';
import { LocationSearchForm, TopbarContainer } from '../../containers';

import css from './NotFoundPage.css';

export class NotFoundPageComponent extends Component {
  componentWillMount() {
    // The StaticRouter component used in server side rendering
    // provides the context object. We attach a `notfound` flag to
    // the context to tell the server to change the response status
    // code into a 404.
    this.props.staticContext.notfound = true;
  }

  render() {
    const {
      authInfoError,
      history,
      logoutError,
      intl,
      scrollingDisabled,
    } = this.props;

    const title = intl.formatMessage({
      id: 'NotFoundPage.title',
    });

    const handleSearchSubmit = values => {
      const { search, selectedPlace } = values.location;
      const { origin, bounds, country } = selectedPlace;
      const searchParams = { address: search, origin, bounds, country };
      history.push(
        createResourceLocatorString('SearchPage', routeConfiguration(), {}, searchParams)
      );
    };

    return (
      <Page
        authInfoError={authInfoError}
        logoutError={logoutError}
        title={title}
        scrollingDisabled={scrollingDisabled}
      >
        <TopbarContainer />
        <div className={css.root}>
          <div className={css.content}>
            <div className={css.number}>404</div>
            <h1 className={css.heading}>
              <FormattedMessage id="NotFoundPage.heading" />
            </h1>
            <p className={css.description}>
              <FormattedMessage id="NotFoundPage.description" />
            </p>
            <LocationSearchForm className={css.searchForm} onSubmit={handleSearchSubmit} />
          </div>
        </div>
      </Page>
    );
  }
}

NotFoundPageComponent.defaultProps = {
  authInfoError: null,
  logoutError: null,
  staticContext: {},
};

const { bool, func, instanceOf, object, shape } = PropTypes;

NotFoundPageComponent.propTypes = {
  authInfoError: instanceOf(Error),
  logoutError: instanceOf(Error),
  scrollingDisabled: bool.isRequired,

  // context object from StaticRouter, injected by the withRouter wrapper
  staticContext: object,

  // from injectIntl
  intl: intlShape.isRequired,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => {
  // Page needs authInfoError and logoutError
  const { authInfoError, logoutError } = state.Auth;
  return {
    authInfoError,
    logoutError,
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const NotFoundPage = compose(connect(mapStateToProps), withRouter, injectIntl)(
  NotFoundPageComponent
);

export default NotFoundPage;
