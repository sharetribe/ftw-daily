import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { PropertyGroup } from '../../components';

import css from './ListingPage.module.css';

const SectionTypeLocationMaybe = (props) => {
  const { options, publicData } = props;
  if (!publicData || !publicData.typeLocation || publicData.typeLocation.length === 0) {
    return null;
  }

  const selectedOptions = publicData && publicData.typeLocation ? publicData.typeLocation : [];
  return (
    <div className={css.sectionFeatures}>
      <h2 className={css.featuresTitle}>
        <FormattedMessage id="ListingPage.typeLocationTitle" />
      </h2>
      <PropertyGroup
        id="ListingPage.typeLocation"
        options={options}
        selectedOptions={selectedOptions}
        twoColumns={true}
      />
    </div>
  );
};

export default SectionTypeLocationMaybe;
