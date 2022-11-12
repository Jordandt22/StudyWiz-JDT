import React from "react";

// React Router
import { useNavigate } from "react-router-dom";

// MUI
import { Box } from "@mui/material";

function MinimalSetCard(props) {
  const {
    title,
    terms,
    creator: { displayName },
    setId,
  } = props;
  const navigate = useNavigate();
  const amountOfTerms = terms.length;

  return (
    <Box className="minimal-set-card" onClick={() => navigate(`/set/${setId}`)}>
      <Box className="row">
        <h4 className="text-overflow">{title}</h4>
        <span>
          {amountOfTerms} {amountOfTerms > 1 ? "Terms" : "Term"}
        </span>
      </Box>

      {/* Creator */}
      <p className="text-overflow">By {displayName}</p>
    </Box>
  );
}

export default MinimalSetCard;
