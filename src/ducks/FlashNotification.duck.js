/**
 * This file contains Action constants, Action creators, and reducer of global
 * FlashMessages. Global actions can be used in multiple pages.
 * We are following Ducks module proposition:
 * https://github.com/erikras/ducks-modular-redux
 */

import find from 'lodash/find';
import findIndex from 'lodash/findIndex';

// Actions: system notifications
export const ADD_FLASH_NOTIFICATION = 'app/FlashNotification/ADD_NOTIFICATION';
export const REMOVE_FLASH_NOTIFICATION = 'app/FlashNotification/REMOVE_NOTIFICATION';

const initialState = [];

// Reducer
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_FLASH_NOTIFICATION:
      if (!find(state, n => n.content === payload.content && !n.isRead)) {
        return state.concat([
          { id: payload.id, type: payload.type, content: payload.content, isRead: false },
        ]);
      }
      return state;

    case REMOVE_FLASH_NOTIFICATION:
      return state.map(findIndex(state, msg => msg.id === payload.id), msg =>
        msg.set('isRead', true)
      );

    default:
      return state;
  }
};

// Action Creators
let nextMessageId = 1;

export const addFlashNotification = (type, content) => {
  const id = nextMessageId;
  nextMessageId += 1;
  return {
    type: ADD_FLASH_NOTIFICATION,
    payload: { id: `note_${id}`, type, content, isRead: false },
  };
};

export const removeFlashNotification = id => ({ type: REMOVE_FLASH_NOTIFICATION, payload: { id } });
