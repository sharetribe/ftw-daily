import React from 'react';
import { array, shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import css from './ListingPage.css';

const SectionServiceType = props => {
  const { serviceType } = props;

  const { serviceTypeCategory } = serviceType;

  return  (
    <div className={css.sectionDescription}>
      <h2 className={css.descriptionTitle}>
        <FormattedMessage id="ListingPage.serviceTypeTitle" />
      </h2>
      <p className={css.description}>{serviceTypeCategory.label}</p>
    </div>
  )
};

SectionServiceType.propTypes = {
  serviceType: shape({
    title: string,
    serviceTypeCategory: object,
  }).isRequired,
};

export default SectionCapacity;
