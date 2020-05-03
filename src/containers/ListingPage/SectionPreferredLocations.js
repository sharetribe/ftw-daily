import React from 'react';
import { FormattedMessage } from 'react-intl';
import { PropertyGroup } from '../../components';

import css from './ListingPage.css';

const SectionPreferredLocations = props => {
  const { publicData, preferredLocations } = props;
  if (!preferredLocations || !publicData) {
    return null;
  }

  const createPrefLocation = () => {
    let pref = [];
    preferredLocations.map(function(location) {
      pref.push(<div className={css.prefLocationBadge}>{location}</div>);
    });
    return pref;
  };

  return (
    <div className={css.sectionFeatures}>
      {publicData.user_type === 1 ? (
        <h2 className={css.featuresTitle}>
          <span>Preferred Locations</span>
          <p>{createPrefLocation()}</p>
        </h2>
      ) : // <div>
      //   <h2 className={css.featuresTitle}>
      //     <FormattedMessage id="ListingPage.homeTitle" />
      //   </h2>
      //   <PropertyGroup
      //     id="ListingPage.equipment"
      //     options={options1}
      //     selectedOptions={selectedOptions1}
      //     twoColumns={true}
      //     publicData={publicData}
      //     flag={false}
      //   />
      //   <PropertyGroup
      //     id="ListingPage.location"
      //     options={options2}
      //     selectedOptions={selectedOptions2}
      //     twoColumns={true}
      //     publicData={publicData}
      //     flag={2}
      //   />
      // </div>
      // publicData.user_type === 1 ? (
      //   <div>1</div>
      // ) : // <div>
      //   <h2 className={css.featuresTitle}>
      //     <FormattedMessage id="ListingPage.usefulTitle" />
      //   </h2>
      //   <PropertyGroup
      //     id="ListingPage.info"
      //     options={options3}
      //     selectedOptions={selectedOptions3}
      //     twoColumns={true}
      //     publicData={publicData}
      //     flag={false}
      //   />
      // </div>
      null}
    </div>
  );
};

export default SectionPreferredLocations;
