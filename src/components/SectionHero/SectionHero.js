import React from 'react';
import { string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { NamedLink } from '../../components';

import css from './SectionHero.css';

const SectionHero = props => {
  const { rootClassName, className, userType } = props;

  const classes = classNames(rootClassName || css.root, className);
  const browserButtonMessageId = userType === 'p' ? 'SectionHero.browseImporterButton' : 'SectionHero.browseButton';
  return (
    <div className={classes}>
      <div className={css.heroContent}>
        <h1 className={css.heroMainTitle}>
          <FormattedMessage id="SectionHero.title" />
        </h1>
        <h2 className={css.heroSubTitle}>
          <FormattedMessage id="SectionHero.subTitle" />
        </h2>
        <NamedLink
          name="SearchPage"
          to={{
            search:
              's?address=Italy&bounds=43.769562%2C11.255814%2C41.773540%2C12.239712',
          }}
          className={css.heroButton}
        >
          <FormattedMessage id={browserButtonMessageId} />
        </NamedLink>
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
