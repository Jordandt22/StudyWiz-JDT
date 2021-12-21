import { AUTHED, RESET_USER } from "./user.types";

// Actions
export const authed = (user) => ({
  type: AUTHED,
  payload: user,
});

export const resetUser = () => ({
  type: RESET_USER,
});
