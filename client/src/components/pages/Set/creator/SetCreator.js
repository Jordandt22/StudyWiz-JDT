import React from "react";
import { connect } from "react-redux";

// MUI
import { Box } from "@mui/material";

// Queries
import { useGetSetCreator } from "../../../../query/queries";

// Contexts
import { useAPISocket } from "../../../../context/api-socket/APISocket.context";

// Components
import ErrorBox from "../../../layout/error/ErrorBox";
import UserPhoto from "../../../templates/UserPhoto";
import CreatorSkeleton from "../skeletons/CreatorSkeleton";
import FCSetOptions from "./FCSetOptions";
import SharePopUp from "./popups/SharePopUp";
import LinkCopiedNotification from "../../../layout/alert/LinkCopiedNotification";
import TermsCopiedNotification from "../../../layout/alert/TermsCopiedNotification";
import InfoPopUp from "./popups/InfoPopUp";

function SetCreator(props) {
  const {
    userSet: { favorite },
    setId,
    terms,
    info,
    user: {
      auth: { fbId },
    },
  } = props;
  const { APISocket, favoriteSet } = useAPISocket();
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

  const { creator, isCreator } = data.data;
  const { displayName, photoURL, fbId: creatorFbId } = creator;
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
      <FCSetOptions
        favorite={favorite}
        isCreator={isCreator}
        APISocket={APISocket}
        favoriteSet={favoriteSet}
        setId={setId}
      />

      {/* Pop Ups */}

      {/* Share & Export */}
      <SharePopUp terms={terms} />
      <LinkCopiedNotification />
      <TermsCopiedNotification />

      {/* Information */}
      <InfoPopUp info={info} creator={creator} setId={setId} />
    </Box>
  );
}

// Redux
const ReduxState = (state) => ({
  user: state.user,
});

export default connect(ReduxState)(SetCreator);
