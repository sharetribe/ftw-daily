import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { shape, string, array } from 'prop-types';
import classNames from 'classnames';
import css from './ListingPage.module.css';


const SectionTagsMaybe = ({ className, rootClassName, publicData }) => {
  const classes = classNames(rootClassName || css.root, className);
  return publicData && publicData.tags ? (
    <div className={classes}>
      <h2 className={css.descriptionTitle}>
        <FormattedMessage id="ListingPage.rulesTitle" />
      </h2>
      <p className={css.rules}>{publicData.tags}</p>
    </div>
  ) : null;
};

SectionTagsMaybe.defaultProps = { className: null, rootClassName: null };

SectionTagsMaybe.propTypes = {
  className: string,
  rootClassName: string,
  publicData: shape({
    tags: array,
  }),
};

export default SectionTagsMaybe;
