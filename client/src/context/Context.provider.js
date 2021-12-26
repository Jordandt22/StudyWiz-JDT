import React from "react";

// Contexts
import NavContextProvider from "./nav/Nav.context";
import APISocketContextProvider from "./api-socket/APISocket.context";
import UserContextProvider from "./api/User.context";

function ContextProvider(props) {
  return (
    <NavContextProvider>
      <UserContextProvider>
        <APISocketContextProvider>{props.children}</APISocketContextProvider>
      </UserContextProvider>
    </NavContextProvider>
  );
}

export default ContextProvider;
