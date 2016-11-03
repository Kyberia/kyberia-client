const createReducer = (reducerMap, initialState) => (state = initialState, action) => {
  const actionHandler = reducerMap[action.type];

  if (actionHandler && typeof actionHandler !== 'function') {
    throw new Error(`actionHandler must be a function, got instead: ${typeof actionHandler}`);
  }

  return actionHandler ? actionHandler(state, action) : state;
};

export default createReducer;
