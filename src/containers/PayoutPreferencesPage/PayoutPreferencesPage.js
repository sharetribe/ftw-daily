import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import {
  Page,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
import { TopbarContainer } from '../../containers';

export const PayoutPreferencesPageComponent = props => {
  const { scrollingDisabled } = props;

  return (
    <Page title="Payout preferences" scrollingDisabled={scrollingDisabled}>
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>Content</LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </Page>
  );
};

const { bool } = PropTypes;

PayoutPreferencesPageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,
};

const mapStateToProps = state => {
  return {
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const PayoutPreferencesPage = compose(connect(mapStateToProps))(PayoutPreferencesPageComponent);

export default PayoutPreferencesPage;
