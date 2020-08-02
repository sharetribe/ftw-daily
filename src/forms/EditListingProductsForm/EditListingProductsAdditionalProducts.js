import Divider from '@material-ui/core/Divider';
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
    listing,
    ready,
    errors,
    images,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    form,
  } = props

  const addImageToProductAndComposeUpdateObject = (photoIds, productId, params = {}) => {
    const t = _.get(form.getState(), 'values.products', [])
    const b = _.remove(t, (p) => p.id === productId)[0]
    if (b) {
      b.photos = {
        ...b.photos
      }
      photoIds.forEach((v) => {
        b.photos[v] = {}
      })
    }
    // because const = b might be undefined we use compact to filter out falsey vals
    return _.compact([...t, b]).map((p, idx) => ({
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

  const updateListingProducts = (products, photoIds) => {
    const imgs = (listing.images || []).map((img) => img.id.uuid)
    props.updateListingAdHoc({
      id: listing.id.uuid,
      publicData: {
        products
      },
      images: _.xor(imgs, photoIds)
    })
  }
  const formState = form.getState()
  return (
    <div>
      <FieldArray id={`${fieldId}`} name={`${fieldId}`}>
        {({ fields }) => fields.map((name, index) => {
          const product = _.get(formState.values, `products[${index}]`, {})
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
                listingId={listing.id.uuid}
                product={product}
                order={product.order}
                index={index}
                disabled={disabled}
                ready={ready}
                fetchErrors={errors}
                images={_.filter(images, (img) => _.includes(_.keys(product.photos), img.id.uuid))}
                onChange={onChange}
                saveActionMsg={submitButtonText}
                updated={panelUpdated}
                updated={panelUpdated}
                updateInProgress={updateInProgress}
                onImageSubmit={(photoIds, productId) => {
                  updateListingProducts(addImageToProductAndComposeUpdateObject(photoIds, productId), photoIds)
                }}
                onImageDelete={(photoId, productId) => {
                  updateListingProducts(deleteImageFromProductAndComposeUpdateObject(photoId, productId), photoId)
                }}
              />
              <Divider />
            </div>
          )
        })}
      </FieldArray>

      <React.Fragment>
        <InlineTextButton
          type="button"
          rootClassName={css.fieldArrayAdd}
          disabled={formState.invalid}
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
