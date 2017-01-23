import React from 'react';
import RouterProvider from './RouterProvider';
import renderer from 'react-test-renderer';

describe('RouterProvider', () => {
  it('should contain routes from context', () => {
    const router = { name: 'router in context' };
    const Child = (props, context) => {
      return <div>{context.router.name}</div>;
    };
    Child.contextTypes = { router: React.PropTypes.object };

    const rendered = renderer
      .create(<RouterProvider router={router}><Child /></RouterProvider>)
      .toJSON();
    expect(rendered.children).toContain('router in context');
  });
});
