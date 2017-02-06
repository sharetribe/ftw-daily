import React from 'react';
import { renderTree } from '../../util/test-helpers';
import { LandingPageComponent } from './LandingPage';
import { RoutesProvider } from '../../components';
import routesConfiguration from '../../routesConfiguration';

describe('LandingPage', () => {
  it('matches snapshot', () => {
    const tree = renderTree(
      <RoutesProvider routes={routesConfiguration}>
        <LandingPageComponent onLocationChanged={v => v} />
      </RoutesProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
