import React from 'react';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import { formatMoney } from '../../util/currency';
import css from '../../components/BookingBreakdown/BookingBreakdown.module.css';
import Link from '@material-ui/core/Link';
import { propTypes } from '../../util/types';
import { bool, func, object } from 'prop-types';
import { addDiscount } from '../../ducks/Promocode.duck';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Modal, SocialLoginButton } from '../../components';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';

const FieldDiscountComponent = props => {
  const { transaction, isProvider, intl, updateResult, result, onDiscount, onManageDisableScrolling, addDiscountError, addDiscount, updateDiscount, promo } = props;
  const [open, setOpen] = React.useState(false);
  const [promocode, setPromocode] = React.useState(false);

  const [error, setError] = React.useState();
  const [value, setValue] = React.useState('');

  const total = isProvider ? transaction.attributes.payoutTotal : transaction.attributes.payinTotal;

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = event => {
    setValue(event.target.value);
  };

  React.useEffect(() => {
    if (addDiscountError) {
      setError(addDiscountError.message);
    } else if(promocode && !error && addDiscount ) {
      updateDiscount(true);
    }  
    else setError();
  }, [addDiscountError, addDiscount])

  const handleSubmit = () => {
    value && onDiscount(value);
    !error && setPromocode(true);
  };

  return (
    <div className={css.promocode}>
      {promo ? (
        <Link
          onClick={() => {
            setPromocode(false);
            updateDiscount(false);
          }}
        >
          Delete Discount Code
        </Link>
      ) : (
        <Link onClick={() => setOpen(true)}>Add Discount Code</Link>
      )}
      <Modal
        id="Modal"
        isOpen={open}
        onClose={handleClose}
        onManageDisableScrolling={onManageDisableScrolling}
        containerClassName={css.modalContainer}
        usePortal
      >
        <div className={css.modalWindow}>
          <h2><FormattedMessage id="BookingBreakdown.setPromocode" /></h2>
          <input className={css.inputDialog} type="text" value={value} onChange={handleChange} />
          {error ? <span>{error}</span> : null}
          <div className={css.buttonDisc}>
            <SocialLoginButton onClick={() => handleSubmit()}>Submit</SocialLoginButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};
FieldDiscountComponent.defaultProps = {
  addDiscountInProgress: false,
  addDiscountError: null,
  addDiscount: null,
};
FieldDiscountComponent.propTypes = {
  updateResult: func,

  updateDiscount: func,
  promo: bool,
  transaction: propTypes.transaction.isRequired,
  isProvider: bool,
  onManageDisableScrolling: func.isRequired,
  intl: intlShape,
  addDiscountInProgress: bool,
  addDiscountError: object,
  addDiscount: object,
};

const mapStateToProps = state => {
  const {
    addDiscountInProgress,
    addDiscountError,
    addDiscount,
  } = state.Promocode;
  return {
    addDiscountInProgress,
    addDiscountError,
    addDiscount,
    scrollingDisabled: isScrollingDisabled(state),

  };
};

const mapDispatchToProps = dispatch => ({
  onDiscount: promo => dispatch(addDiscount(promo)),
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
});

const FieldDiscount = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(FieldDiscountComponent);

export default FieldDiscount;