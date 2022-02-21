import React, { createContext, useContext, useEffect, useRef } from "react";
import { connect } from "react-redux";

// Redux
import { setSets } from "../../redux/sets/sets.actions";

// Contexts
import { useReactQuery } from "../react-query/ReactQuery.context";

// Socket
import { io } from "socket.io-client";
import connectEvents from "./APISocket.events";

// APISocket Context
const APISocketContext = createContext();
export const useAPISocket = () => useContext(APISocketContext);

// Redux
const ReduxState = (state) => ({
  user: state.user,
});

const ReduxActions = (dispatch) => ({
  setSets: (sets) => dispatch(setSets(sets)),
});

export default connect(
  ReduxState,
  ReduxActions
)((props) => {
  const {
    user: {
      auth: { loggedIn, fbId, accessToken },
    },
  } = props;
  const { invalidateQuery } = useReactQuery();
  let APISocket = useRef(null);

  // Favorite a set
  const favoriteSet = (socket, setId) =>
    socket.emit("favorite-set", {
      fbId,
      setId,
    });

  // Favorite a set
  const favoriteTerm = (socket, setId, termId) =>
    socket.emit("favorite-term", {
      fbId,
      setId,
      termId,
    });

  // Creating a Socket Client for the API Namespace
  useEffect(() => {
    if (loggedIn && fbId && accessToken) {
      const socket = io(process.env.REACT_APP_PROXY_SERVER_URL + "/api", {
        auth: { token: accessToken },
      });
      APISocket.current = socket;

      // Events
      connectEvents(socket, { ...props, invalidateQuery });

      // CLEAN UP THE EFFECT
      return () => {
        socket.disconnect();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn, fbId, accessToken]);

  return (
    <APISocketContext.Provider value={{ APISocket, favoriteSet, favoriteTerm }}>
      {props.children}
    </APISocketContext.Provider>
  );
});
