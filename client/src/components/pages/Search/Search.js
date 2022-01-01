import React, { useEffect, useRef } from "react";

// React Router
import { useParams } from "react-router-dom";

// MUI
import { Container, Box } from "@material-ui/core";

// Search
import { useSearch } from "../../../context/search/Search.context";

// Components
import Filters from "../../templates/community/Filters";
import SearchQuery from "./SearchQuery";
import CommunityDisplay from "../../templates/community/CommunityDisplay";
import SetPreview from "../../templates/community/SetPreview";
import SearchBar from "../../templates/SearchBar";

function Search() {
  const { query } = useParams();
  const {
    sortedBy,
    sortedByFilter,
    ownedBy,
    ownedByFilter,
    preview,
    resetSearchContext,
  } = useSearch();

  // Resetting Search Context
  const initialValues = useRef({ query });
  useEffect(() => {
    initialValues.current = { query };
    resetSearchContext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <Container className="page-container community-container">
      {/* Search Bar */}
      {initialValues.current.query === query && (
        <SearchBar
          initialValues={initialValues.current}
          className="community-search-bar"
        />
      )}

      {/* Filters */}
      <Filters
        sortedBy={sortedBy}
        sortedByFilter={sortedByFilter}
        ownedBy={ownedBy}
        ownedByFilter={ownedByFilter}
      />

      {/* Vocab Sets */}
      <Box className="main">
        {/* Vocab Sets */}
        <CommunityDisplay className="vocab-sets-display" title="Vocab Sets">
          <SearchQuery query={query} />
        </CommunityDisplay>

        {/* Set Preview */}
        <SetPreview preview={preview} />
      </Box>
    </Container>
  );
}

export default Search;
