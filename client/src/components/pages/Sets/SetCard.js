import React from "react";

// React Router
import { useNavigate } from "react-router-dom";

// MUI
import { Box } from "@mui/material";

// Components
import UserPhoto from "../../templates/UserPhoto";

function SetCard(props) {
  const {
    setId,
    terms,
    title,
    creator: { displayName, fbId, photoURL },
  } = props;
  const navigate = useNavigate();
  const amountOfTerms = terms.length;

  return (
    <Box
      className="minimal-set-card between-row"
      onClick={() => navigate(`/set/${setId}`)}
    >
      {/* Set Info */}
      <Box className="set-info">
        <h4 className="text-overflow">{title}</h4>
        <p>
          {amountOfTerms} {amountOfTerms > 1 ? "Terms" : "Term"}
        </p>
      </Box>

      {/* User Profile */}
      <Box className="profile row">
        <UserPhoto
          alt="user-photo"
          photoURL={photoURL}
          displayName={displayName}
          fbId={fbId}
        />

        <h3 className="text-overflow">{displayName}</h3>
      </Box>
    </Box>
  );
}

export default SetCard;
