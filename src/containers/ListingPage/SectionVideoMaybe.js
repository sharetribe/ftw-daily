import React from 'react';
import { shape, string } from 'prop-types';

import css from './SectionVideoMaybe.css';

const SectionVideoMaybe = props => {
  const { publicData } = props;

  return publicData && publicData.video ? (
    <div className={css.sectionVideo}>
      <div className={css.iframeContainer}>
        <iframe
          title="Description video"
          className={css.iframe}
          src={publicData.video}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  ) : null;
};

SectionVideoMaybe.propTypes = {
  publicData: shape({
    video: string,
  }),
};

export default SectionVideoMaybe;