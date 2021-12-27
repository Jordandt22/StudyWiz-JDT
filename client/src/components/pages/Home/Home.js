import React from "react";
import { connect } from "react-redux";

// Components
import Dashboard from "./Dashboard";
import LandingPage from "./LandingPage";

function Home(props) {
  const {
    user: {
      auth: { loggedIn },
    },
  } = props;

  return <>{loggedIn ? <Dashboard /> : <LandingPage />}</>;
}

// Redux
const ReduxState = (state) => ({
  user: state.user,
});

export default connect(ReduxState)(Home);
