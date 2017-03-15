import React, { PropTypes } from 'react';
import { RoutesProvider } from '../components';
import { renderDeep, renderShallow } from './test-helpers';
import * as propTypes from './propTypes';
import { withFlattenedRoutes } from './routes';

const { arrayOf } = PropTypes;

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
