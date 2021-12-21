import React, { useEffect } from "react";
import { connect } from "react-redux";

// Axios
import axios from "axios";

// Firebase
import { fb } from "../../../firebase/firebase";
import { checkTokenTime } from "../../../firebase/firebase.util";

// Redux
import { authed } from "../../../redux/user/user.actions";
import { setSets } from "../../../redux/sets/sets.actions";

// Context
import { useUserAPIContext } from "../../../context/api/User.context";

function AppAuth(props) {
  const {
    user: {
      auth: { loggedIn, fbId },
    },
    authed,
    setSets,
  } = props;
  const { firebaseAuth } = fb;
  const {
    setError,
    api: { getUser },
  } = useUserAPIContext();

  // Checking for a Signed-in User
  useEffect(() => {
    if (!loggedIn || (loggedIn && !fbId)) {
      firebaseAuth.onAuthStateChanged(async (user) => {
        if (!user) return;

        const {
          displayName,
          email,
          emailVerified,
          metadata: { createdAt, lastLoginAt },
          photoURL,
          providerData,
          uid: fbId,
          stsTokenManager: {
            accessToken,
            expirationTime,
            refreshToken,
            isExpired,
          },
        } = user.multiFactor.user;
        const newAccessToken = await checkTokenTime(isExpired, expirationTime);
        const provider = providerData[0].providerId;
        const userData = {
          auth: {
            accessToken: newAccessToken ? newAccessToken : accessToken,
            expirationTime,
            refreshToken,
            fbId,
          },
          user: {
            provider,
            displayName,
            email,
            emailVerified,
            profilePic: photoURL,
            createdAt,
            lastLoginAt,
          },
        };

        // Setting Auth Header for Axios
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        // Auth API Call
        const dbUser = await getUser(fbId);
        if (!dbUser) {
          setError(500, "Unable to Sign In.");
        } else {
          const { sets } = dbUser.data.user;
          authed(userData);
          setSets(sets);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fbId, loggedIn]);

  return <></>;
}

// Redux
const ReduxState = (state) => ({
  user: state.user,
});

const ReduxActions = (dispatch) => ({
  authed: (userData) => dispatch(authed(userData)),
  setSets: (sets) => dispatch(setSets(sets)),
});

export default connect(ReduxState, ReduxActions)(AppAuth);
