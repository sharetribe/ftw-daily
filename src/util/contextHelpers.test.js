import React, { PropTypes } from 'react';
import { PageLayout, RoutesProvider } from '../components';
import routesConfiguration from '../routesConfiguration';
import { flattenRoutes } from './routes';
import { renderDeep, renderShallow } from './test-helpers';
import * as propTypes from './propTypes';
import { withFlattenedRoutes, withTogglePageClasses } from './contextHelpers';

const { arrayOf, func } = PropTypes;

describe('util/contextHelpers.js', () => {
  describe('withFlattenedRoutes', () => {
    it('should inject the provided routes', () => {
      const CompComp = props => <div>{props.flattenedRoutes[0].name}</div>;
      CompComp.propTypes = { flattenedRoutes: arrayOf(propTypes.route).isRequired };
      const Comp = withFlattenedRoutes(CompComp);
      const routes = [{ name: 'SomePage', path: 'some-page', component: () => null }];
      const shallowTree = renderShallow(
        <RoutesProvider flattenedRoutes={routes}>
          <Comp />
        </RoutesProvider>
      );
      expect(shallowTree).toMatchSnapshot();
      const deepTree = renderDeep(
        <RoutesProvider flattenedRoutes={routes}>
          <Comp />
        </RoutesProvider>
      );
      expect(deepTree).toMatchSnapshot();
    });
  });

  describe('withTogglePageClasses', () => {
    it('should inject the provided function', () => {
      const CompComp = props => <div>{typeof props.togglePageClasses}</div>;
      CompComp.propTypes = { togglePageClasses: func.isRequired };
      const Comp = withTogglePageClasses(CompComp);

      const deepTree = renderDeep(
        <RoutesProvider flattenedRoutes={flattenRoutes(routesConfiguration)}>
          <PageLayout title="testing withTogglePageClasses">
            <Comp />
          </PageLayout>
        </RoutesProvider>
      );
      expect(deepTree).toMatchSnapshot();
    });
  });
});
