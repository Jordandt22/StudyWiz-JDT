import React from "react";
import { connect } from "react-redux";

// Utils
import { getRandomColor } from "../../utils/global.utils";

// Components
import LazyLoadImage from "./LazyLoadImage";

// MUI
import { Box } from "@material-ui/core";

function UserPhoto(props) {
  const {
    user: {
      auth: { fbId: authedUserFbId },
      photoColor,
    },
    onClick,
    alt,
    photoURL,
    displayName,
    className,
    fbId,
  } = props;
  const isUser = authedUserFbId === fbId;

  return (
    <Box
      onClick={onClick}
      style={{
        background: photoURL ? "lightgrey" : isUser ? photoColor : "lightgrey",
      }}
      className={"user-photo-box " + className}
    >
      {photoURL ? (
        <LazyLoadImage
          alt={alt ? alt : fbId + "-photo"}
          src={photoURL}
          className="user-photo"
        />
      ) : (
        <p>{displayName[0]}</p>
      )}
    </Box>
  );
}

// Redux
const ReduxState = (state) => ({
  user: state.user,
});

export default connect(ReduxState)(UserPhoto);
