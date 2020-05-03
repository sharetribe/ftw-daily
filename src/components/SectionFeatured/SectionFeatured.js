import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';
import includes from 'lodash/includes';
import ReactTooltip from 'react-tooltip';

import { NamedLink } from '../../components';

import css from './SectionFeatured.css';

import featuredOne from './images/featuredOne.jpg';
import featuredTwo from './images/featuredTwo.jpg';
import featuredThree from './images/featuredThree.jpg';
import yoti from './images/yoti.png';
import yotismall from './images/yotismall.png';
import verified from './images/verified.png';

class LocationImage extends Component {
  render() {
    const { alt, ...rest } = this.props;
    return <img alt={alt} {...rest} />;
  }
}

const LazyImage = lazyLoadWithDimensions(LocationImage);
const locationLink = (
  name,
  image,
  searchQuery,
  categoryOne,
  categoryTwo,
  categoryThree,
  categoryFour,
  badge,
  id,
  slug,
  tipId
) => {
  const nameText = <span className={css.locationName}>{name}</span>;
  const featuredText = <span className={css.locationName}>{categoryOne}</span>;
  const featuredTextTwo = <span className={css.locationName}>{categoryTwo}</span>;
  const featuredTextThree = <span className={css.locationName}>{categoryThree}</span>;
  const featuredTextFour = <span className={css.locationName}>{categoryFour}</span>;

  return (
    <NamedLink name="ListingPage" params={{ id, slug }} className={css.location}>

      <div className={css.imageWrapper}>
        <div className={css.aspectWrapper} id="wrapperAspect">
          <LazyImage src={image} alt={name} className={css.locationImage} />
          <div className={css.categoryBadge}>
            <FormattedMessage id="SectionFeatured.featuredBadge" values={{ badge }} />
          </div>
        </div>
        <div className={css.linkText} id="textLink">
          <div className={css.featuredL}>
            <div className={css.nameYoti}>
              <FormattedMessage
                id="SectionFeatured.listingsInFeatured"
                values={{ location: nameText }}
              />
            </div>

      <div className={css.nameYoti}>
        <NamedLink name="YotiPage"><img data-tip data-for={tipId} className={css.yotiImg} src={yoti} /></NamedLink>
      </div>

      <ReactTooltip className={css.customTip} effect='solid' id={tipId}>
        <span className={css.tipColor}>  
        Verified by YOTI <img className={css.verifiedImg} src={verified} />
        </span>
      </ReactTooltip>

        </div>

          <div className={css.featuredR}>
            <div className={css.featuredSorting}>
              <div className={css.featuredSortingCat}>
                <span className={css.iconWrapper}>
                  <svg
                    width="9"
                    height="9"
                    xmlns="http://www.w3.org/2000/svg"
                    className={css.checkIcon}
                  >
                    <path
                      className={css.marketplaceFill}
                      d="M2.636621 7.7824771L.3573694 5.6447948c-.4764924-.4739011-.4764924-1.2418639 0-1.7181952.4777142-.473901 1.251098-.473901 1.7288122 0l1.260291 1.1254783L6.1721653.505847C6.565577-.0373166 7.326743-.1636902 7.8777637.227582c.5473554.3912721.6731983 1.150729.2797866 1.6951076L4.4924979 7.631801c-.2199195.306213-.5803433.5067096-.9920816.5067096-.3225487 0-.6328797-.1263736-.8637952-.3560334z"
                      fillRule="evenodd"
                    />
                  </svg>
                </span>

                <span className={css.featuredCategories}>
                  <FormattedMessage
                    id="SectionFeatured.listingsInFeaturedCat"
                    values={{ featuredcategory: featuredText }}
                  />
                </span>
              </div>

              <div className={css.featuredSortingCat}>
                <span className={css.featuredCategories}>
                  <span className={css.iconWrapper}>
                    <svg
                      width="9"
                      height="9"
                      xmlns="http://www.w3.org/2000/svg"
                      className={css.checkIcon}
                    >
                      <path
                        className={css.marketplaceFill}
                        d="M2.636621 7.7824771L.3573694 5.6447948c-.4764924-.4739011-.4764924-1.2418639 0-1.7181952.4777142-.473901 1.251098-.473901 1.7288122 0l1.260291 1.1254783L6.1721653.505847C6.565577-.0373166 7.326743-.1636902 7.8777637.227582c.5473554.3912721.6731983 1.150729.2797866 1.6951076L4.4924979 7.631801c-.2199195.306213-.5803433.5067096-.9920816.5067096-.3225487 0-.6328797-.1263736-.8637952-.3560334z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </span>

                  <FormattedMessage
                    id="SectionFeatured.listingsInFeaturedCat"
                    values={{ featuredcategory: featuredTextTwo }}
                  />
                </span>
              </div>

              <div className={css.featuredSortingCat}>
                <span className={css.iconWrapper}>
                  <svg
                    width="9"
                    height="9"
                    xmlns="http://www.w3.org/2000/svg"
                    className={css.checkIcon}
                  >
                    <path
                      className={css.marketplaceFill}
                      d="M2.636621 7.7824771L.3573694 5.6447948c-.4764924-.4739011-.4764924-1.2418639 0-1.7181952.4777142-.473901 1.251098-.473901 1.7288122 0l1.260291 1.1254783L6.1721653.505847C6.565577-.0373166 7.326743-.1636902 7.8777637.227582c.5473554.3912721.6731983 1.150729.2797866 1.6951076L4.4924979 7.631801c-.2199195.306213-.5803433.5067096-.9920816.5067096-.3225487 0-.6328797-.1263736-.8637952-.3560334z"
                      fillRule="evenodd"
                    />
                  </svg>
                </span>

                <span className={css.featuredCategories}>
                  <FormattedMessage
                    id="SectionFeatured.listingsInFeaturedCat"
                    values={{ featuredcategory: featuredTextThree }}
                  />
                </span>
              </div>

              <div className={css.featuredSortingCat}>
                <span className={css.iconWrapper}>
                  <svg
                    width="9"
                    height="9"
                    xmlns="http://www.w3.org/2000/svg"
                    className={css.checkIcon}
                  >
                    <path
                      className={css.marketplaceFill}
                      d="M2.636621 7.7824771L.3573694 5.6447948c-.4764924-.4739011-.4764924-1.2418639 0-1.7181952.4777142-.473901 1.251098-.473901 1.7288122 0l1.260291 1.1254783L6.1721653.505847C6.565577-.0373166 7.326743-.1636902 7.8777637.227582c.5473554.3912721.6731983 1.150729.2797866 1.6951076L4.4924979 7.631801c-.2199195.306213-.5803433.5067096-.9920816.5067096-.3225487 0-.6328797-.1263736-.8637952-.3560334z"
                      fillRule="evenodd"
                    />
                  </svg>
                </span>

                <span className={css.featuredCategories}>
                  <FormattedMessage
                    id="SectionFeatured.listingsInFeaturedCat"
                    values={{ featuredcategory: featuredTextFour }}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NamedLink>
  );
};

const SectionFeatured = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionFeatured.title" />
      </div>
      <div className={css.locations}>
        {locationLink(
          'Caring Pet',
          featuredOne,
          'linkone',
          'Dogs',
          'Reptiles',
          'Giant',
          'Large',
          'Sitter',
          '5d594729-bc39-467e-be27-098dc62d8f18',
          'caring-pet',
          'tipOne'
        )}
        {locationLink(
          'Dream Walk',
          featuredTwo,
          '?linktwo',
          'Cats',
          'Rabbits',
          'Pet Store',
          'Giant',
          'Services',
          '5d594796-53ad-46a2-8401-1217c05cbb03',
          'dream-walk',
          'tipTwo'
        )}
        {locationLink(
          'Ana Janne',
          featuredThree,
          '?linkthree',
          'Cats',
          'Horses',
          'Parking',
          'Garden',
          'Owner',
          '5d594601-5576-4969-b9f1-6df55dd92c13',
          'ana-jane',
          'tipThree'
        )}
      </div>
    </div>
  );
};

SectionFeatured.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionFeatured.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionFeatured;
