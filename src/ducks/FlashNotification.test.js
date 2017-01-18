import reducer, { addFlashNotification, removeFlashNotification } from './FlashNotification';

describe('FlashNotification', () => {
  const ADD_FLASH_NOTIFICATION = 'FLASH::ADD_NOTIFICATION';
  const REMOVE_FLASH_NOTIFICATION = 'FLASH::REMOVE_NOTIFICATION';

  describe('actions', () => {
    it('should create an action to add a filter', () => {
      const content = 'Error message';
      const type = 'error';
      const expectedAction = {
        type: ADD_FLASH_NOTIFICATION,
        payload: {
          id: 'note_1',
          type,
          content,
          isRead: false,
        }
      };
      const serializedExpectations = JSON.stringify(expectedAction);
      const received = JSON.stringify(addFlashNotification(type, content));
      expect(received).toEqual(serializedExpectations);
    });

    it('should create an action to remove a notification', () => {
      const expectedAction = {
        type: REMOVE_FLASH_NOTIFICATION,
        payload: { id: 1 },
      };

      expect(removeFlashNotification(1)).toEqual(expectedAction);
    });
  });

  describe('reducer', () => {
    it('should return the initial state', () => {
      const initial = reducer(undefined, {});
      expect(initial).toEqual([]);
    });

    it('should handle ADD_FLASH_NOTIFICATION', () => {
      const flashNote1 = {
        id: 0,
        type: 'error',
        content: 'Run the tests',
        isRead: false,
      };
      const flashNote2 = {
        id: 0,
        type: 'error',
        content: 'Run the tests again',
        isRead: false,
      };
      const addFlashNote1 = { type: ADD_FLASH_NOTIFICATION, payload: flashNote1 };
      const addFlashNote2 = { type: ADD_FLASH_NOTIFICATION, payload: flashNote2 };
      const reduced = reducer([], addFlashNote1);
      const reducedWithInitialContent = reducer([flashNote1], addFlashNote2);
      expect(reduced).toEqual([flashNote1]);
      expect(reducedWithInitialContent).toEqual([flashNote1, flashNote2]);
    });

    it('should handle duplicates ADD_FILTER', () => {
      const flashNote = {
        id: 0,
        type: 'error',
        content: 'Run the tests',
        isRead: false,
      };
      const addFlashNote = { type: ADD_FLASH_NOTIFICATION, payload: flashNote };
      const reducedWithInitialContent = reducer([flashNote], addFlashNote);
      expect(reducedWithInitialContent).toEqual([flashNote]);
    });
  });
});
