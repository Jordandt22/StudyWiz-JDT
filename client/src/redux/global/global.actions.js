import {
  SET_ERROR,
  RESET_ERROR,
  SET_ALERT,
  RESET_ALERT,
  SET_LOADING,
} from "./global.types";

// Actions
export const setError = (error) => ({ type: SET_ERROR, payload: error });

export const resetError = () => ({ type: RESET_ERROR });

export const setAlert = (alert) => ({ type: SET_ALERT, payload: alert });

export const resetAlert = () => ({ type: RESET_ALERT });

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading,
});
