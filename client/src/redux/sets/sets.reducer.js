import { SET_SETS, RESET_SETS } from "./sets.types";

// Sets State
const SetsState = {
  sets: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = SetsState, action) => {
  switch (action.type) {
    case SET_SETS:
      return {
        ...state,
        sets: [...action.payload],
      };

    case RESET_SETS:
      return {
        ...state,
        ...SetsState,
      };

    default:
      return state;
  }
};
