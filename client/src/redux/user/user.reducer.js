import { AUTHED, RESET_USER } from "./user.types";

// Utils
import { getRandomColor } from "../../utils/global.utils";

// User State
const UserState = {
  auth: {
    loggedIn: false,
    accessToken: null,
    expirationTime: 0,
    refreshToken: null,
    fbId: null,
  },
  provider: "password",
  email: "",
  emailVerified: false,
  displayName: "",
  photoURL: "",
  createdAt: new Date(),
  lastLoginAt: new Date(),
  photoColor: getRandomColor(),
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = UserState, action) => {
  switch (action.type) {
    case AUTHED:
      const { auth, user } = action.payload;
      return {
        ...state,
        auth: {
          loggedIn: true,
          ...auth,
        },
        ...user,
      };

    case RESET_USER:
      return {
        ...state,
        ...UserState,
      };

    default:
      return state;
  }
};
