import React from 'react';
import { BrowserRouter } from 'react-router';
import { RoutesProvider } from '../index';
import Routes from '../../Routes';
import NamedLink from './NamedLink';
import renderer from 'react-test-renderer';

describe('NamedLink', () => {
  it('should contain correct link', () => {
    const id = 12;
    const routesConf = [
      { pattern: '/somepage/:id', name: 'SomePage', component: () => <div>blaa</div> },
    ];
    const component = renderer.create(
      <BrowserRouter>
        <RoutesProvider routes={routesConf}>
          <NamedLink name="SomePage" params={{ id }}>to SomePage</NamedLink>
        </RoutesProvider>
      </BrowserRouter>,
    );
    const json = component.toJSON();
    expect(json.type).toEqual('a');
    expect(json.props.href).toEqual(`/somepage/${id}`);
    expect(json.children).toEqual(['to SomePage']);
  });
});
