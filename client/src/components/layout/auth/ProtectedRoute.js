import React from "react";
import { connect } from "react-redux";

// Components
import PlaceholderPageTemplate from "../../templates/placeholder/PlaceholderPageTemplate";

function ProtectedRoute(props) {
  const {
    user: {
      auth: { loggedIn },
    },
    Component,
  } = props;

  if (!loggedIn) {
    return (
      <PlaceholderPageTemplate
        title={<p className="row">Not Authorized</p>}
        message="To access this content, you must sign up or log in."
        links={[
          { label: "Sign Up", path: "/signup" },
          { label: "Log In", path: "/login" },
        ]}
      />
    );
  } else {
    return Component;
  }
}

// Redux
const ReduxState = (state) => ({
  user: state.user,
});

export default connect(ReduxState)(ProtectedRoute);
