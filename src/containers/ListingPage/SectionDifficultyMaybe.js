import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { PropertyGroup } from '../../components';

import css from './ListingPage.module.css';

const SectionDifficultyMaybe = props => {
  const { options, publicData } = props;
  if (!publicData || !publicData.difficulty || publicData.difficulty.length === 0) {
    return null;
  }

  const selectedOptions = publicData && publicData.difficulty ? publicData.difficulty : [];
  return (
    <div className={css.sectionFeatures}>
      <h2 className={css.featuresTitle}>
        <FormattedMessage id="ListingPage.difficultyTitle" />
      </h2>
      <PropertyGroup
        id="ListingPage.difficulty"
        options={options}
        selectedOptions={selectedOptions}
        twoColumns={true}
      />
    </div>
  );
};

export default SectionDifficultyMaybe;
