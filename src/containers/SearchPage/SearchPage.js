import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { PageLayout } from '../../components';
import { addFlashNotification } from '../../ducks/FlashNotification.ducks';
import { addFilter } from './SearchPage.ducks';

export const SearchPageComponent = () => (
  <PageLayout title="Search page">
    <Link to="/l/Nice+studio-in-Helsinki-345">Nice studio in Helsinki</Link>
  </PageLayout>
);

/**
 * Container functions.
 * Since we add this to global store state with combineReducers, this will only get partial state
 * which is page specific.
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchPageComponent)
