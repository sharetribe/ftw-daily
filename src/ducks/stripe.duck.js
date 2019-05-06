import config from '../config';
import { storableError } from '../util/errors';
import * as log from '../util/log';

// ================ Action types ================ //

export const STRIPE_ACCOUNT_CREATE_REQUEST = 'app/stripe/STRIPE_ACCOUNT_CREATE_REQUEST';
export const STRIPE_ACCOUNT_CREATE_SUCCESS = 'app/stripe/STRIPE_ACCOUNT_CREATE_SUCCESS';
export const STRIPE_ACCOUNT_CREATE_ERROR = 'app/stripe/STRIPE_ACCOUNT_CREATE_ERROR';

export const STRIPE_ACCOUNT_CLEAR_ERROR = 'app/stripe/STRIPE_ACCOUNT_CLEAR_ERROR';

export const ACCOUNT_OPENER_CREATE_REQUEST = 'app/stripe/ACCOUNT_OPENER_CREATE_REQUEST';
export const ACCOUNT_OPENER_CREATE_SUCCESS = 'app/stripe/ACCOUNT_OPENER_CREATE_SUCCESS';
export const ACCOUNT_OPENER_CREATE_ERROR = 'app/stripe/ACCOUNT_OPENER_CREATE_ERROR';

export const PERSON_CREATE_REQUEST = 'app/stripe/PERSON_CREATE_REQUEST';
export const PERSON_CREATE_SUCCESS = 'app/stripe/PERSON_CREATE_SUCCESS';
export const PERSON_CREATE_ERROR = 'app/stripe/PERSON_CREATE_ERROR';

// ================ Reducer ================ //

const initialState = {
  createStripeAccountInProgress: false,
  createStripeAccountError: null,
  createAccountOpenerInProgress: false,
  createAccountOpenerError: false,
  personAccountOpener: null,
  persons: [],
  stripeAccount: null,
  stripeAccountFetched: false,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case STRIPE_ACCOUNT_CREATE_REQUEST:
      return { ...state, createStripeAccountError: null, createStripeAccountInProgress: true };
    case STRIPE_ACCOUNT_CREATE_SUCCESS:
      return {
        ...state,
        createStripeAccountInProgress: false,
        stripeAccount: payload,
        stripeAccountFetched: true,
      };
    case STRIPE_ACCOUNT_CREATE_ERROR:
      console.error(payload);
      return { ...state, createStripeAccountError: payload, createStripeAccountInProgress: false };

    case STRIPE_ACCOUNT_CLEAR_ERROR:
      return { ...initialState };

    case ACCOUNT_OPENER_CREATE_REQUEST:
      return {
        ...state,
        createAccountOpenerError: null,
        createAccountOpenerInProgress: true,
      };
    case ACCOUNT_OPENER_CREATE_SUCCESS:
      return { ...state, createAccountOpenerInProgress: false, personAccountOpener: payload };
    case ACCOUNT_OPENER_CREATE_ERROR:
      console.error(payload);
      return { ...state, createAccountOpenerError: payload, createAccountOpenerInProgress: false };

    case PERSON_CREATE_REQUEST:
      return {
        ...state,
        persons: [
          ...state.persons,
          {
            ...payload,
            createStripePersonError: null,
            createStripePersonInProgress: true,
          },
        ],
      };
    case PERSON_CREATE_SUCCESS:
      return {
        ...state,
        persons: state.persons.map(p => {
          return p.personToken === payload.personToken
            ? { ...payload, createStripePersonInProgress: false }
            : p;
        }),
      };
    case PERSON_CREATE_ERROR:
      console.error(payload);
      return {
        ...state,
        persons: state.persons.map(p => {
          return p.personToken === payload.personToken
            ? { ...p, createStripePersonInProgress: false, createStripePersonError: payload.error }
            : p;
        }),
      };

    default:
      return state;
  }
}

// ================ Action creators ================ //

export const stripeAccountCreateRequest = () => ({ type: STRIPE_ACCOUNT_CREATE_REQUEST });

export const stripeAccountCreateSuccess = stripeAccount => ({
  type: STRIPE_ACCOUNT_CREATE_SUCCESS,
  payload: stripeAccount,
});

export const stripeAccountCreateError = e => ({
  type: STRIPE_ACCOUNT_CREATE_ERROR,
  payload: e,
  error: true,
});

export const stripeAccountClearError = () => ({
  type: STRIPE_ACCOUNT_CLEAR_ERROR,
});

export const accountOpenerCreateRequest = personToken => ({
  type: ACCOUNT_OPENER_CREATE_REQUEST,
  payload: personToken,
});

export const accountOpenerCreateSuccess = payload => ({
  type: ACCOUNT_OPENER_CREATE_SUCCESS,
  payload,
});

export const accountOpenerCreateError = payload => ({
  type: ACCOUNT_OPENER_CREATE_ERROR,
  payload,
  error: true,
});

export const personCreateRequest = personToken => ({
  type: PERSON_CREATE_REQUEST,
  payload: personToken,
});

export const personCreateSuccess = payload => ({
  type: PERSON_CREATE_SUCCESS,
  payload,
});

export const personCreateError = payload => ({
  type: PERSON_CREATE_ERROR,
  payload,
  error: true,
});

// ================ Thunks ================ //

// Util: rename address fields to match Stripe API specifications
const formatAddress = address => {
  const { city, streetAddress, postalCode, state, province } = address;
  const cityMaybe = city ? { city } : {};
  const streetAddressMaybe = streetAddress ? { line1: streetAddress } : {};
  const postalCodeMaybe = postalCode ? { postal_code: postalCode } : {};
  const stateMaybe = state ? { state } : province ? { state: province } : {};

  return {
    ...cityMaybe,
    ...streetAddressMaybe,
    ...postalCodeMaybe,
    ...stateMaybe,
  };
};

// Util: rename personToken params to match Stripe API specifications
const personTokenParams = (personData, country) => {
  const {
    isAccountOpener,
    fname: firstName,
    lname: lastName,
    birthDate,
    address,
    personalIdNumber,
    email,
    phone,
    role,
    ownershipPercentage,
    title,
  } = personData;

  const addressMaybe = address ? { address: formatAddress(address) } : {};
  const emailMaybe = email ? { email } : {};
  const phoneMaybe = phone ? { phone } : {};
  const idNumberMaybe =
    country === 'US'
      ? { ssn_last_4: personalIdNumber }
      : personalIdNumber
      ? { personal_id_number: personalIdNumber }
      : {};

  const accountOpenerMaybe = isAccountOpener ? { account_opener: true } : {};
  const jobTitleMaybe = title ? { title } : {};
  const ownerMaybe = role && role.find(r => r === 'owner') ? { owner: true } : {};
  const ownershipPercentageMaybe = ownershipPercentage
    ? { percent_ownership: Number.parseFloat(ownershipPercentage) }
    : {};

  const relationshipMaybe =
    isAccountOpener || title || role
      ? {
          relationship: {
            ...accountOpenerMaybe,
            ...jobTitleMaybe,
            ...ownerMaybe,
            ...ownershipPercentageMaybe,
          },
        }
      : {};

  return {
    person: {
      first_name: firstName,
      last_name: lastName,
      dob: birthDate,
      ...addressMaybe,
      ...idNumberMaybe,
      ...emailMaybe,
      ...phoneMaybe,
      ...relationshipMaybe,
    },
  };
};

const createStripePerson = (personParams, country, stripe) => (dispatch, getState, sdk) => {
  const { isAccountOpener } = personParams;
  let personToken = 'no-token';
  return stripe
    .createToken('person', personTokenParams(personParams, country))
    .then(response => {
      personToken = response.token.id;

      // Request to create person in progress
      // Account opener is mandatory for all - so it's handled separately
      const createPersonRequest = isAccountOpener
        ? accountOpenerCreateRequest
        : personCreateRequest;
      dispatch(createPersonRequest({ personToken }));

      return sdk.stripePersons.create({ personToken }, { expand: true });
    })
    .then(response => {
      // Stripe person created successfully
      const createPersonSuccess = isAccountOpener
        ? accountOpenerCreateSuccess
        : personCreateSuccess;
      dispatch(createPersonSuccess({ personToken, stripePerson: response.data.data }));

      return response;
    })
    .catch(err => {
      const e = storableError(err);

      // Stripe person creation failed
      const createPersonError = isAccountOpener ? accountOpenerCreateError : personCreateError;
      dispatch(createPersonError({ personToken, error: e }));

      const stripeMessage =
        e.apiErrors && e.apiErrors.length > 0 && e.apiErrors[0].meta
          ? e.apiErrors[0].meta.stripeMessage
          : null;
      log.error(err, 'create-stripe-person-failed', { stripeMessage });
      throw e;
    });
};

// accountData should be either individual or company
const bankAccountTokenParams = accountData => accountData.bankAccountToken;
const businessProfileParams = accountData => {
  const { mcc, url } =
    accountData && accountData.businessProfile ? accountData.businessProfile : {};
  return mcc && url
    ? {
        businessProfileMCC: mcc,
        businessProfileURL: url,
      }
    : {};
};

// Util: rename accountToken params to match Stripe API specifications
const accountTokenParamsForCompany = company => {
  const { address, name, phone, taxId } = company;
  const addressMaybe = address ? { address: formatAddress(address) } : {};
  const phoneMaybe = phone ? { phone } : {};
  return {
    business_type: 'company',
    company: {
      name,
      tax_id: taxId,
      ...addressMaybe,
      ...phoneMaybe,
    },
    tos_shown_and_accepted: true,
  };
};

export const createStripeCompanyAccount = (payoutDetails, stripe) => (dispatch, getState, sdk) => {
  const { company, country, accountOpener, persons = [] } = payoutDetails;
  const state = getState();
  let stripeAccount =
    state.stripe && state.stripe.stripeAccount ? state.stripe.stripeAccount : null;

  dispatch(stripeAccountCreateRequest());

  const createPersons = () => {
    return Promise.all([
      dispatch(createStripePerson({ ...accountOpener, isAccountOpener: true }, country, stripe)),
      ...persons.map(p => dispatch(createStripePerson(p, country, stripe))),
    ]);
  };

  // If stripeAccount exists, stripePersons call must have failed.
  // Retry person creation
  if (stripeAccount) {
    return createPersons()
      .then(response => {
        // Return created stripe account from this thunk function
        return stripeAccount;
      })
      .catch(err => {
        const e = storableError(err);
        dispatch(stripeAccountCreateError(e));
        const stripeMessage =
          e.apiErrors && e.apiErrors.length > 0 && e.apiErrors[0].meta
            ? e.apiErrors[0].meta.stripeMessage
            : null;
        log.error(err, 'create-stripe-company-persons-failed', { stripeMessage });
        throw e;
      });
  }

  return stripe
    .createToken('account', accountTokenParamsForCompany(company))
    .then(response => {
      const accountToken = response.token.id;
      const bankAccountToken = bankAccountTokenParams(company);
      const stripeAccountParams = {
        accountToken,
        bankAccountToken,
        country,
        ...businessProfileParams(company),
      };
      return sdk.stripeAccount.create(stripeAccountParams, { expand: true });
    })
    .then(response => {
      stripeAccount = response;
      dispatch(stripeAccountCreateSuccess(response.data.data));
      return createPersons();
    })
    .then(response => {
      // Return created stripe account from this thunk function
      return stripeAccount;
    })
    .catch(err => {
      const e = storableError(err);
      dispatch(stripeAccountCreateError(e));
      const stripeMessage =
        e.apiErrors && e.apiErrors.length > 0 && e.apiErrors[0].meta
          ? e.apiErrors[0].meta.stripeMessage
          : null;
      const errorFlag = !stripeAccount
        ? 'create-stripe-company-account-failed'
        : 'create-stripe-company-persons-failed';
      log.error(err, errorFlag, { stripeMessage });
      throw e;
    });
};

const accountTokenParamsForIndividual = (individual, country) => {
  const {
    fname: firstName,
    lname: lastName,
    birthDate,
    address,
    phone,
    email,
    personalIdNumber,
  } = individual;
  const addressMaybe = address ? { address: formatAddress(address) } : {};
  const dobMaybe = birthDate ? { dob: birthDate } : {};
  const emailMaybe = email ? { email } : {};
  const phoneMaybe = phone ? { phone } : {};
  const idNumberMaybe =
    country === 'US'
      ? { ssn_last_4: personalIdNumber }
      : personalIdNumber
      ? { personal_id_number: personalIdNumber }
      : {};

  return {
    business_type: 'individual',
    individual: {
      first_name: firstName,
      last_name: lastName,
      ...dobMaybe,
      ...addressMaybe,
      ...emailMaybe,
      ...phoneMaybe,
      ...idNumberMaybe,
    },
    tos_shown_and_accepted: true,
  };
};

export const createStripeIndividualAccount = (payoutDetails, stripe) => (
  dispatch,
  getState,
  sdk
) => {
  const { country, individual } = payoutDetails;
  let stripeAccount;
  dispatch(stripeAccountCreateRequest());

  return stripe
    .createToken('account', accountTokenParamsForIndividual(individual, country))
    .then(response => {
      const accountToken = response.token.id;
      const bankAccountToken = bankAccountTokenParams(individual);
      const stripeAccountParams = {
        accountToken,
        bankAccountToken,
        country,
        ...businessProfileParams(individual),
      };
      return sdk.stripeAccount.create(stripeAccountParams, { expand: true });
    })
    .then(response => {
      stripeAccount = response;
      dispatch(stripeAccountCreateSuccess(response.data.data));
      return stripeAccount;
    })
    .catch(err => {
      const e = storableError(err);
      dispatch(stripeAccountCreateError(e));
      const stripeMessage =
        e.apiErrors && e.apiErrors.length > 0 && e.apiErrors[0].meta
          ? e.apiErrors[0].meta.stripeMessage
          : null;
      log.error(err, 'create-stripe-individual-account-failed', { stripeMessage });
      throw e;
    });
};

export const createStripeAccount = payoutDetails => (dispatch, getState, sdk) => {
  if (typeof window === 'undefined' || !window.Stripe) {
    throw new Error('Stripe must be loaded for submitting PayoutPreferences');
  }

  const stripe = window.Stripe(config.stripe.publishableKey);

  if (payoutDetails.accountType === 'individual') {
    return dispatch(createStripeIndividualAccount(payoutDetails, stripe));
  } else {
    return dispatch(createStripeCompanyAccount(payoutDetails, stripe));
  }
};
