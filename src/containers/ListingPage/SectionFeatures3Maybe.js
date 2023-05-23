import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { PropertyGroup } from '../../components';

import css from './ListingPage.module.css';

const SectionFeatures3Maybe = props => {
  const { options, publicData } = props;
  if (!publicData) {
    return null;
  }

  const selectedOptions = publicData && publicData.typeOfPets ? publicData.sizeOfdogs : [];
  return (
    <div className={css.sectionFeatures}>
   { selectedOptions?  <h2 className={css.featuresTitle}>
        <FormattedMessage id="ListingPage.featuressizedogs" />
      </h2>:null}
      <PropertyGroup
        id="ListingPage.typeOfPets"
        options={options}
        selectedOptions={selectedOptions}
        twoColumns={true}
      />
    </div>
  );
};

export default SectionFeatures3Maybe;
