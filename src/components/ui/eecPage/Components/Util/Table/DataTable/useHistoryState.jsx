import { useCallback, useReducer, useRef } from "react";

const initialUseHistoryState = (initialPresent)=> ({
  past: [],
  present: initialPresent,
  future: [],
});

function historyStateReducer(
  state,
  action,
  maxHistorySize,
){
  const { past, present, future } = state;

  switch (action.type) {
    case "UNDO":
      if (!past.length) return state;
      return {
        past: past.slice(0, past.length - 1),
        present: past[past.length - 1],
        future: [present, ...future].filter((p) => p !== null),
      };

    case "REDO":
      if (!future.length) return state;
      return {
        past: present !== null ? [...past, present] : past,
        present: future[0],
        future: future.slice(1),
      };

    case "SET": {
      if (action.newPresent === present) return state;
      const newPast = present !== null ? [...past, present] : past;
      if (newPast.length > maxHistorySize) {
        newPast.shift();
      }
      return {
        past: newPast,
        present: action.newPresent,
        future: [],
      };
    }

    case "CLEAR":
      return initialUseHistoryState(action.initialPresent);

    default:
      throw new Error("Unsupported action type");
  }
}

export const useHistoryState = (initialPresent,maxHistorySize = 20)=> {
  const initialPresentRef = useRef(initialPresent);

  const reducerWrapper = useCallback(
    (state, action) => {
      return historyStateReducer(state, action, maxHistorySize);
    },
    [maxHistorySize]
  );

  const [state, dispatch] = useReducer(
    reducerWrapper,
    initialUseHistoryState(initialPresentRef.current)
  );

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => {
    if (canUndo) dispatch({ type: "UNDO" });
  }, [canUndo]);

  const redo = useCallback(() => {
    if (canRedo) dispatch({ type: "REDO" });
  }, [canRedo]);

  const set = useCallback(
    (newPresent) => dispatch({ type: "SET", newPresent }),
    []
  );

  const clear = useCallback(
    () =>
      dispatch({ type: "CLEAR", initialPresent: initialPresentRef.current }),
    []
  );

  return {
    presentState: state.present,
    setPresent: set,
    undo,
    redo,
    clear,
    canUndo,
    canRedo,
  };
}
