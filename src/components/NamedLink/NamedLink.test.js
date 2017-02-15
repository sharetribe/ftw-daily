import React from 'react';
import { RoutesProvider } from '../index';
import { renderDeep } from '../../util/test-helpers';
import NamedLink from './NamedLink';

describe('NamedLink', () => {
  it('should contain correct link', () => {
    const id = 12;
    const routesConf = [
      { path: '/somepage/:id', name: 'SomePage', component: () => <div>blaa</div> },
    ];
    const tree = renderDeep(
      <RoutesProvider routes={routesConf}>
        <NamedLink name="SomePage" params={{ id }}>to SomePage</NamedLink>
      </RoutesProvider>,
    );
    expect(tree.type).toEqual('a');
    expect(tree.props.href).toEqual(`/somepage/${id}`);
    expect(tree.children).toEqual(['to SomePage']);
  });
});
