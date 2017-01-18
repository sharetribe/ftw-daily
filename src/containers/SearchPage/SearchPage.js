import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Page } from '../../components';
import { addFlashNotification } from '../../ducks/FlashNotification';
import { addFilter } from './SearchPageDucks';

export const SearchPage = props => (
  <PageLayout title="Search page">
    <Link to="/l/Nice+studio-in-Helsinki-345">Nice studio in Helsinki</Link>
  </PageLayout>
);

/**
 * Container functions.
 */
const mapStateToProps = function mapStateToProps(state) {
  return state;
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    addNotice: msg => dispatch(addFlashNotification('notice', msg)),
    addFilter: (k, v) => dispatch(addFilter(k, v)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
