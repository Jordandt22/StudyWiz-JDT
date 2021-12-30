import React from "react";

// MUI
import { Container, Box } from "@material-ui/core";

// Contexts
import { useCommunity } from "../../../context/community/Community.context";

// Components
import Filters from "../../templates/community/Filters";
import CommunityQuery from "./CommunityQuery";
import ProtectedPage from "../../layout/auth/ProtectedPage";
import CommunityDisplay from "../../templates/community/CommunityDisplay";
import SetPreview from "../../templates/community/SetPreview";

function Community() {
  const { sortedBy, sortedByFilter } = useCommunity();

  return (
    <ProtectedPage>
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
          <SetPreview />
        </Box>
      </Container>
    </ProtectedPage>
  );
}

export default Community;
