import axios from 'axios';
import { storableError } from '../util/errors';
import * as log from '../util/log';

const MAILCHIMP_API_KEY = process.env.REACT_APP_MAILCHIMP_API_KEY || 'empty_mailchimp_apikey-xx01';
const MAILCHIMP_REGION = MAILCHIMP_API_KEY.split('-')[1];
const MAILCHIMP_LIST_ID = '50f2451838';
const MAILCHIMP_URL = `https://${MAILCHIMP_REGION}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;

// ================ Action types ================ //

export const NEWSLETTER_SIGNUP_REQUEST = 'app/Newsletter/NEWSLETTER_SIGNUP_REQUEST';
export const NEWSLETTER_SIGNUP_SUCCESS = 'app/Newsletter/NEWSLETTER_SIGNUP_SUCCESS';
export const NEWSLETTER_SIGNUP_ERROR = 'app/Newsletter/NEWSLETTER_SIGNUP_ERROR';

// ================ Reducer ================ //

const initialState = {
  isSignedUp: false,
  email: null,

  // newsletter signup
  signupError: null,
  inProgress: false,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case NEWSLETTER_SIGNUP_REQUEST:
      return { ...state, inProgress: true, signupError: null, email: null };
    case NEWSLETTER_SIGNUP_SUCCESS:
      return {
        ...state,
        isSignedUp: true,
        inProgress: false,
        email: payload.email_address,
      };
    case NEWSLETTER_SIGNUP_ERROR:
      return { ...state, inProgress: false, signupError: payload };

    default:
      return state;
  }
}

// ================ Selectors ================ //

export const signupInProgress = state => {
  const { inProgress } = state.Newsletter;
  return inProgress;
};

// ================ Action creators ================ //

export const signupRequest = () => ({ type: NEWSLETTER_SIGNUP_REQUEST });
export const signupSuccess = info => ({ type: NEWSLETTER_SIGNUP_SUCCESS, payload: info });
export const signupError = error => ({ type: NEWSLETTER_SIGNUP_ERROR, payload: error, error: true });

// ================ Thunks ================ //

export const signup = params => (dispatch, getState, sdk) => {
  if (signupInProgress(getState())) {
    return Promise.reject(new Error('Newsletter signup already in progress'));
  }
  dispatch(signupRequest());
  const { email, ...rest } = params;
  const body = {
    email_address: email,
    status: "subscribed"
  }
  const basicAuth = {
    auth: {
      username: 'user',
      password: MAILCHIMP_API_KEY
    }
  }

  return axios.post(MAILCHIMP_URL, body, basicAuth)
    .then(resp => {
      dispatch(signupSuccess(resp))
    })
    .catch(e => {
      dispatch(signupError(storableError(e)));
      log.error(e, 'newsletter-signup-failed', {
        email: params.email,
      });
    });
};
