import React from "react";

// Contexts
import NavContextProvider from "./nav/Nav.context";
import APISocketContextProvider from "./api-socket/APISocket.context";
import UserContextProvider from "./api/User.context";
import CommunityContextProvider from "./community/Community.context";

function ContextProvider(props) {
  return (
    <NavContextProvider>
      <CommunityContextProvider>
        <UserContextProvider>
          <APISocketContextProvider>{props.children}</APISocketContextProvider>
        </UserContextProvider>
      </CommunityContextProvider>
    </NavContextProvider>
  );
}

export default ContextProvider;
