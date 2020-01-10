import React from 'react';
import { string } from 'prop-types';

import css from './SectionVideoMaybe.css';

const SectionVideoMaybe = props => {
  const { video } = props;

  return video ? (
    <div className={css.sectionVideo}>
      <div className={css.iframeContainer}>
        <iframe
          title="Description video"
          className={css.iframe}
          src={video}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  ) : null;
};

SectionVideoMaybe.propTypes = {
  video: string,
};

export default SectionVideoMaybe;