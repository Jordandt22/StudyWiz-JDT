import React from "react";

// Contexts
import APISocketContextProvider from "./api-socket/APISocket.context";
import UserContextProvider from "./api/User.context";

function ContextProvider(props) {
  return (
    <UserContextProvider>
      <APISocketContextProvider>{props.children}</APISocketContextProvider>
    </UserContextProvider>
  );
}

export default ContextProvider;
