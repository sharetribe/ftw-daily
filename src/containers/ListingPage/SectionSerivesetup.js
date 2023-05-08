import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { PropertyGroup } from '../../components';

import css from './ListingPage.module.css';

const SectionServicesetup = props => {
  const { options, publicData ,hostLink} = props;
  if (!publicData) {
    return null;
  }

  const selectedOptions = publicData && publicData.serviceSetup ? publicData.serviceSetup : [];
  return (
    <div className={css.sectionFeatures}>
      <h2 className={css.featuresTitle}>
        <FormattedMessage id="ListingPage.featuresserviceSetup"/>
        {/* <FormattedMessage id="BookingPanel.servicetect" values={{ name: hostLink }} /> */}
      </h2>
      <PropertyGroup
        id="ListingPage.typeOfPets"
        options={options}
        selectedOptions={selectedOptions}
        twoColumns={true}
      />
    </div>
  );
};

export default SectionServicesetup;
