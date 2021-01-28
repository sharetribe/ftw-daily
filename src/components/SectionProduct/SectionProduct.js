import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { NamedLink } from '../../components';

import css from './SectionProduct.module.css';

import Electric from './images/electricguitar.jpg';
import Bass from './images/bassGuitar.jpg';
import guitars from './images/guitar.jpg';

class ProductImage extends Component {
  render() {
    const { alt, ...rest } = this.props;
    return <img alt={alt} {...rest} />;
  }
}
const LazyImage = lazyLoadWithDimensions(ProductImage);

const productLink = (name, image, searchQuery) => {
  const nameText = <span className={css.productName}>{name}</span>;
  console.log(searchQuery)
  return (
    <NamedLink name="SearchPage" to={{ search: searchQuery }} className={css.product}>
      <div className={css.imageWrapper}>
        <div className={css.aspectWrapper}>
          <LazyImage src={image} alt={name} className={css.productImage} />
        </div>
      </div>
      <div className={css.linkText}>
        <FormattedMessage
          id="SectionProduct.listingsInProduct"
          values={{ product: nameText }}
        />
      </div>
    </NamedLink>
  );
};

const SectionProduct = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionProduct.title" />
      </div>
      <div className={css.products}>
        {productLink(
          'Acoustic Guitars',
          guitars,
          ''
        )}
        {productLink(
          'Electric Guitars',
          Electric,
          ''
        )}
        {productLink(
          'Bass Guitars',
          Bass,
          ''
        )}
      </div>
    </div>
  );
};

SectionProduct.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionProduct.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionProduct;
