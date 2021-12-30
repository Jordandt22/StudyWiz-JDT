import React from "react";
import { connect } from "react-redux";

// MUI
import { Box } from "@material-ui/core";

function ProtectedPage(props) {
  const {
    user: {
      auth: { loggedIn },
    },
  } = props;

  if (!loggedIn) {
    return (
      <Box className="protected-page-msg">
        Please sign in to access this page.
      </Box>
    );
  }

  return <>{props.children}</>;
}

// Redux
const ReduxState = (state) => ({
  user: state.user,
});

export default connect(ReduxState)(ProtectedPage);
