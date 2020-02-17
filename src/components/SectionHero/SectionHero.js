import React from 'react';
import { string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { NamedLink } from '../../components';

import css from './SectionHero.css';

const SectionHero = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.heroContent}>
        <h1 className={css.heroMainTitle}>
          <FormattedMessage id="SectionHero.title" />
        </h1>
        <h2 className={css.heroSubTitle}>
          <FormattedMessage id="SectionHero.subTitle" />
        </h2>
        <div className={css.heroButtonsWrapper}>
          <NamedLink
            name="SearchPage"
            to={{
              search:
                'address=Schweiz&bounds=47.808453%2C10.492064%2C45.817981%2C5.955902',
            }}
            className={css.heroButton}
          >
            <span className={css.heroText}>
              <FormattedMessage id="SectionHero.browseButton" />
            </span>
          </NamedLink>
         {/* 
          <NamedLink
            name="NewListingPage"
            className={`${css.heroButton} ${css.heroButtonSecodary}`}
          >
            <FormattedMessage id="TopbarDesktop.createListingSecondary" />
          </NamedLink> */}

        </div>
        
      </div>
    </div>
  );
};

SectionHero.defaultProps = { rootClassName: null, className: null };

SectionHero.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionHero;
