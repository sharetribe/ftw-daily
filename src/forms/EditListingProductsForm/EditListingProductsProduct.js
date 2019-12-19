import React from 'react';
import { bool, node, object, string } from 'prop-types';
import { intlShape } from '../../util/reactIntl';
import { required } from '../../util/validators';
import { FieldTextInput } from '../../components';

import css from './EditListingProductsForm.css';

const EditListingProductsProduct = props => {
  const {
    intl,
    disabled,
    values,
    fieldId,
    sectionTitle
  } = props;

  const productTitle = sectionTitle
    ? sectionTitle
    : intl.formatMessage({ id: "EditListingProductsForm.additionalProductTitle" });

  return (
    <div className={css.sectionContainer}>
      <h3 className={css.subTitle}>{productTitle}</h3>
      <div className={css.formRow}>
        <FieldTextInput
          id={`${fieldId}.type`}
          name={`${fieldId}.type`}
          disabled={disabled}
          type="text"
          label={'foo'}
          placeholder={'bar'}
          validate={required('this is required')}
        />
      </div>
    </div>
  );
};

EditListingProductsProduct.defaultProps = {
  disabled: false,
  fieldId: null,
  sectionTitle: null,
  values: null,
};

EditListingProductsProduct.propTypes = {
  disabled: bool,
  fieldId: string,
  intl: intlShape.isRequired,
  sectionTitle: node,
  values: object,
};

export default EditListingProductsProduct;