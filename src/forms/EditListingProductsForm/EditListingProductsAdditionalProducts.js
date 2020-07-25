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
    values,
    listingId,
    updateListing,
    ready,
    errors,
    images,
    onChange,
    onUpdateImageOrder,
    onRemoveImage,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    onImageUpload,
    onImageSubmit,
    form,
    products
  } = props

  console.log(props)
  return (
    <div className={css.additionalProductsWrapper}>
      <FieldArray id={`${fieldId}`} name={`${fieldId}`}>
        {({ fields }) => fields.map((name, index) => {
          console.log(fields)
          const product = _.get(fields, `value[${index}]`, {})
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
                values={values}
                sectionTitle={intl.formatMessage({ id: 'EditListingProductsForm.additionalProductTitle' })}
                listingId={listingId}
                product={product}
                index={index}
                disabled={disabled}
                ready={ready}
                fetchErrors={errors}
                initialValues={{ images }}
                images={images}
                onImageUpload={onImageUpload}
                onChange={onChange}
                onUpdateImageOrder={onUpdateImageOrder}
                onRemoveImage={onRemoveImage}
                saveActionMsg={submitButtonText}
                updated={panelUpdated}
                updated={panelUpdated}
                updateInProgress={updateInProgress}
                onImageSubmit={(e, productId) => {
                  console.log(values)
                  console.log(e)
                  console.log(productId)
                  const p1 = _.find(products, (pd) => pd.id === productId)
                  const p2 = _.defaults(product, p1)
                  const f = products.filter((p) => p.id !== p2.id)
                  const prod = {
                    ...p2,
                    photos: p2.photos || {}
                  }
                  _.forEach(e.images, (v) => {
                    if (v.imageId) {
                      prod.photos[v.imageId.uuid] = {
                        thumb: false
                      }
                    }
                  })

                  onImageSubmit(e, [...f, prod])
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
            push(fieldId, undefined)
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

const mapStateToProps = (state, ownProps) => {
  return {
    currentListing: _.get(state, 'marketplaceData.entities.listing', {})[ownProps.listingId],
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateListing: (listingId, data) => dispatch(updateListingAdHoc({
      id: listingId,
      publicData: {
        products: data
      }
    }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditListingProductsAdditionalProducts)
