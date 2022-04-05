import React, { createContext, useContext, useState } from "react";

// Axios
import axios from "axios";
import { urls } from "../../config/urls";

// User API
const UserAPIContext = createContext();
export const useUserAPIContext = () => useContext(UserAPIContext);

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const [error, setErr] = useState({
    isError: false,
    error: { message: "", status: 200 },
  });
  const setError = (status, message) =>
    setErr({ isError: true, error: { message, status } });
  const resetError = () =>
    setErr({ isError: false, error: { message: "", status: 200 } });
  const errorHandler = (err) => {
    const { status, response } = err;
    if (!response || !status) {
      setError(500, "A problem occured !");
    } else {
      console.log(err.response, status);
      // setError(500, "A problem occured !");
    }
  };

  // API Calls
  const { USER_URI } = urls;

  // Get User
  const getUser = async (fbId, errorCb) =>
    await axios.get(USER_URI + `/${fbId}`).catch((err) => {
      errorCb();
      errorHandler(err);
    });

  return (
    <UserAPIContext.Provider
      value={{
        error,
        setError,
        resetError,
        api: {
          getUser,
        },
      }}
    >
      {props.children}
    </UserAPIContext.Provider>
  );
};
