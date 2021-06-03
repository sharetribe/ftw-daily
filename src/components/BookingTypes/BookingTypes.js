import React, { Component } from 'react';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';
import { Form, FieldRadioButton } from '../../components';
import { getAvailablePrices } from '../../util/data';
import { 
  HOURLY_PRICE,
} from '../../util/types';

import css from './BookingTypes.module.css';

const { Money } = sdkTypes;
export default class BookingTypes extends Component {
  handleOnChange(values){
    this.props.onChange(values.bookingType)
  }

  render() {
    const {listing, intl} = this.props;

    const prices = getAvailablePrices(listing);

    return (  
      <div>
        <FinalForm
        // {...rest}
        onSubmit={() => {}}
        initialValues={{bookingType: HOURLY_PRICE}}
        render={fieldRenderProps => {
          const {
            handleSubmit,
          } = fieldRenderProps;

          return (
            <Form onSubmit={handleSubmit}>
              <FormSpy
                subscription={{ values: true }}
                onChange={({values}) => {
                  this.handleOnChange(values);
                }}
              />

              <div className={css.types}>
                {prices.map(({key, value}) => {
                  const {currency, amount} = value;
                  const price = formatMoney(intl, new Money(amount, currency));
                  return (
                    <div className={css.sessionCheckboxItem}>
                      <FieldRadioButton
                        id={`bookingType${key}`}
                        name="bookingType"
                        label={intl.formatMessage({id: `BookingTypes.${key}Label`}, {price})}
                        value={key}
                        // labelClassName={labelClassName}
                      />
                    </div>
                  )
                })}
              </div>
               
              </Form>
          )}}
        />
      </div>
    )
  }
}