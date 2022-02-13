import React from "react";

// React Router
import { useNavigate } from "react-router-dom";

// MUI
import { Box } from "@mui/material";

// Components
import UserPhoto from "../UserPhoto";

function SetCard(props) {
  const {
    creator: { photoURL, displayName, fbId },
    title,
    terms,
    setId,
  } = props;
  const navigate = useNavigate();
  const amountOfTerms = terms.length;

  return (
    <Box className="set-card" onClick={() => navigate(`/set/${setId}`)}>
      <Box className="set-info">
        <h4 className="text-overflow">{title}</h4>
        <p>
          {amountOfTerms} {amountOfTerms > 1 ? "Terms" : "Term"}
        </p>
      </Box>

      <Box className="row creator">
        <UserPhoto
          alt={`${fbId}-creator-photo`}
          photoURL={photoURL}
          displayName={displayName}
          className="creator-photo"
          fbId={fbId}
        />
        <p className="creator-name text-overflow">{displayName}</p>
      </Box>
    </Box>
  );
}

export default SetCard;
