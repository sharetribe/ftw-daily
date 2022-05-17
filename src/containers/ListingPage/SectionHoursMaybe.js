import React from 'react'
import { FormattedMessage } from '../../util/reactIntl';
import { shape, string, array } from 'prop-types';
import classNames from 'classnames';
import css from './ListingPage.module.css';

const SectionHoursMaybe = ({ className, rootClassName, publicData }) => {
    const classes = classNames(rootClassName || css.root, className);
    return publicData && publicData.hours ? (
      <div className={classes}>
        <h2 className={css.descriptionTitle}>
          <FormattedMessage id="ListingPage.hoursTitle" />
        </h2>
        <p className={css.rules}>{publicData.hours}</p>
      </div>
    ) : null;
}


SectionHoursMaybe.defaultProps = { className: null, rootClassName: null };

SectionHoursMaybe.propTypes = {
  className: string,
  rootClassName: string,
  publicData: shape({
    tags: array,
  }),
};

export default SectionHoursMaybe