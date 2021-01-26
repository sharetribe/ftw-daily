import reducer, {
  ADD_FLASH_NOTIFICATION,
  REMOVE_FLASH_NOTIFICATION,
  addFlashNotification,
  removeFlashNotification,
} from './FlashNotification.duck';

describe('FlashNotification', () => {
  describe('actions', () => {
    it('should create an action to add a filter', () => {
      const content = 'Error message';
      const type = 'error';
      const expectedAction = {
        type: ADD_FLASH_NOTIFICATION,
        payload: { id: 'note_1', type, content, isRead: false },
      };
      const received = addFlashNotification(type, content);
      expect(received).toEqual(expectedAction);
    });

    it('should create an action to remove a notification', () => {
      const expectedAction = { type: REMOVE_FLASH_NOTIFICATION, payload: { id: 1 } };

      expect(removeFlashNotification(1)).toEqual(expectedAction);
    });
  });

  describe('reducer', () => {
    it('should return the initial state', () => {
      const initial = reducer(undefined, {});
      expect(initial).toEqual([]);
    });

    it('should handle ADD_FLASH_NOTIFICATION', () => {
      const addFlashNote1 = addFlashNotification('error', 'Run the tests');
      const addFlashNote2 = addFlashNotification('error', 'Run the tests again');
      const reduced = reducer([], addFlashNote1);
      const reducedWithInitialContent = reducer([addFlashNote1.payload], addFlashNote2);
      expect(reduced).toEqual([addFlashNote1.payload]);
      expect(reducedWithInitialContent).toEqual([addFlashNote1.payload, addFlashNote2.payload]);
    });

    it('should handle duplicates ADD_FILTER', () => {
      const addFlashNote = addFlashNotification('error', 'Run the tests');
      const reducedWithInitialContent = reducer([addFlashNote.payload], addFlashNote);
      expect(reducedWithInitialContent).toEqual([addFlashNote.payload]);
    });
  });
});
