import React from "react";

// MUI
import { Box } from "@mui/material";

// Contexts
import { useSet } from "../../../context/set/Set.context";

function ProgressBar(props) {
  const { terms } = props;
  const amountOfTerms = terms.length;
  const {
    terms: {
      currentTerm: { pos },
    },
  } = useSet();

  return (
    <Box className="fc-progress-bar">
      <Box className="between-row">
        <h6>Progress</h6>

        <p>
          {pos + 1}/{amountOfTerms}
        </p>
      </Box>

      <Box className="bar">
        <Box
          style={{ width: `${((pos + 1) / amountOfTerms) * 100}%` }}
          className="pg-bar"
        ></Box>
      </Box>
    </Box>
  );
}

export default ProgressBar;
