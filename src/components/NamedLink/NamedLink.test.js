import React from 'react';
import { RoutesProvider } from '../index';
import { renderShallow, renderDeep } from '../../util/test-helpers';
import NamedLink, { NamedLinkComponent } from './NamedLink';

describe('NamedLinkComponent', () => {
  it('should mark the link as active if the current URL matches', () => {
    const routesConf = [
      { path: '/a', name: 'APage', component: () => null },
      { path: '/b', name: 'BPage', component: () => null },
    ];
    const activeClassName = 'my-active-class';
    const aProps = {
      name: 'APage',
      activeClassName,
      flattenedRoutes: routesConf,
      match: { url: '/a' },
    };
    const bProps = {
      name: 'BPage',
      activeClassName,
      flattenedRoutes: routesConf,
      match: { url: '/a' },
    };
    const tree = renderDeep(
      <div>
        <NamedLinkComponent {...aProps}>link to a</NamedLinkComponent>
        <NamedLinkComponent {...bProps}>link to b</NamedLinkComponent>
      </div>,
    );
    const aLink = tree.children[0];
    const bLink = tree.children[1];
    expect(aLink.type).toEqual('a');
    expect(bLink.type).toEqual('a');
    expect(aLink.props.className).toEqual(activeClassName);
    expect(bLink.props.className).toEqual('');
  });
});

describe('NamedLink', () => {
  it('should contain correct link', () => {
    const id = 12;
    const routesConf = [
      { path: '/somepage/:id', name: 'SomePage', component: () => <div>blaa</div> },
    ];
    const tree = renderDeep(
      <RoutesProvider flattenedRoutes={routesConf}>
        <NamedLink name="SomePage" params={{ id }}>to SomePage</NamedLink>
      </RoutesProvider>,
    );
    expect(tree.type).toEqual('a');
    expect(tree.props.href).toEqual(`/somepage/${id}`);
    expect(tree.children).toEqual(['to SomePage']);
  });
});
