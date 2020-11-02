import React from 'react';
import { string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { NamedLink } from '../../components';

import css from './SectionHero.css';

// import mobileImage from './images/heroMobile.png';

const SectionHero = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);
  const makeSpaceWork = <span className={css.bold}><FormattedMessage id="SectionHero.subTitleBold" /></span>;

  return (
    <div className={classes}>
      <div className={css.heroContent}>
        <h1 className={css.heroMainTitle}>
          <FormattedMessage id="SectionHero.title" />
        </h1>
        <h2 className={css.heroSubTitle}>
          <FormattedMessage
            id="SectionHero.subTitle"
            values={{ subText: makeSpaceWork }}
          />
        </h2>
        <div className={css.heroButtonsContatiner}>
          <NamedLink
            name="SearchPage"
            to={{
              search:
                'address=&bounds=59.49417013%2C4.15978193%2C49.54972301%2C-10.51994741', // slightly zoomed in UK map
              }}
            className={css.heroButtonPink}
          >
            <FormattedMessage id="SectionHero.browseButton" />
          </NamedLink>
          <NamedLink name="NewListingPage" className={css.heroButton} >
            <FormattedMessage id="SectionHero.listButton" />
          </NamedLink>
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
