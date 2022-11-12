import { SET_SETS, RESET_SETS } from "./sets.types";

// Actions
export const setSets = (sets) => ({
  type: SET_SETS,
  payload: sets,
});

export const resetSets = () => ({
  type: RESET_SETS,
});
