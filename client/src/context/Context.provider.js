import React from "react";
import UserContextProvider from "./api/User.context";

function ContextProvider(props) {
  return <UserContextProvider>{props.children}</UserContextProvider>;
}

export default ContextProvider;
