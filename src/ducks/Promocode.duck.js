import { storableError } from '../util/errors';
// Actions
export const ADD_DISCOUNT_REQUEST = 'app/promocode/ADD_DISCOUNT_REQUEST';
export const ADD_DISCOUNT_SUCCESS = 'app/promocode/ADD_DISCOUNT_SUCCESS';
export const ADD_DISCOUNT_ERROR = 'app/promocode/ADD_DISCOUNT_ERROR';

const voucherifyClient = require('voucherify');

export const client = voucherifyClient({
    applicationId: '53180639-bb73-4420-93a0-307298c8e5fc',
    clientSecretKey: 'cbf33a27-9021-4d08-bc55-db3c0b7d7e77',
});

// Reducer

const initialState = {
    addDiscountInProgress: null,
    addDiscountError: null,
    addDiscount: null,

};
export default function reducer(state = initialState, action = {}) {
    const { type, payload } = action;
    switch (type) {
        case ADD_DISCOUNT_REQUEST:
            return { ...state, addDiscountError: null, addDiscountInProgress: true };
        case ADD_DISCOUNT_SUCCESS:
            return {
                ...state,
                addDiscountInProgress: false,
                addDiscount: payload,
            };
        case ADD_DISCOUNT_ERROR:
            return {
                ...state,
                addDiscountError: payload,
                addDiscountInProgress: false,
            };
        default:
            return state;
    }
}

// Action types
export const addDiscountRequest = () => ({ type: ADD_DISCOUNT_REQUEST });

export const addDiscountSuccess = discount => ({
    type: ADD_DISCOUNT_SUCCESS,
    payload: discount,
});

export const addDiscountError = e => ({
    type: ADD_DISCOUNT_ERROR,
    payload: e,
    error: true,
});

// ================ Thunks ================ //

export const addDiscount = promo => (dispatch) => {
    dispatch(addDiscountRequest());
  return client.vouchers
    .get(promo)
    .then(response => {
      const discount = response.discount;
      dispatch(addDiscountSuccess(discount));
      return discount;
    })
    .catch(e => {
        console.log(e)
        // log.error(storableError(e), 'add-payment-method-failed');
        dispatch(addDiscountError(storableError(e)));
      });
};

