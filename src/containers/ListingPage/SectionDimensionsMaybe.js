import React from 'react';
import { FormattedMessage } from 'react-intl';
import { richText } from '../../util/richText';

import css from './ListingPage.css';

const MIN_LENGTH_FOR_LONG_WORDS_IN_DESCRIPTION = 20;

const SectionDimensionsMaybe = props => {
  const { publicData } = props;

  const maximumDepth = publicData.maximumDepth;
  const minimumDepth = publicData.minimumDepth;
  const length = publicData.length;
  const width = publicData.width;
  
  return (
    <div className={css.sectionDescription}>
      <h2 className={css.descriptionTitle}>
        <FormattedMessage id="ListingPage.dimensionsTitle" />
      </h2>
      <div className={css.dimensionsRow}>
        <div className={css.dimensionsCell}>
          <p className={css.description}><b><FormattedMessage id="Pool.width" />:</b> {width}m</p>
        </div>
        <p className={css.description}><b><FormattedMessage id="Pool.length" />:</b> {length}m</p>
      </div>
      <div className={css.dimensionsRow}>
        <div className={css.dimensionsCell}>
          <p className={css.description}><b><FormattedMessage id="Pool.minimumDepth" />:</b> {minimumDepth}m</p>
        </div>
        <p className={css.description}><b><FormattedMessage id="Pool.maximumDepth" />:</b> {maximumDepth}m</p>
      </div>
    </div>
  );
};

export default SectionDimensionsMaybe;
