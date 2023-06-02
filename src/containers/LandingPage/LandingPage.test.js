import React from 'react';
import { fakeIntl } from '../../util/test-data';
import { renderShallow } from '../../util/test-helpers';
import { LandingPageComponent } from './LandingPage';

describe('LandingPage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(<LandingPageComponent intl={fakeIntl} pageAssetsData={{}} />);
    expect(tree).toMatchSnapshot();
  });
});
