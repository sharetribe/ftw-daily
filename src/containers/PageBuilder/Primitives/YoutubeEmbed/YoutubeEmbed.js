import React from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';

import { AspectRatioWrapper } from '../../../../components/index.js';

import css from './YoutubeEmbed.module.css';

const RADIX = 10;

export const YoutubeEmbed = React.forwardRef((props, ref) => {
  const { className, rootClassName, youtubeVideoId, aspectRatio } = props;
  const hasSlash = aspectRatio.indexOf('/') > 0;
  const [aspectWidth, aspectHeight] = hasSlash ? aspectRatio.split('/') : [16, 9];
  const width = Number.parseInt(aspectWidth, RADIX);
  const height = Number.parseInt(aspectHeight, RADIX);
  const classes = classNames(rootClassName || css.video, className);

  return (
    <AspectRatioWrapper className={classes} width={width} height={height}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}`}
        className={css.iframe}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </AspectRatioWrapper>
  );
});

YoutubeEmbed.displayName = 'YoutubeEmbed';

YoutubeEmbed.defaultProps = {
  rootClassName: null,
  className: null,
  aspectRatio: '16/9',
};

YoutubeEmbed.propTypes = {
  rootClassName: string,
  className: string,
  youtubeVideoId: string.isRequired,
  aspectRatio: string,
};
