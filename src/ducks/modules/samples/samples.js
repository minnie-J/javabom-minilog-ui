// Actions

export const ADD_COUNT = "samples/ADD_COUNT";

// Action Creators

export const addCount = amount => ({
  type: ADD_COUNT,
  amount
});

// Init State

const initState = {
  count: 0
};

// Reducer

export default function samplesReducer(state = initState, action = {}) {
  switch (action.type) {
    case ADD_COUNT:
      return applyAddCount(state, action);
    default:
      return state;
  }
}

// Reducer Functions

function applyAddCount(state, { amount }) {
  return {
    ...state,
    count: state.count + amount
  };
}
