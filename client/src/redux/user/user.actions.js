import { AUTHED, RESET_USER } from "./user.types";
import { resetSets } from "../sets/sets.actions";

// Firebase
import { signOutFbUser } from "../../firebase/firebase.util";

// Actions
export const authed = (user) => ({
  type: AUTHED,
  payload: user,
});

export const resetUser = () => ({
  type: RESET_USER,
});

export const signOut = () => async (dispatch) => {
  await signOutFbUser();
  dispatch(resetSets());
  dispatch(resetUser());
};
