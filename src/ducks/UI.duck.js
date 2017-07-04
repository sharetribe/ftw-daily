// ================ Action types ================ //

export const DISABLE_SCROLLING = 'app/UI/DISABLE_SCROLLING';

// ================ Reducer ================ //

const initialState = {
  disableScrollRequests: [],
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case DISABLE_SCROLLING: {
      const { componentId, disableScrolling } = payload;
      const disableScrollRequests = state.disableScrollRequests;
      const componentIdExists = disableScrollRequests.find(c => c.componentId === componentId);

      if (componentIdExists) {
        const disableScrollRequestArray = disableScrollRequests.map(c => {
          return c.componentId === componentId ? { ...c, disableScrolling } : c;
        });
        return { ...state, disableScrollRequests: [...disableScrollRequestArray] };
      }

      const disableScrollRequestArray = [
        ...disableScrollRequests,
        { componentId, disableScrolling },
      ];
      return {
        ...state,
        disableScrollRequests: disableScrollRequestArray,
      };
    }

    default:
      return state;
  }
}

// ================ Action creators ================ //

export const manageDisableScrolling = (componentId, disableScrolling) => ({
  type: DISABLE_SCROLLING,
  payload: { componentId, disableScrolling },
});

// ================ Selectors ================ //

export const isScrollingDisabled = state => {
  const { disableScrollRequests } = state.UI;
  return disableScrollRequests.some(r => r.disableScrolling);
};
