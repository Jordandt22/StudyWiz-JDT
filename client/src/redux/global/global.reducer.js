import {
  SET_ERROR,
  RESET_ERROR,
  SET_ALERT,
  RESET_ALERT,
  SET_LOADING,
} from "./global.types";

// Global State
const GlobalState = {
  error: {
    status: 200,
    message: "",
  },
  alert: {
    open: false,
    message: "Sorry, a problem occured.",
    severity: "error",
    title: "Error",
    duration: 3000,
  },
  loading: {
    isLoading: false,
    loadingText: "Loading...",
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = GlobalState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        error: {
          ...state.error,
          ...action.payload,
        },
      };

    case RESET_ERROR:
      return {
        ...state,
        error: {
          ...GlobalState.error,
        },
      };

    case SET_ALERT:
      return {
        ...state,
        alert: {
          ...state.alert,
          open: true,
          ...action.payload,
        },
      };

    case RESET_ALERT:
      return {
        ...state,
        alert: {
          ...GlobalState.alert,
        },
      };

    case SET_LOADING:
      return {
        ...state,
        loading: {
          ...GlobalState.loading,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};
