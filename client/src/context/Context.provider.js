import React from "react";

// Contexts
import NavContextProvider from "./nav/Nav.context";
import APISocketContextProvider from "./api-socket/APISocket.context";
import UserContextProvider from "./api/User.context";
import CommunityContextProvider from "./community/Community.context";
import SearchContextProvider from "./search/Search.context";
import SetsContextProvider from "./sets/Sets.context";
import SetContextProvider from "./set/Set.context";

function ContextProvider(props) {
  return (
    <NavContextProvider>
      <SetsContextProvider>
        <SetContextProvider>
          <CommunityContextProvider>
            <SearchContextProvider>
              <UserContextProvider>
                <APISocketContextProvider>
                  {props.children}
                </APISocketContextProvider>
              </UserContextProvider>
            </SearchContextProvider>
          </CommunityContextProvider>
        </SetContextProvider>
      </SetsContextProvider>
    </NavContextProvider>
  );
}

export default ContextProvider;
