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
import DeletePopUp from "./popups/DeletePopUp";

function SetCreator(props) {
  const {
    userSet,
    setId,
    terms,
    info,
    user: {
      auth: { fbId },
    },
  } = props;
  const favorite = userSet?.favorite;
  const {
    title,
    privacy: { hideCreator },
  } = info;
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
  } else if (data.data.error) {
    return <ErrorBox message={data.data.error} />;
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
        title={title}
        setForEditForm={{
          title: info.title,
          privacy: {
            hideCreator,
            private: info.privacy.private,
          },
          terms: terms.map(({ term, definition }) => ({ term, definition })),
        }}
      />

      {/* Pop Ups */}

      {/* Share & Export */}
      <SharePopUp terms={terms} />
      <LinkCopiedNotification />
      <TermsCopiedNotification />

      {/* Information */}
      <InfoPopUp info={info} creator={creator} setId={setId} />

      {/* Delete */}
      <DeletePopUp info={info} terms={terms} setId={setId} />
    </Box>
  );
}

// Redux
const ReduxState = (state) => ({
  user: state.user,
});

export default connect(ReduxState)(SetCreator);
