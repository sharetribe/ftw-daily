import pick from 'lodash/pick';
import moment from 'moment';
import config from '../../config';
import { types as sdkTypes } from '../../util/sdkLoader';
import { storableError } from '../../util/errors';
import { addMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { denormalisedResponseEntities } from '../../util/data';
import { TRANSITION_ENQUIRE } from '../../util/types';
import { LISTING_PAGE_PENDING_APPROVAL_VARIANT } from '../../util/urlHelpers';
import { fetchCurrentUser, fetchCurrentUserHasOrdersSuccess } from '../../ducks/user.duck';

const { UUID } = sdkTypes;

// ================ Action types ================ //

export const SET_INITAL_VALUES = 'app/ListingPage/SET_INITIAL_VALUES';

export const SHOW_LISTING_REQUEST = 'app/ListingPage/SHOW_LISTING_REQUEST';
export const SHOW_LISTING_ERROR = 'app/ListingPage/SHOW_LISTING_ERROR';

export const FETCH_REVIEWS_REQUEST = 'app/ListingPage/FETCH_REVIEWS_REQUEST';
export const FETCH_REVIEWS_SUCCESS = 'app/ListingPage/FETCH_REVIEWS_SUCCESS';
export const FETCH_REVIEWS_ERROR = 'app/ListingPage/FETCH_REVIEWS_ERROR';

export const FETCH_TIME_SLOTS_REQUEST = 'app/ListingPage/FETCH_TIME_SLOTS_REQUEST';
export const FETCH_TIME_SLOTS_SUCCESS = 'app/ListingPage/FETCH_TIME_SLOTS_SUCCESS';
export const FETCH_TIME_SLOTS_ERROR = 'app/ListingPage/FETCH_TIME_SLOTS_ERROR';

export const SEND_ENQUIRY_REQUEST = 'app/ListingPage/SEND_ENQUIRY_REQUEST';
export const SEND_ENQUIRY_SUCCESS = 'app/ListingPage/SEND_ENQUIRY_SUCCESS';
export const SEND_ENQUIRY_ERROR = 'app/ListingPage/SEND_ENQUIRY_ERROR';

// ================ Reducer ================ //

const initialState = {
  id: null,
  showListingError: null,
  reviews: [],
  fetchReviewsError: null,
  timeSlots: [],
  fetchTimesLotsError: null,
  sendEnquiryInProgress: false,
  sendEnquiryError: null,
  enquiryModalOpenForListingId: null,
};

const listingPageReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case SET_INITAL_VALUES:
      return { ...initialState, ...payload };

    case SHOW_LISTING_REQUEST:
      return { ...state, id: payload.id, showListingError: null };
    case SHOW_LISTING_ERROR:
      return { ...state, showListingError: payload };

    case FETCH_REVIEWS_REQUEST:
      return { ...state, fetchReviewsError: null };
    case FETCH_REVIEWS_SUCCESS:
      return { ...state, reviews: payload };
    case FETCH_REVIEWS_ERROR:
      return { ...state, fetchReviewsError: payload };

    case FETCH_TIME_SLOTS_REQUEST:
      return { ...state, fetchTimeSlotsError: null };
    case FETCH_TIME_SLOTS_SUCCESS:
      return { ...state, timeSlots: payload };
    case FETCH_TIME_SLOTS_ERROR:
      return { ...state, fetchTimeSlotsError: payload };

    case SEND_ENQUIRY_REQUEST:
      return { ...state, sendEnquiryInProgress: true, sendEnquiryError: null };
    case SEND_ENQUIRY_SUCCESS:
      return { ...state, sendEnquiryInProgress: false };
    case SEND_ENQUIRY_ERROR:
      return { ...state, sendEnquiryInProgress: false, sendEnquiryError: payload };

    default:
      return state;
  }
};

export default listingPageReducer;

// ================ Action creators ================ //

export const setInitialValues = initialValues => ({
  type: SET_INITAL_VALUES,
  payload: pick(initialValues, Object.keys(initialState)),
});

export const showListingRequest = id => ({
  type: SHOW_LISTING_REQUEST,
  payload: { id },
});

export const showListingError = e => ({
  type: SHOW_LISTING_ERROR,
  error: true,
  payload: e,
});

export const fetchReviewsRequest = () => ({ type: FETCH_REVIEWS_REQUEST });
export const fetchReviewsSuccess = reviews => ({ type: FETCH_REVIEWS_SUCCESS, payload: reviews });
export const fetchReviewsError = error => ({
  type: FETCH_REVIEWS_ERROR,
  error: true,
  payload: error,
});

export const fetchTimeSlotsRequest = () => ({ type: FETCH_TIME_SLOTS_REQUEST });
export const fetchTimeSlotsSuccess = timeSlots => ({
  type: FETCH_TIME_SLOTS_SUCCESS,
  payload: timeSlots,
});
export const fetchTimeSlotsError = error => ({
  type: FETCH_TIME_SLOTS_ERROR,
  error: true,
  payload: error,
});

export const sendEnquiryRequest = () => ({ type: SEND_ENQUIRY_REQUEST });
export const sendEnquirySuccess = () => ({ type: SEND_ENQUIRY_SUCCESS });
export const sendEnquiryError = e => ({ type: SEND_ENQUIRY_ERROR, error: true, payload: e });

// ================ Thunks ================ //

export const showListing = (listingId, isOwn = false) => (dispatch, getState, sdk) => {
  dispatch(showListingRequest(listingId));
  dispatch(fetchCurrentUser());
  const params = {
    id: listingId,
    include: ['author', 'author.profileImage', 'images'],
    'fields.image': [
      // Listing page
      'variants.landscape-crop',
      'variants.landscape-crop2x',
      'variants.landscape-crop4x',
      'variants.landscape-crop6x',

      // Social media
      'variants.facebook',
      'variants.twitter',

      // Image carousel
      'variants.scaled-small',
      'variants.scaled-medium',
      'variants.scaled-large',
      'variants.scaled-xlarge',

      // Avatars
      'variants.square-small',
      'variants.square-small2x',
    ],
  };

  const show = isOwn ? sdk.ownListings.show(params) : sdk.listings.show(params);

  return show
    .then(data => {
      dispatch(addMarketplaceEntities(data));
      return data;
    })
    .catch(e => {
      dispatch(showListingError(storableError(e)));
    });
};

export const fetchReviews = listingId => (dispatch, getState, sdk) => {
  dispatch(fetchReviewsRequest);
  return sdk.reviews
    .query({
      listing_id: listingId,
      state: 'public',
      include: ['author', 'author.profileImage'],
      'fields.image': ['variants.square-small', 'variants.square-small2x'],
    })
    .then(response => {
      const reviews = denormalisedResponseEntities(response);
      dispatch(fetchReviewsSuccess(reviews));
    })
    .catch(e => {
      dispatch(fetchReviewsError(storableError(e)));
    });
};

export const fetchTimeSlots = params => (dispatch, getState, sdk) => {
  dispatch(fetchTimeSlotsRequest);
  return sdk.timeslots
    .query(params)
    .then(response => {
      const timeSlots = denormalisedResponseEntities(response);
      dispatch(fetchTimeSlotsSuccess(timeSlots));
    })
    .catch(e => {
      dispatch(fetchTimeSlotsError(storableError(e)));
    });
};

export const sendEnquiry = (listingId, message) => (dispatch, getState, sdk) => {
  dispatch(sendEnquiryRequest());
  const bodyParams = {
    transition: TRANSITION_ENQUIRE,
    processAlias: config.bookingProcessAlias,
    params: { listingId },
  };
  return sdk.transactions
    .initiate(bodyParams)
    .then(response => {
      const transactionId = response.data.data.id;

      // Send the message to the created transaction
      return sdk.messages.send({ transactionId, content: message }).then(() => {
        dispatch(sendEnquirySuccess());
        dispatch(fetchCurrentUserHasOrdersSuccess(true));
        return transactionId;
      });
    })
    .catch(e => {
      dispatch(sendEnquiryError(storableError(e)));
      throw e;
    });
};

export const loadData = (params, search) => dispatch => {
  const listingId = new UUID(params.id);

  if (params.variant === LISTING_PAGE_PENDING_APPROVAL_VARIANT) {
    return dispatch(showListing(listingId, true));
  }

  if (config.fetchAvailableTimeSlots) {
    // fetch time slots for 90 days starting today
    // as the booking can only be done for 90 days
    // in the future due to Stripe limitations
    const start = moment().toDate();
    const end = moment()
      .add(config.dayCountAvailableForBooking, 'days')
      .toDate();
    const timeSlotsParams = { listingId, start, end };

    return Promise.all([
      dispatch(showListing(listingId)),
      dispatch(fetchTimeSlots(timeSlotsParams)),
      dispatch(fetchReviews(listingId)),
    ]);
  } else {
    return Promise.all([dispatch(showListing(listingId)), dispatch(fetchReviews(listingId))]);
  }
};
