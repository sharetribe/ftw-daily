import React from 'react';
import { FormattedMessage } from 'react-intl';
import { PropertyGroup } from '../../components';

import css from './ListingPage.css';

const SectionHomeMaybe = props => {
  const { options, publicData } = props;
  const { options1,options2,options3} = options;
  if (!publicData) {
    return null;
  }
 
  const selectedOptions1 = publicData && publicData.equipments ? publicData.equipments : [];
  const selectedOptions2 = publicData && publicData.locations ? publicData.locations : []; 
  const selectedOptions3 = publicData && publicData.info ? publicData.info : [];
  return (
    <div className={css.sectionFeatures}>
    {
      publicData.user_type=== 0?
      (
        <div>
          <h2 className={css.featuresTitle}>
            <FormattedMessage id="ListingPage.homeTitle" />
          </h2>
          <PropertyGroup
            id="ListingPage.equipment"
            options={options1}
            selectedOptions={selectedOptions1}
            twoColumns={true}
            publicData = {publicData}
            flag = {false}
          />
          <PropertyGroup
            id="ListingPage.location"
            options={options2}
            selectedOptions={selectedOptions2}
            twoColumns={true}
            publicData = {publicData}
            flag = {2}
          />
        </div>
      ):publicData.user_type === 1?
      (
        <div>
          <h2 className={css.featuresTitle}>
            <FormattedMessage id="ListingPage.usefulTitle" />
          </h2>
          <PropertyGroup
              id="ListingPage.info"
              options={options3}
              selectedOptions={selectedOptions3}
              twoColumns={true}
              publicData = {publicData}
              flag = {false}
            />
        </div>
      ):null
    }
    </div>
  );
};

export default SectionHomeMaybe;
