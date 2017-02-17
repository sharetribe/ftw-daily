import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderShallow, renderDeep } from '../../util/test-helpers';
import { NotFoundPageComponent } from './NotFoundPage';

describe('NotFoundPage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(<NotFoundPageComponent />);
    expect(tree).toMatchSnapshot();
  });
});
