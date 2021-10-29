import { useEffect, useState } from 'react';

// Global state is useful in situations, where UI state needs to be tracked navigation history.
// Alternatively, Redux could be used too, but it's unnecessarily heavy to use for
// a single component to track it's internal UI state (e.g. "scroll position").
// If more than one component is needing certain info, the recommendation is to use Redux.
//
// This piece of code is taken from Daishi Kato's blog:
// https://blog.axlight.com/posts/steps-to-develop-global-state-for-react/
export const createGlobalState = initialState => {
  let globalState = initialState;
  const listeners = Object.fromEntries(Object.keys(initialState).map(key => [key, new Set()]));

  const setGlobalState = (key, nextValue) => {
    globalState = { ...globalState, [key]: nextValue };
    listeners[key].forEach(listener => listener());
  };

  const useGlobalState = key => {
    const [state, setState] = useState(globalState[key]);
    useEffect(() => {
      const listener = () => {
        setState(globalState[key]);
      };
      listeners[key].add(listener);
      listener(); // in case it's already changed
      return () => listeners[key].delete(listener); // cleanup
    }, []);
    return [state, nextValue => setGlobalState(key, nextValue)];
  };

  return {
    setGlobalState,
    useGlobalState,
  };
};
