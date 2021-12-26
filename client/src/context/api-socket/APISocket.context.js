import React, { createContext, useContext, useEffect, useRef } from "react";
import { connect } from "react-redux";

// Socket
import { io } from "socket.io-client";

// APISocket Context
const APISocketContext = createContext();
export const useAPISocket = () => useContext(APISocketContext);

// Redux
const ReduxState = (state) => ({
  user: state.user,
});

export default connect(ReduxState)((props) => {
  const {
    user: {
      auth: { loggedIn, fbId, accessToken },
    },
  } = props;
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
  // useEffect(() => {
  //   if (loggedIn && fbId && accessToken) {
  //     const socket = io(process.env.REACT_APP_PROXY_SERVER_URL + "/api", {
  //       auth: { token: accessToken },
  //     });
  //     APISocket.current = socket;

  //     // Connection Error
  //     socket.on("connect_error", (data) => {
  //       console.log(data);
  //     });

  //     // Favorite Set Response
  //     socket.on("favorite-set-response", (data) => {
  //       console.log(data);
  //     });

  //     // Favorite Set Response Error
  //     socket.on("favorite-set-response-error", (data) => {
  //       console.log(data);
  //     });

  //     // Favorite Term Response
  //     socket.on("favorite-term-response", (data) => {
  //       console.log(data);
  //     });

  //     // Favorite Term Response Error
  //     socket.on("favorite-term-response-error", (data) => {
  //       console.log(data);
  //     });

  //     // CLEAN UP THE EFFECT
  //     return () => {
  //       socket.disconnect();
  //     };
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [loggedIn, fbId, accessToken]);

  return (
    <APISocketContext.Provider value={{ APISocket, favoriteSet, favoriteTerm }}>
      {props.children}
    </APISocketContext.Provider>
  );
});
