import React from "react";
import { connect } from "react-redux";

// MUI
import { Box, Tooltip } from "@mui/material";
import {
  ContentCopyRounded,
  StarBorderOutlined,
  StarRate,
  MoreHorizRounded,
} from "@mui/icons-material";

// Queries
import { useGetSetCreator } from "../../../../query/queries";

// Components
import ErrorBox from "../../../layout/error/ErrorBox";
import UserPhoto from "../../../templates/UserPhoto";
import CreatorSkeleton from "../skeletons/CreatorSkeleton";

function SetCreator(props) {
  const {
    userSet: { favorite },
    setId,
    user: {
      auth: { fbId },
    },
  } = props;
  const { data, isLoading, isError, error } = useGetSetCreator(
    `${fbId}_SET_SETID:${setId}_CREATOR`,
    {
      fbId,
      setId,
    }
  );

  // Loading & Error
  if (isLoading) {
    return <CreatorSkeleton />;
  } else if (isError) {
    return <ErrorBox message={error.message} />;
  }

  const {
    creator: { displayName, photoURL, fbId: creatorFbId },
    isCreator,
  } = data.data;
  return (
    <Box className="set-creator between-row">
      {/* Creator Profile */}
      <Box className="creator-profile row">
        <UserPhoto
          displayName={displayName}
          photoURL={photoURL}
          fbId={creatorFbId}
        />

        <Box className="creator-info">
          <p>Created By</p>
          <strong>{displayName}</strong>
        </Box>
      </Box>

      {/* Flashcard Options */}
      <Box className="fc-set-options row">
        {/* Copy Set */}
        <Tooltip title="Copy Set">
          <button variant="button" className="fc-set-opt-btn center">
            <ContentCopyRounded className="icon" />
          </button>
        </Tooltip>

        {/* Favorite Set */}
        <Tooltip title={!favorite ? "Favorite Set" : "Unfavorite Set"}>
          <button variant="button" className="fc-set-opt-btn center">
            {!favorite ? (
              <StarBorderOutlined className="icon" />
            ) : (
              <StarRate className="icon fav-icon" />
            )}
          </button>
        </Tooltip>

        {/* More Options (Only for Creator) */}
        {isCreator && (
          <Tooltip title="More">
            <button variant="button" className="fc-set-opt-btn center">
              <MoreHorizRounded className="icon" />
            </button>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
}

// Redux
const ReduxState = (state) => ({
  user: state.user,
});

export default connect(ReduxState)(SetCreator);
