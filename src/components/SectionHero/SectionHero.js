import React from 'react';
import { string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { NamedLink } from '../../components';

import css from './SectionHero.module.css';

import yogaImage from './images/yoga.jpg';
import ptImage from './images/pt.jpg';
import coWorkImage from './images/cowork.jpg';
import nailsImage from './images/nails.jpg';
import tattoImage from './images/tatto.jpg';
import hairImage from './images/hair.jpg';

const SectionHero = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);
  const makeSpaceWork = <span className={css.bold}><FormattedMessage id="SectionHero.subTitleBold" /></span>;

  return (
    <div className={classes}>
      <div className={css.flexContainer}>
        <div className={css.heroTextContent}>
          <h1 className={css.heroMainTitle}>
            <FormattedMessage id="SectionHero.title" />
          </h1>
          <h2 className={css.heroSubTitle}>
            <FormattedMessage
              id="SectionHero.subTitle"
              values={{ subText: makeSpaceWork }}
            />
          </h2>
          <div className={css.heroButtonsContatiner}>
            <NamedLink
              name="SearchPage"
              to={{
                search:
                  'address=&bounds=59.49417013%2C4.15978193%2C49.54972301%2C-10.51994741', // slightly zoomed in UK map
                }}
              className={css.heroButtonPink}
            >
              <FormattedMessage id="SectionHero.browseButton" />
            </NamedLink>
            <NamedLink name="NewListingPage" className={css.heroButton} >
              <FormattedMessage id="SectionHero.listButton" />
            </NamedLink>
          </div>
        </div>
        <div className={css.heroImgContent}>
          {/* <div className={css.emptyMobileDiv} /> */}
          <div className={css.imgContainer}>
            <img src={nailsImage} alt='hotpatch make space work' className={css.image}/>
            <img src={yogaImage} alt='hotpatch make space work' className={css.image}/>
            <img src={ptImage} alt='hotpatch make space work' className={css.image}/>
            <img src={hairImage} alt='hotpatch make space work' className={css.image}/>
            <img src={coWorkImage} alt='hotpatch make space work' className={css.image}/>
            <img src={tattoImage} alt='hotpatch make space work' className={css.image}/>
          </div>
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
