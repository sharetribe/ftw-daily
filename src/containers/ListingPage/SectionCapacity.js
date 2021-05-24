import React from 'react';
import { shape, string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';

import css from './ListingPage.module.css';

const SectionCapacity = props => {
  const { publicData } = props;
  const capacity = publicData.capacity;
  const shouldRender = !!(capacity && capacity > 1);

  return shouldRender ? (
    <div className={css.sectionCapacity}>
      <h2 className={css.capacityTitle}>
        <FormattedMessage id="ListingPage.capacityTitle" />
      </h2>
      <p className={css.capacity}>{capacity}</p>
    </div>
  ) : null;
};

SectionCapacity.propTypes = {
  publicData: shape({
    capacity: string,
  }).isRequired,
};

export default SectionCapacity;
