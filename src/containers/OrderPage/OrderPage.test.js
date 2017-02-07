import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import OrderPage from './OrderPage';

describe('OrderPage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(<OrderPage params={{ id: 1234 }} tab="details" />);
    expect(tree).toMatchSnapshot();
  });
});
