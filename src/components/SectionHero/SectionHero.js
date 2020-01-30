import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { NamedLink } from '../../components';
import css from './SectionHero.css';
import * as animationData from '../../assets/oogo-animation';
import Lottie from 'react-lottie';

class LottieWrapper extends PureComponent {
  LOTTIE_OPTIONS = {
    autoplay: false,
    loop: false,
    animationData,
    renderer: 'svg',
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
      progressiveLoad: true,
    },
  };
  render() {
    return <Lottie options={this.LOTTIE_OPTIONS} isClickToPauseDisabled />;
  }
}

const SectionHero = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.heroContent}>
        <h1 className={css.heroMainTitle}>
          <FormattedMessage id="SectionHero.title" />
        </h1>
        <h2 className={css.heroSubTitle}>
          <FormattedMessage id="SectionHero.subTitle" />
        </h2>
        <NamedLink
          name="SearchPage"
          // to={{
          //   search:
          //     // 'address=Finland&bounds=70.0922932%2C31.5870999%2C59.693623%2C20.456500199999937',
          // }}
          className={css.heroButton}
        >
          <FormattedMessage id="SectionHero.browseButton" />
        </NamedLink>
        <div className={css.heroVideoContainer}>
          <LottieWrapper />
        </div>
      </div>
    </div>
  );
};

SectionHero.defaultProps = { rootClassName: null, className: null };

SectionHero.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionHero;
