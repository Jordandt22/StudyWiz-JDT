import React, { useEffect } from "react";

// MUI
import { Container, Box } from "@mui/material";

// Contexts
import { useCommunity } from "../../../context/community/Community.context";

// Components
import Filters from "../../templates/community/Filters";
import CommunityQuery from "./CommunityQuery";
import CommunityDisplay from "../../templates/community/CommunityDisplay";
import SetPreview from "../../templates/community/SetPreview";

function Community() {
  const { sortedBy, sortedByFilter, preview, resetCommunityContext } =
    useCommunity();

  // Resetting Search Context
  useEffect(() => {
    resetCommunityContext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="page-container community-container">
      <h1 className="page-title">Community Sets</h1>

      {/* Filters */}
      <Filters sortedBy={sortedBy} sortedByFilter={sortedByFilter} />

      {/* Vocab Sets */}
      <Box className="main">
        {/* Vocab Sets */}
        <CommunityDisplay className="vocab-sets-display" title="Vocab Sets">
          <CommunityQuery />
        </CommunityDisplay>

        {/* Set Preview */}
        <SetPreview preview={preview} />
      </Box>
    </Container>
  );
}

export default Community;
