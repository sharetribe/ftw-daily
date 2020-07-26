import React from 'react'
import {
  bool, func, object, string
} from 'prop-types'
import _ from 'lodash'
import { FieldArray } from 'react-final-form-arrays'
import { connect } from 'react-redux'
import { updateListingAdHoc } from '../../containers/EditListingPage/EditListingPage.duck'
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
    listingId,
    ready,
    errors,
    images,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    form,
  } = props

  const addImageToProductAndComposeUpdateObject = (photoId, productId, params = {}) => {
    const t = _.get(form.getState(), 'values.products', [])
    const b = _.remove(t, (p) => p.id === productId)[0]
    if (b) {
      b.photos = {
        ...b.photos,
        [photoId]: params
      }
    }
    return [...t, b].map((p, idx) => ({
      ...p,
      price: {
        amount: p.price.amount,
        currency: p.price.currency
      },
      order: _.isInteger(p.order) ? p.order : idx
    }))
  }

  const deleteImageFromProductAndComposeUpdateObject = (photoId, productId) => {
    const t = _.get(form.getState(), 'values.products', [])
    const b = _.remove(t, (p) => p.id === productId)[0]
    if (b) {
      delete b.photos[photoId]
    }
    return [...t, b]
  }

  const updateListingProducts = (products) => {
    props.updateListingAdHoc({
      id: listingId,
      publicData: {
        products
      }
    })
  }

  return (
    <div>
      <FieldArray id={`${fieldId}`} name={`${fieldId}`}>
        {({ fields }) => fields.map((name, index) => {
          const product = _.get(form.getState().values, `products[${index}]`, {})
          return (
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
                fieldId={`${fieldId}.${index}`}
                intl={intl}
                disabled={disabled}
                form={form}
                sectionTitle={intl.formatMessage({ id: 'EditListingProductsForm.additionalProductTitle' })}
                listingId={listingId}
                product={_.clone(product)}
                order={product.order}
                index={index}
                disabled={disabled}
                ready={ready}
                fetchErrors={errors}
                images={images}
                onChange={onChange}
                saveActionMsg={submitButtonText}
                updated={panelUpdated}
                updated={panelUpdated}
                updateInProgress={updateInProgress}
                onImageSubmit={(photoId, productId) => {
                  updateListingProducts(addImageToProductAndComposeUpdateObject(photoId, productId))
                }}
                onImageDelete={(photoId, productId) => {
                  updateListingProducts(deleteImageFromProductAndComposeUpdateObject(photoId, productId))
                }}
              />

            </div>
          )
        })}
      </FieldArray>

      <React.Fragment>
        <InlineTextButton
          type="button"
          rootClassName={css.fieldArrayAdd}
          onClick={() => {
            push(fieldId, { id: `prod-${_.random(100, 9999)}-${_.random(1, 100)}` })
          }}
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

const mapDispatchToProps = (dispatch) => {
  return {
    updateListingAdHoc: (update) => dispatch(updateListingAdHoc(update))
  }
}

export default connect(null, mapDispatchToProps)(EditListingProductsAdditionalProducts)
