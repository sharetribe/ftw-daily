import React from 'react';
import { FormattedMessage } from 'react-intl';
import { PropertyGroup } from '../../components';

import css from './ListingPage.css';

const SectionFeaturesMaybe = props => {
  const { options, publicData } = props;
  const { options1, options2, options3 } = options;
  if (!publicData) {
    return null;
  }

  const selectedOptions1 = publicData && publicData.service ? publicData.service : [];
  const selectedOptions2 = publicData && publicData.amenities ? publicData.amenities : [];

  const selectedOptions3 = selectedOptions2 ? (typeof (publicData.dog) == 'string' ? [publicData.dog] : publicData.dog) : [];

  return (
    <div>
      {
        publicData.user_type === 2 ?
          (
            <div className={css.sectionFeatures}>
              <h2 className={css.featuresTitle}>
                <FormattedMessage id="ListingPage.serviceTitle" />
              </h2>
              <PropertyGroup
                id="ListingPage.service"
                options={options1}
                selectedOptions={selectedOptions1}
                twoColumns={true}
                flag={3}
                publicData={publicData}

              />
            </div>
          )
          : null
      }
      <div className={css.sectionFeatures}>
        <h2 className={css.featuresTitle}>
          <FormattedMessage id="ListingPage.featuresTitle" />
        </h2>
        <PropertyGroup
          id="ListingPage.amenities"
          options={options2}
          selectedOptions={selectedOptions2}
          twoColumns={true}
          flag={3}
          publicData={publicData}

        />
      </div>

      <div className={css.sectionFeatures}>
        <h2 className={css.featuresTitle}>
          <FormattedMessage id="ListingPage.sizeTitle" />
        </h2>
        <PropertyGroup
          id="ListingPage.size"
          options={options3}
          selectedOptions={selectedOptions3}
          twoColumns={true}
          flag={3}
          publicData={publicData}

        />
      </div>
    </div>
  );
};

export default SectionFeaturesMaybe;
