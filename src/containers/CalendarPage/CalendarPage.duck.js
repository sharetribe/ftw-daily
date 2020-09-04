import { storableError } from '../../util/errors';
import config from '../../config';
import { 
  TRANSITION_NOTIFY_ON_TIME_SCHEDULING,
  TRANSITION_NOTIFY_ON_SCHEDULE_CANCELLING,
 } from '../../util/transaction';
import { types as sdkTypes } from '../../util/sdkLoader';

const { UUID } = sdkTypes;

const origin = typeof window !== 'undefined' && window.location.origin

const oneDayMilliseconds = 1000 * 60 * 60 * 24

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

  export const getAcceptedAndActiveTransactionsData = _ => (dispatch, getState, sdk) => {
    return sdk.currentUser.show()
    .then(response => {
      const currentUserId = response.data.data.id.uuid 

      if(currentUserId) {
        dispatch(getCurrentUserId(currentUserId))

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
    const protectedDataField = acceptedTransaction.attributes.protectedData
    
    const customerData = typeof protectedDataField.customerData === 'string' ? JSON.parse(protectedDataField.customerData) : protectedDataField.customerData
    const providerData = typeof protectedDataField.providerData === 'string' ? JSON.parse(protectedDataField.providerData) : protectedDataField.providerData
    // only customer of the transaction should be able to change and appoint time
    const currentUserUUID = customerData.userUUID 
    const currentUserIsTransactionCustomer =  currentUserUUID === getState().CalendarPage.currentUserId 
    const currentUserIsTransactionProvider = providerData && providerData.providerId.uuid === getState().CalendarPage.currentUserId 
    
    const transcationStartDate = acceptedTransaction.attributes.createdAt
    const currentDay = new Date()
    const startOfCurrentWeek = (currentDay.getDay() === 1) ? currentDay : new Date(currentDay - ((currentDay.getDay() - 1) * oneDayMilliseconds)) 
    const __CW = new Date(startOfCurrentWeek)
    const endOfCurrentWeek = new Date(__CW.setDate(__CW.getDate() + 6))

    const startDate = transcationStartDate > startOfCurrentWeek ? transcationStartDate : startOfCurrentWeek

    console.log('startDate ', startDate)
    console.log('startOfCurrentWeek ', startOfCurrentWeek)
    console.log('endOfCurrentWeek ', endOfCurrentWeek)
    console.log('id ', id)

    return fetch(`${origin}/api/transactions/${id}/events?from=${startDate}&to=${endOfCurrentWeek}`)
    .then(res => res.json())
    .then(response => {
      const ridings = response.reduce((acc,eventItem) => {
          const {title, transactionId, end, start, ownerId, _id} = eventItem
          if(transactionId === id) {
            acc.push({ 
              title,
              start, 
              end,
              ownerId,
              id: _id,
              status: 'appointed',
              backgroundColor: ownerId === providerData.providerId.uuid ? '#278825' : '#923395',
              transactionId,
             })
          }
        return acc
      }, []) 
      dispatch(getScheduledRidingsForActiveTransactions(ridings)) 
      return { ridings, currentUserIsTransactionCustomer, currentUserIsTransactionProvider, transcationStartDate }
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

    if(!origin) return 

    dispatch(notifyOnLoadingStart())
     return fetch(`${origin}/api/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(schedulingObj)
     })
    .then(res => res.json())
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
  }

  export const deleteSchedulingDataTransaction = id => dispatch => {
    dispatch(notifyOnLoadingStart())

    return fetch(`${origin}/api/events/${id}`, { method: 'DELETE' })
    .then(response => {
      console.log('DELETE response', response)
      dispatch(notifyOnLoadingEnd())
      return response
    })
    .catch(e => {
      dispatch(notifyOnLoadingEnd())
      dispatch(createNewSchedulingDataTransactionError(storableError(e)));
      throw e;
    });
  }