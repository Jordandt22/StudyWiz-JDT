import React from "react";

// React Router
import { NavLink } from "react-router-dom";

// MUI
import { Box } from "@mui/material";

// Components
import CommunityDisplay from "./CommunityDisplay";

function SetPreview(props) {
  const {
    preview: { setId, title, terms },
  } = props;
  const amountOfTerms = terms.length;

  return (
    <CommunityDisplay className="set-preview-display" title="Set Preview">
      <Box className="set-preview">
        {/* Set Info */}
        <Box className="between-row">
          <Box className="set-info">
            <h3>{title}</h3>
            <p>
              {amountOfTerms} {amountOfTerms > 1 ? "Terms" : "Term"}
            </p>
          </Box>

          {setId && (
            <NavLink to={`/set/${setId}`} className="primary-btn study-btn">
              Study
            </NavLink>
          )}
        </Box>

        {/* Terms */}
        <Box className="terms-box">
          {terms.slice(0, 5).map((t) => {
            const { term, definition, _id: termId } = t;

            return (
              <Box key={termId} className="term">
                <h4>{term}</h4>
                <p>{definition}</p>
              </Box>
            );
          })}
        </Box>
      </Box>
    </CommunityDisplay>
  );
}

export default SetPreview;
