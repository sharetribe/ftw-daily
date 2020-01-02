import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { NamedLink } from '../../../components';
import css from './PartnersPageHero.css';
import * as animationData from '../../../assets/oogo-animation';
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
          <FormattedMessage id={'PartnersPageHero.title'} />
        </h1>
        <h2 className={css.heroSubTitle}>
          <FormattedMessage id="PartnersPageHero.subTitle" />
        </h2>
        <section>
          <h1>
            <FormattedMessage id="PartnersPageHero.becomeAPartner" />
          </h1>
          <ul className={css.heroLinksList}>
            <li>
              <a className={css.heroButton}>
                <FormattedMessage id="PartnersPageHero.hospitalityPartner" />
              </a>
            </li>
            <li>
              <a className={css.heroButton}>
                <FormattedMessage id="PartnersPageHero.corporatePartner" />
              </a>
            </li>
          </ul>
          <h1>
            <FormattedMessage id="PartnersPageHero.alreadyAPartner" />
          </h1>
          <ul className={css.heroLinksList}>
            <li>
              <NamedLink name="LoginPage" className={css.heroButton}>
                <FormattedMessage id="PartnersPageHero.login" />
              </NamedLink>
            </li>
          </ul>
        </section>
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
