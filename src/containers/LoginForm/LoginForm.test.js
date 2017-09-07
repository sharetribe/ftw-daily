import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import { RoutesProvider } from '../../components';
import routesConfiguration from '../../routesConfiguration';
import { flattenRoutes } from '../../util/routes';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('matches snapshot', () => {
    const flattenedRoutes = flattenRoutes(routesConfiguration);
    const tree = renderDeep(
      <RoutesProvider flattenedRoutes={flattenedRoutes}>
        <LoginForm />
      </RoutesProvider>
    );
    expect(tree).toMatchSnapshot();
  });
});
