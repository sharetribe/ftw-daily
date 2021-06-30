// import reqwest from 'reqwest';
import { storableError } from '../util/errors';
import * as log from '../util/log';

// const MAILCHIMP_API_KEY = process.env.REACT_APP_MAILCHIMP_API_KEY || 'empty_mailchimp_apikey-xx01';
// const MAILCHIMP_REGION = MAILCHIMP_API_KEY.split('-')[1];
// const MAILCHIMP_LIST_ID = '50f2451838';
// const MAILCHIMP_URL = `https://${MAILCHIMP_REGION}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;

// NOTE not using the api key, bc mc does not support CORS...
// mailchimp will think the embedded form they provided is being used...
const MC_REQW_URL = "//url.us17.list-manage.com/subscribe/post?u=c64d71fed0812d3ed0a5418f8&amp;id=50f2451838";

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

export const signup = email => (dispatch, getState, sdk) => {
  // NOTE re-enable this after properly handle signups
  // bc of bug in reqwest, this doesn't get handled properly
  // if (signupInProgress(getState())) {
  //   return Promise.reject(new Error('Newsletter signup already in progress'));
  // }
  dispatch(signupRequest());


  const req_data = {
    method: 'get',
    type: 'jsonp',
    contentType: 'application/json',
    url: MC_REQW_URL,
    data: {EMAIL: email, STATUS: 'subscribed'},
    jsonpCallback: 'c'
  };

  // NOTE TODO FIXME this "works" but reqwest has an uncaught error...
  // so promise is never resolved. :( super hacky, need to fix
  // reqwest(req_data)
  //   .then(
  //     function (resp) {
  //       console.log('it worked???', resp);
  //   })
  //   .fail(function (err, msg) {
  //     console.log('nope it didnt', err);
  //   })
  //   .always(function (resp) {
  //     console.log('always this..', resp)
  //   })
    // function c (data) {
    //   console.log('c data? ', data)
    // }

  // NOTE using both mailchimps official library and axios, CORS error... won't work

  // https://github.com/mailchimp/mailchimp-marketing-node
  // mailchimp.lists.addListMember(MAILCHIMP_LIST_ID, body)
  //   .then( resp => dispatch(signupSuccess(resp)) )
  //   .catch(e => {
  //     dispatch(signupError(storableError(e)));
  //     log.error(e, 'newsletter-signup-failed', {email});
  //   });

  //
  // return axios.post(MAILCHIMP_URL, config)
  //   .then(resp => {
  //     dispatch(signupSuccess(resp))
  //   })
  //   .catch(e => {
  //     dispatch(signupError(storableError(e)));
  //     log.error(e, 'newsletter-signup-failed', {email});
  //   });
};
