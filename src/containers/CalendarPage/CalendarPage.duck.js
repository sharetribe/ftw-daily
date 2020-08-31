import { storableError } from '../../util/errors';
import config from '../../config';
import { 
  TRANSITION_NOTIFY_ON_TIME_SCHEDULING,
  TRANSITION_NOTIFY_ON_SCHEDULE_CANCELLING,
 } from '../../util/transaction';
import { types as sdkTypes } from '../../util/sdkLoader';

const { UUID } = sdkTypes;


export const GET_CURRENT_USER_EMAIL = 'app/CalendarPage/GET_CURRENT_USER_EMAIL';

export const GET_CURRENT_USER_ID = 'app/CalendarPage/GET_CURRENT_USER_ID';
export const GET_CURRENT_USER_ID_ERROR = 'app/CalendarPage/GET_CURRENT_USER_ID_ERROR';

export const GET_ACCEPTED_AND_ACTIVE_TRANSACTIONS = 'app/CalendarPage/GET_ACCEPTED_AND_ACTIVE_TRANSACTIONS';
export const GET_ACCEPTED_AND_ACTIVE_TRANSACTIONS_ERROR = 'app/CalendarPage/GET_ACCEPTED_AND_ACTIVE_TRANSACTIONS_ERROR';

export const GET_SCHEDULED_RIDINGS_FOR_ACTIVE_TRANSACTIONS = 'app/CalendarPage/GET_SCHEDULED_RIDINGS_FOR_ACTIVE_TRANSACTIONS';
export const GET_SCHEDULED_RIDINGS_FOR_ACTIVE_TRANSACTIONS_ERROR = 'app/CalendarPage/GET_SCHEDULED_RIDINGS_FOR_ACTIVE_TRANSACTIONS_ERROR';

export const RESET_ACCEPTED_AND_ACTIVE_TRANSACTIONS = 'app/CalendarPage/RESET_ACCEPTED_AND_ACTIVE_TRANSACTIONS';
export const RESET_SCHEDULED_RIDINGS_FOR_ACTIVE_TRANSACTIONS = 'app/CalendarPage/RESET_SCHEDULED_RIDINGS_FOR_ACTIVE_TRANSACTIONS';

export const CREATE_NEW_SCHEDULING_DATA_TRANSACTION_ERROR = 'app/CalendarPage/CREATE_NEW_SCHEDULING_DATA_TRANSACTION_ERROR';

export const NOTIFY_ON_LOADING_START = 'app/CalendarPage/NOTIFY_ON_LOADING_START';
export const NOTIFY_ON_LOADING_END = 'app/CalendarPage/NOTIFY_ON_LOADING_END';

const initialState = {
    currentUserEmail: null,

    currentUserId: null,
    currentUserIdError: null,

    acceptedAndActiveTransactions: null,
    acceptedAndActiveTransactionsError: null,

    scheduledRidingsForActiveTransactions: null,
    scheduledRidingsForActiveTransactionsError: null,

    newSchedulingDataTransactionError: null,

    loadingStarted: false,
};

const CalendarPageReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CURRENT_USER_EMAIL:
      return {
          ...state,
          currentUserEmail: payload,
      };
      case GET_CURRENT_USER_ID:
        return {
            ...state,
            currentUserId: payload,
        };
      case GET_CURRENT_USER_ID_ERROR:
        return {
            ...state,
            currentUserIdError: payload,
        };
      case GET_ACCEPTED_AND_ACTIVE_TRANSACTIONS:
        return {
            ...state,
            acceptedAndActiveTransactions: payload,
          };
      case GET_ACCEPTED_AND_ACTIVE_TRANSACTIONS_ERROR:
        return {
            ...state,
            acceptedAndActiveTransactionsError: payload,
          };
      case GET_SCHEDULED_RIDINGS_FOR_ACTIVE_TRANSACTIONS:
        return {
            ...state,
            scheduledRidingsForActiveTransactions: payload,
          };
      case GET_SCHEDULED_RIDINGS_FOR_ACTIVE_TRANSACTIONS_ERROR:
        return {
            ...state,
            scheduledRidingsForActiveTransactionsError: payload,
        };
      case RESET_ACCEPTED_AND_ACTIVE_TRANSACTIONS:
        return {
            ...state,
            acceptedAndActiveTransactions: null,
        };
      case RESET_SCHEDULED_RIDINGS_FOR_ACTIVE_TRANSACTIONS:
        return {
            ...state,
            scheduledRidingsForActiveTransactions: null,
        };
      case CREATE_NEW_SCHEDULING_DATA_TRANSACTION_ERROR:
          return {
              ...state,
              newSchedulingDataTransactionError: payload,
        };
      case NOTIFY_ON_LOADING_START:
          return {
              ...state,
              loadingStarted: true,
        };
      case NOTIFY_ON_LOADING_END:
          return {
              ...state,
              loadingStarted: false,
      };
      default:
        return state;
  }
};

  export default CalendarPageReducer;

// ================ Action creators ================ //

export const getCurrentUserId = data => ({
  type: GET_CURRENT_USER_ID,
  payload: data
});

export const getCurrentUserEmail = data => ({
  type: GET_CURRENT_USER_EMAIL,
  payload: data
});

export const getCurrentUserIdError = e => ({
  type: GET_CURRENT_USER_ID_ERROR,
  payload: e
});

  export const getAcceptedAndActiveTransactions = data => ({
    type: GET_ACCEPTED_AND_ACTIVE_TRANSACTIONS,
    payload: data
  });

  export const getAcceptedAndActiveTransactionsError = data => ({
    type: GET_ACCEPTED_AND_ACTIVE_TRANSACTIONS_ERROR,
    payload: data
  });

  export const getScheduledRidingsForActiveTransactions = data => ({
    type: GET_SCHEDULED_RIDINGS_FOR_ACTIVE_TRANSACTIONS,
    payload: data
  });
  
  export const getScheduledRidingsForActiveTransactionsError = e => ({
    type: GET_SCHEDULED_RIDINGS_FOR_ACTIVE_TRANSACTIONS_ERROR,
    payload: e,
  });

  export const resetAcceptedAndActiveTransactions = () => ({
    type: RESET_ACCEPTED_AND_ACTIVE_TRANSACTIONS
  });

  export const resetScheduledRidingsForActiveTransactions = () => ({
    type: RESET_SCHEDULED_RIDINGS_FOR_ACTIVE_TRANSACTIONS
  });

  export const createNewSchedulingDataTransactionError = e => ({
    type: CREATE_NEW_SCHEDULING_DATA_TRANSACTION_ERROR,
    payload: e,
  })

  export const notifyOnLoadingStart = () => ({
    type: NOTIFY_ON_LOADING_START
  })

  export const notifyOnLoadingEnd = () => ({
    type: NOTIFY_ON_LOADING_END
  })
// ================ Thunks ================ //

 //"transition/accept","transition/complete", "transition/expire-review-period", "transition/customer-notifies-on-time-scheduling-1"


  export const getAcceptedAndActiveTransactionsData = _ => (dispatch, getState, sdk) => {
    return sdk.currentUser.show()
    .then(response => {
      const currentUserId = response.data.data.id.uuid 
      const currentUserEmail = response.data.data.attributes.email // unnecessary should be handled by user id

      if(currentUserId) {
        dispatch(getCurrentUserId(currentUserId))
        dispatch(getCurrentUserEmail(currentUserEmail))

        return sdk.transactions.query({lastTransitions: ["transition/accept"]})
        .then(response => { 
          dispatch(getAcceptedAndActiveTransactions(response.data.data))
         })
        .catch(e=> {
            dispatch(getAcceptedAndActiveTransactionsError(storableError(e)));
            throw e;
        })
      }
      else {
        throw 'No current user id has been received'
      }
    })
    .catch(e => {
      dispatch(getCurrentUserIdError(e))
    })
  };

  export const getAcceptedTransactionSchedulingData = acceptedTransaction => (dispatch, getState, sdk) => {
    const id = acceptedTransaction.id.uuid
    const customerData = JSON.parse(acceptedTransaction.attributes.protectedData.customerData)
    const providerData = JSON.parse(acceptedTransaction.attributes.protectedData.providerData)
    // only customer of the transaction should be able to change and appoint time
    const currentUserEmail = customerData.email // has to be change to id
    const currentUserIsTransactionCustomer =  currentUserEmail === getState().CalendarPage.currentUserEmail // has to be change to id
    
    const price = providerData.listingData.price
    const numberOfDays = Math.round(acceptedTransaction.attributes.payinTotal.amount / price)
    const transcationStartDate = acceptedTransaction.attributes.createdAt
    const transcationEndDate = new Date(transcationStartDate)
    transcationEndDate.setDate(transcationEndDate.getDate() + numberOfDays)

    return sdk.transactions
    .query({lastTransitions: ["transition/customer-notifies-on-time-scheduling-1"]})
      .then(response => { 
        const ridings = response.data.data.reduce((acc,c) => {
          const protectedDataField = c.attributes.protectedData
          if(Object.keys(protectedDataField).length) {
            const scheduling = JSON.parse(protectedDataField.schedulingData) 
            const {title, acceptedTransactionId, end, start, ownerId} = scheduling
            if(acceptedTransactionId === id) {
              acc.push({ 
                title,
                start, 
                end,
                ownerId,
                id: c.id.uuid,
                status: 'appointed',
                backgroundColor: "#923395",
                acceptedTransactionId,
               })
            }
          }
          return acc
        }, []) 
        
        dispatch(getScheduledRidingsForActiveTransactions(ridings)) 
        return { ridings, currentUserIsTransactionCustomer, transcationStartDate, transcationEndDate }
      })
      .catch(e=> {
          dispatch(getScheduledRidingsForActiveTransactionsError(storableError(e)));
          throw e;
      })
  };

  export const resetAcceptedAndActiveTransactionsData = _ => (dispatch, getState, sdk) => {
    dispatch(resetScheduledRidingsForActiveTransactions())
  };

  export const createNewSchedulingDataTransaction = schedulingObj => (dispatch, getState, sdk) => {
    delete schedulingObj['backgroundColor']
    delete schedulingObj['status']

    const thisState = getState()
    const selectedActiveTransaction = thisState.CalendarPage.acceptedAndActiveTransactions.filter(t => t.id.uuid === schedulingObj.acceptedTransactionId)[0]
    const protectedDataField = JSON.parse(selectedActiveTransaction.attributes.protectedData.providerData)
    const listingId = protectedDataField.listingData.listingId
    const bodyParams = {
      transition: TRANSITION_NOTIFY_ON_TIME_SCHEDULING,
      processAlias: config.bookingProcessAlias,
      params: {
        listingId,
        protectedData: { schedulingData: JSON.stringify(schedulingObj) }
      }
    };

    dispatch(notifyOnLoadingStart())
     
    return sdk.transactions.initiate(bodyParams)
    .then(response => {
      dispatch(notifyOnLoadingEnd())
      // Send the message to the created transaction
      return response
    })
    .catch(e => {
      dispatch(notifyOnLoadingEnd())
      dispatch(createNewSchedulingDataTransactionError(storableError(e)));
      throw e;
    });
    return 
  }

  export const deleteSchedulingDataTransaction = id => (dispatch, getState, sdk) => {
    dispatch(notifyOnLoadingStart())

    return sdk.transactions.transition({
      id: new UUID(id),
      transition: TRANSITION_NOTIFY_ON_SCHEDULE_CANCELLING,
      params: {}
    }).then(response => {
      dispatch(notifyOnLoadingEnd())
      return response
    }).catch(e => {
      dispatch(notifyOnLoadingEnd())
      dispatch(createNewSchedulingDataTransactionError(storableError(e)));
      throw e;
    });
  }