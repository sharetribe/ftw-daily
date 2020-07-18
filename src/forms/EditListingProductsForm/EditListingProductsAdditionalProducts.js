import React from 'react'
import {
  bool, func, object, string
} from 'prop-types'
import { FieldArray } from 'react-final-form-arrays'
import { FormattedMessage, intlShape } from '../../util/reactIntl'
import { IconAdd, IconClose, InlineTextButton } from '../../components'
import EditListingProductsProduct from './EditListingProductsProduct'

import css from './EditListingProductsForm.css'

const EditListingProductsAdditionalProducts = (props) => {
  const {
    fieldId,
    disabled,
    intl,
    push,
    values,
  } = props

  return (
    <div className={css.additionalProductsWrapper}>
      <FieldArray id={`${fieldId}`} name={`${fieldId}`}>
        {({ fields }) => fields.map((name, index) => (
          <div className={css.additionalProductsWrapper} key={name}>
            <div
              className={css.fieldArrayRemove}
              onClick={() => fields.remove(index)}
              style={{ cursor: 'pointer' }}
            >
              <span className={css.additionalProductLabel}>
                <IconClose rootClassName={css.closeIcon} size="small" />
                <FormattedMessage id="EditListingProductsForm.additionalProductRemove" />
              </span>
            </div>

            <EditListingProductsProduct
              intl={intl}
              disabled={disabled}
              values={values}
              fieldId={`${fieldId}.${index}`}
              sectionTitle={intl.formatMessage({ id: 'EditListingProductsForm.additionalProductTitle' })}
            />

          </div>
        ))
        }
      </FieldArray>

      <React.Fragment>
        <InlineTextButton
          type="button"
          rootClassName={css.fieldArrayAdd}
          onClick={() => push(fieldId, undefined)}
        >
          <span className={css.additionalProductLabel}>
            <IconAdd rootClassName={css.addIcon} />
            <FormattedMessage id="EditListingProductsForm.additionalProductLink" />
          </span>
        </InlineTextButton>
      </React.Fragment>
    </div>
  )
}

EditListingProductsAdditionalProducts.defaultProps = {
  disabled: false,
  values: null,
}

EditListingProductsAdditionalProducts.propTypes = {
  fieldId: string.isRequired,
  push: func.isRequired,
  disabled: bool,
  values: object,

  // from parent
  intl: intlShape.isRequired,
}

export default EditListingProductsAdditionalProducts
