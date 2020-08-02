import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles'
import React from 'react'
import { bool, node, string } from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Field } from 'react-final-form'
import FieldReactSelect from '../../components/FieldReactSelect/FieldReactSelect'
import { updateListingAdHoc } from '../../containers/EditListingPage/EditListingPage.duck'
import { intlShape } from '../../util/reactIntl'
import { composeValidators, moneySubUnitAmountAtLeast, required } from '../../util/validators'
import { FieldTextInput, FieldCurrencyInput, SelectImage } from '../../components'
import config from '../../config'
import { formatMoney } from '../../util/currency'
import { types as sdkTypes } from '../../util/sdkLoader'

import css from './EditListingProductsForm.css'

const { Money } = sdkTypes

const EditListingProductsProduct = (props) => {
  const {
    intl,
    disabled,
    fieldId,
    sectionTitle,
    form,
    product,
    onImageSubmit,
    onImageDelete,
    images
  } = props

  const productTitle = sectionTitle || intl.formatMessage({ id: 'EditListingProductsForm.additionalProductTitle' })
  const bedTypeTitle = intl.formatMessage({ id: 'EditListingProductsForm.additionalProductBedTypeSelection' })
  const bathroomType = intl.formatMessage({ id: 'EditListingProductsForm.additionalProductBathroomTypeSelection' })
  const losDiscountTitle = intl.formatMessage({ id: 'EditListingProductsForm.additionalProductLengthOfStayDiscount' })
  const roomPhotos = intl.formatMessage({ id: 'EditListingProductsForm.additionalProductPhotosOfTheRoom' })
  const priceTitle = intl.formatMessage({ id: 'EditListingProductsForm.additionalProductPriceTitle' })

  const priceRequired = required(
    intl.formatMessage({
      id: 'EditListingPricingForm.priceRequired',
    })
  )
  const minPrice = new Money(config.listingMinimumPriceSubUnits, config.currency)
  const minPriceRequired = moneySubUnitAmountAtLeast(
    intl.formatMessage(
      { id: 'EditListingPricingForm.priceTooLow' },
      { minPrice: formatMoney(intl, minPrice) }
    ),
    config.listingMinimumPriceSubUnits
  )
  const priceValidators = config.listingMinimumPriceSubUnits
    ? composeValidators(priceRequired, minPriceRequired)
    : priceRequired

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }))

  const classes = useStyles()

  return (
    <Paper style={{padding: 20 }}>
      <Grid container className={classes.root} direction="column" spacing={5}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2} direction="column">
            <Grid item xs={12}>
              <FieldTextInput
                id={`${fieldId}.type`}
                name={`${fieldId}.type`}
                disabled={disabled}
                type="text"
                label={intl.formatMessage({ id: 'EditListingProductsForm.additionalProductTypeTitle' })}
                placeholder={intl.formatMessage({ id: 'EditListingProductsForm.additionalProductTypePlaceholder' })}
                validate={required(intl.formatMessage({ id: 'EditListingProductsForm.additionalProductTypeInvalid' }))}
              />
            </Grid>
            <Grid item xs={12}>
              <FieldTextInput
                id={`${fieldId}.description`}
                name={`${fieldId}.description`}
                disabled={disabled}
                type="textarea"
                label={intl.formatMessage({ id: 'EditListingProductsForm.additionalProductDescriptionTitle' })}
                placeholder={intl.formatMessage({ id: 'EditListingProductsForm.additionalProductDescriptionPlaceholder' })}
                validate={required(intl.formatMessage({ id: 'GenericForm.required' }))}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2} direction="column">
            <Grid item xs={12}>
              <h3 className={css.subTitle}>Type of room</h3>
              <Field
                id={`${fieldId}.occupancyType`}
                name={`${fieldId}.occupancyType`}
                component={FieldReactSelect}
                disabled={disabled}
                validate={required(intl.formatMessage({ id: 'GenericForm.required' }))}
                options={[
                  {
                    value: 'private',
                    label: 'Private'
                  },
                  {
                    value: 'shared',
                    label: 'Shared'
                  }
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <h3 className={css.subTitle}>{bedTypeTitle}</h3>
              <Field
                id={`${fieldId}.beds`}
                name={`${fieldId}.beds`}
                component={FieldReactSelect}
                disabled={disabled}
                validate={required(intl.formatMessage({ id: 'GenericForm.required' }))}
                options={[
                  {
                    value: 'one-queen',
                    label: '1 Queen Bed'
                  },
                  {
                    value: 'two-queens',
                    label: '2 Queen Beds'
                  },
                  {
                    value: 'single-twin',
                    label: '1 Twin Bed'
                  },
                  {
                    value: 'double-twins',
                    label: '2 Twin Beds'
                  },
                  {
                    value: 'dorm',
                    label: 'Dorm'
                  }
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <h3 className={css.subTitle}>{bathroomType}</h3>
              <Field
                id={`${fieldId}.bathroom`}
                name={`${fieldId}.bathroom`}
                component={FieldReactSelect}
                disabled={disabled}
                validate={required(intl.formatMessage({ id: 'GenericForm.required' }))}
                options={[
                  {
                    value: 'private',
                    label: 'Private Bathroom'
                  },
                  {
                    value: 'shared',
                    label: 'Shared Bathroom'
                  }
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <h3 className={css.subTitle}>{intl.formatMessage({ id: 'EditListingProductsForm.additionalProductQuantity' })}</h3>
              <Field
                id={`${fieldId}.quantityAvailable`}
                name={`${fieldId}.quantityAvailable`}
                component={FieldReactSelect}
                validate={required(intl.formatMessage({ id: 'GenericForm.required' }))}
                disabled={disabled}
                options={[
                  {
                    value: 1,
                    label: '1'
                  },
                  {
                    value: 2,
                    label: '2'
                  },
                  {
                    value: 3,
                    label: '3'
                  },
                  {
                    value: 4,
                    label: '4'
                  },
                  {
                    value: 5,
                    label: '5'
                  },
                  {
                    value: 6,
                    label: '6'
                  },
                  {
                    value: 7,
                    label: '7'
                  },
                  {
                    value: 8,
                    label: '8'
                  }
                ]}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2} direction="column">
            <Grid item xs={12}>
              <FieldCurrencyInput
                id={`${fieldId}.price`}
                name={`${fieldId}.price`}
                disabled={disabled}
                label={intl.formatMessage({ id: 'EditListingProductsForm.additionalProductPriceSubTitle' })}
                placeholder={intl.formatMessage({ id: 'EditListingProductsForm.additionalProductPricePlaceholder' })}
                currencyConfig={config.currencyConfig}
                validate={priceValidators}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2} direction="column">
            <Grid item xs={12}>
              <h3 className={css.subTitle}>{roomPhotos}</h3>
              <SelectImage
                onUpload={(photoIds) => {
                  onImageSubmit(photoIds, product.id)
                }}
                onDelete={(photoIds) => {
                  onImageDelete(photoIds, product.id)
                }}
                disabled={form.getState().invalid}
                imagesToDisplay={_.keys(product.photos)}
                showThumbnails={true}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

EditListingProductsProduct.defaultProps = {
  disabled: false,
  fieldId: null,
  sectionTitle: null
}

EditListingProductsProduct.propTypes = {
  disabled: bool,
  fieldId: string,
  intl: intlShape.isRequired,
  sectionTitle: node
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateListingAdHoc: (update) => dispatch(updateListingAdHoc(update))
  }
}

export default connect(null, mapDispatchToProps)(EditListingProductsProduct)
