import React from "react";

// React Router
import { useNavigate } from "react-router-dom";

// MUI
import { Box } from "@mui/material";

// Components
import UserPhoto from "../UserPhoto";

function CommunitySetCard(props) {
  const {
    setId,
    title,
    terms,
    users,
    creator: { displayName, fbId, photoURL },
    preview,
    setPreview,
  } = props;
  const navigate = useNavigate();
  const amountOfTerms = terms.length;
  const amountOfUsers = users.length;

  return (
    <Box className="community-set-card">
      {/* Set Info */}
      <Box className="set-info">
        <h3 className="text-overflow">{title}</h3>
        <Box className="row">
          <p>
            {amountOfTerms} {amountOfTerms > 1 ? "Terms" : "Term"}
          </p>{" "}
          <p>
            {amountOfUsers}{" "}
            {amountOfUsers > 1 || amountOfUsers === 0 ? "Users" : "User"}
          </p>
        </Box>
      </Box>

      {/* Profile */}
      <Box className="between-row">
        <Box className="row">
          <UserPhoto
            alt={fbId + "-creator-photo"}
            photoURL={photoURL}
            displayName={displayName}
            fbId={fbId}
          />
          <p className="display-name text-overflow">{displayName}</p>
        </Box>

        <button
          variant="button"
          className={`preview-btn ${
            setId === preview?.setId ? "active" : "not-active"
          }`}
          onClick={() => setPreview({ setId, title, terms })}
        >
          Preview
        </button>
      </Box>

      {/* Invisible Layer for Nav */}
      <Box
        className="click-layer"
        onClick={() => navigate(`/set/${setId}`)}
      ></Box>
    </Box>
  );
}

export default CommunitySetCard;
