import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { pathByRouteName } from '../../util/routes';
import routeConfiguration from '../../routeConfiguration';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  InlineTextButton,
  Logo,
} from '../../components';

import css from './LoadableComponentErrorBoundary.module.css';

export const LoadableComponentErrorBoundaryPage = () => {
  const landingPagePath = pathByRouteName('LandingPage', routeConfiguration());
  const handleOnClick = () => {
    if (typeof window !== 'undefined') {
      window.location = landingPagePath;
    }
  };

  const landingPageLink = (
    <InlineTextButton onClick={handleOnClick}>
      <FormattedMessage id="LoadableComponentErrorBoundaryPage.landingPageLink" />
    </InlineTextButton>
  );

  return (
    <div>
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          {' '}
          <div className={css.topbar}>
            <InlineTextButton onClick={handleOnClick}>
              <Logo className={css.logoMobile} format="mobile" />
              <Logo className={css.logoDesktop} format="desktop" />
            </InlineTextButton>
          </div>
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>
          <div className={css.root}>
            <div className={css.content}>
              <div className={css.number}>404</div>
              <h1 className={css.heading}>
                <FormattedMessage id="LoadableComponentErrorBoundaryPage.heading" />
              </h1>
              <p className={css.description}>
                <FormattedMessage
                  id="LoadableComponentErrorBoundaryPage.description"
                  values={{ link: landingPageLink }}
                />
              </p>
            </div>
          </div>
        </LayoutWrapperMain>
      </LayoutSingleColumn>
    </div>
  );
};
