import React, { Component } from 'react';
import { string, func } from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';
import { LINE_ITEM_DAY, LINE_ITEM_NIGHT, propTypes } from '../../util/types';
import { formatMoney } from '../../util/currency';
import { ensureListing, ensureUser } from '../../util/data';
import { richText } from '../../util/richText';
import { createSlug } from '../../util/urlHelpers';
import config from '../../config';
import { NamedLink, ResponsiveImage, Icon } from '../../components';
import { categories, traderCategories, amenities} from '../../marketplace-custom-config'
import './../../icons.js'
import css from './ListingCard.css';
import marketCss from './../../marketplace.css'

const MIN_LENGTH_FOR_LONG_WORDS = 10;

const priceData = (price, intl) => {
  if (price && price.currency === config.currency) {
    const formattedPrice = formatMoney(intl, price);
    return { formattedPrice, priceTitle: formattedPrice };
  } else if (price) {
    return {
      formattedPrice: intl.formatMessage(
        { id: 'ListingCard.unsupportedPrice' },
        { currency: price.currency }
      ),
      priceTitle: intl.formatMessage(
        { id: 'ListingCard.unsupportedPriceTitle' },
        { currency: price.currency }
      ),
    };
  }
  return {};
};

class ListingImage extends Component {
  render() {
    return <ResponsiveImage {...this.props} />;
  }
}
const LazyImage = lazyLoadWithDimensions(ListingImage, { maxWidth: '300px', maxHeight: '200px', loadAfterInitialRendering: 3000 });

export const ListingCardComponent = props => {
  const { className, rootClassName, intl, listing, renderSizes, setActiveListing } = props;
  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureListing(listing);
  const id = currentListing.id.uuid;
  const { title = '', price, description } = currentListing.attributes;
  const { category, traderCategory } = currentListing.attributes.publicData;
  const poolAmenities = currentListing.attributes.publicData.amenities;
  const categoryUi = intl.formatMessage({
    id: categories.find(c => c.key === category).label
  })
  const traderCategoryUi = intl.formatMessage({
    id: traderCategories.find(c => c.key === traderCategory).label
  })

  
  const amenitiesUi = poolAmenities.map(amenity => {
    const configAmenity = amenities.find(a => a.key === amenity )
    return {
      label: amenity,
      icon: configAmenity.icon,
      key: configAmenity.key
    }
  })

  

  const slug = createSlug(title);
  const author = ensureUser(listing.author);
  const authorName = author.attributes.profile.displayName;
  const firstImage =
    currentListing.images && currentListing.images.length > 0 ? currentListing.images[0] : null;

  const { formattedPrice, priceTitle } = priceData(price, intl);

  const unitType = config.bookingUnitType;
  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;

  const unitTranslationKey = isNightly
    ? 'ListingCard.perNight'
    : isDaily
    ? 'ListingCard.perDay'
    : 'ListingCard.perUnit';

  
  const infoBoxCss = classNames(marketCss.row, marketCss.fullWidth, marketCss.p);
  const mainBox = classNames(marketCss.column, marketCss.fullWidth);
  const categoryCss = classNames(css.authorInfo, );
  return (
    <NamedLink className={css.root1} name="ListingPage" params={{ id, slug }}>
      <div className={css.aspectWrapper1}>
        <LazyImage
          rootClassName={css.rootForImage}
          alt={title}
          image={firstImage}
          variants={['landscape-crop', 'landscape-crop2x']}
          sizes={renderSizes}
        />
      </div>

      {/* <div className={mainBox}>
        <div className={infoBoxCss}>
          <div className={css.detailsBox}>
            <h3 className={css.title}>{title}</h3>
            <div className={categoryCss}><h5 className={marketCss.noMargin}>{`${categoryUi} | ${traderCategoryUi}`}</h5></div>
          </div>
          <div className={css.price}>
            <div className={css.priceValue} title={priceTitle}>
              {formattedPrice}
            </div>
            <div className={css.perUnit}>
              <FormattedMessage id={unitTranslationKey} />
            </div>
          </div>
        </div>
        <div>
          1234
        </div>
        <div>
          1234
        </div>
      </div> */}



      <div style={{display: 'flex', flexDirection: 'column', width: '100%', padding: '16px'}}>
        <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
          <div style={{display: 'flex', flexDirection: 'column', width: '80%'}}>
            <h3 className={css.title}>{title}</h3>
            <div className={categoryCss}><h5 className={marketCss.noMargin}>{`${categoryUi} | ${traderCategoryUi}`}</h5></div>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end',width: '20%'}}>
            <div className={css.price}>
              <div className={css.priceValue} title={priceTitle}>
                {formattedPrice}
              </div>
              <div className={css.perUnit}>
                <FormattedMessage id={unitTranslationKey} />
              </div>
            </div>
          </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'row', flexGrow: '1'}}>
        {amenitiesUi.map(amenity => (
          <div className={css.icon} key={amenity.key}>
            <Icon icon={amenity.icon} message={amenity.label}/>
          </div>
        ))}
        </div>
        <div>
          <div className={categoryCss}><h5 className={marketCss.noMargin}>{`Anunciante: ${authorName}`}</h5></div>
        </div>
      </div>
      
    </NamedLink>
  );
};

ListingCardComponent.defaultProps = {
  className: null,
  rootClassName: null,
  renderSizes: null,
  setActiveListing: () => null,
};

ListingCardComponent.propTypes = {
  className: string,
  rootClassName: string,
  intl: intlShape.isRequired,
  listing: propTypes.listing.isRequired,

  // Responsive image sizes hint
  renderSizes: string,

  setActiveListing: func,
};

export default injectIntl(ListingCardComponent);
