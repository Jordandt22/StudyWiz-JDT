import React from "react";

// Contexts
import NavContextProvider from "./nav/Nav.context";
import APISocketContextProvider from "./api-socket/APISocket.context";
import UserContextProvider from "./api/User.context";
import CommunityContextProvider from "./community/Community.context";
import SearchContextProvider from "./search/Search.context";

function ContextProvider(props) {
  return (
    <NavContextProvider>
      <CommunityContextProvider>
        <SearchContextProvider>
          <UserContextProvider>
            <APISocketContextProvider>
              {props.children}
            </APISocketContextProvider>
          </UserContextProvider>
        </SearchContextProvider>
      </CommunityContextProvider>
    </NavContextProvider>
  );
}

export default ContextProvider;
