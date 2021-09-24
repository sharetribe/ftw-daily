import React from 'react';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import { formatMoney } from '../../util/currency';
import Button from '@material-ui/core/Button';
import DialogWindow from './DialogWindow';
import css from './BookingBreakdown.module.css';
import Link from '@material-ui/core/Link';
import { propTypes } from '../../util/types';
import { bool, func } from 'prop-types';

const voucherifyClient = require('voucherify')

const LineItemPromocodeMaybe = props => {
  const { transaction, isProvider, intl, updateResult, result } = props;
  const [open, setOpen] = React.useState(false);
  const [promocode, setPromocode] = React.useState('');
  // const [result, setResult] = React.useState({
  //   _sdkType: 'Money',
  //   amount: 0,
  //   currency: 'GBP',
  // });
  const [formData, setFormData] = React.useState('');

  const [error, setError] = React.useState();
  const [value, setValue] = React.useState('');

  const total = isProvider
    ? transaction.attributes.payoutTotal
    : transaction.attributes.payinTotal

  React.useEffect( () => {
    setFormData(formatMoney(intl, result));
  }, [result]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  }
  const client = voucherifyClient({
    applicationId: '53180639-bb73-4420-93a0-307298c8e5fc',
    clientSecretKey: 'cbf33a27-9021-4d08-bc55-db3c0b7d7e77'
  })
  const handleSubmit = () => {
    value && client.vouchers.get(value)
      .then((data) => {
        if (data.discount.type === 'PERCENT') {
          const sum = ((result.amount / 100 * data.discount.percent_off) >= data.discount.amount_limit) ? (result.amount - data.discount.amount_limit) : (result.amount / 100 * data.discount.percent_off);
          updateResult({ ...result, amount: sum });
          // setFormData(formatMoney(intl, result));
          setPromocode(value);
        } else if (data.discount.type === 'AMOUNT') {
          const sum1 = result.amount - data.discount.amount_off;
          updateResult({ ...result, amount: sum1 });
          // setFormData(formatMoney(intl, result));
          setPromocode(value);

        }
        error && setError();
        setOpen(false);
        // setPromocode(value);
      })
      .catch((error) => {
        setError(error.message);

      });
  }
  console.log(result);
  console.log(formData);

  return (
    <div>
      {promocode ? <Link component="button" onClick={() => {
        updateResult(total);
        setPromocode('');

      }}>
        Delete
      </Link> : <Link component="button" onClick={() => setOpen(true)}>
        Open alert dialog
      </Link>}
      <DialogWindow intl={intl} open={open} error={error} promocode={value} handleChange={handleChange} handleSubmit={handleSubmit} handleClose={handleClose} />
    </div>
  )
};

LineItemPromocodeMaybe.propTypes = {
  updateResult: func,
  transaction: propTypes.transaction.isRequired,
  isProvider: bool.isRequired,
  intl: intlShape.isRequired,
};

export default LineItemPromocodeMaybe;
