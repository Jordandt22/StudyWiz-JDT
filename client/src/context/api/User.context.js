import React, { createContext, useContext } from "react";
import { connect } from "react-redux";

// Axios
import axios from "axios";
import { urls } from "../../config/urls";

// Redux
import { setAlert } from "../../redux/global/global.actions";

// User API
const UserAPIContext = createContext();
export const useUserAPIContext = () => useContext(UserAPIContext);

// Redux
const ReduxActions = (dispatch) => ({
  setAlert: (alert) => dispatch(setAlert(alert)),
});

// eslint-disable-next-line import/no-anonymous-default-export
export default connect(
  null,
  ReduxActions
)((props) => {
  const { setAlert } = props;
  const errorHandler = (err) => {
    const { status, response } = err;
    if (!response || !status) {
      console.log(err);
      setAlert({
        message: "Sorry, a problem occured.",
        severity: "error",
        title: "Error",
      });
    } else {
      console.log(err.response, status);
      setAlert({
        message: `ERROR ${status} - Sorry, a problem occured.`,
        severity: "error",
        title: "Error",
      });
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
        api: {
          getUser,
        },
      }}
    >
      {props.children}
    </UserAPIContext.Provider>
  );
});
