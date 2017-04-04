import React from 'react';
import { fakeIntl } from '../../util/test-data';
import { renderDeep } from '../../util/test-helpers';
import { ModalInMobileComponent } from './ModalInMobile';

describe('ModalInMobile', () => {
  it('no extra classes when window is missing', () => {
    const props = {
      className: 'test-class-from-props',
      intl: fakeIntl,
      isModalOpenOnMobile: false,
      togglePageClassNames: v => v,
    };

    const tree = renderDeep(<ModalInMobileComponent {...props}>Content</ModalInMobileComponent>);
    expect(tree).toMatchSnapshot();
  });
});
