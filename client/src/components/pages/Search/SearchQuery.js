import React from "react";
import { connect } from "react-redux";

// Queries
import { useGetSearchedSets } from "../../../query/queries";

// Contexts
import { useSearch } from "../../../context/search/Search.context";

// Components
import CommunityPageSets from "../../templates/community/CommunityPageSets";
import CommunitySetCardSkeleton from "../../templates/community/skeletons/CommunitySetCardSkeleton";
import ErrorBox from "../../layout/error/ErrorBox";

function SearchQuery(props) {
  const {
    user: {
      auth: { fbId },
    },
    query,
  } = props;
  const {
    sortedBy,
    ownedBy,
    page,
    prevPage,
    nextPage,
    preview,
    setPreview,
    resetPreview,
  } = useSearch();

  // Filters
  const filter =
    sortedBy === 1 ? "newest" : sortedBy === 2 ? "oldest" : "popularity";
  const ownedByFilter =
    ownedBy === 1 ? "me" : ownedBy === 2 ? "others" : "anyone";

  // Query
  const limit = 5;
  const queryKey = `${fbId}_COMMUNITY_FILTER:${filter}_PAGE:${page}_LIMIT:${limit}_OWNED_BY:${ownedByFilter}_SEARCH:${query}`;
  const { data, isLoading, isError, error } = useGetSearchedSets(
    queryKey,
    {
      fbId,
      filter,
      page,
      limit,
      ownedBy: ownedByFilter,
      query,
    },
    { keepPreviousData: false }
  );

  // Loading & Error
  if (isLoading) {
    return <CommunitySetCardSkeleton limit={limit} />;
  } else if (isError) {
    return <ErrorBox message={error.message} />;
  }

  // Data
  const { sets: setsData, next: nextData } = data.data;
  const sets = setsData.sets ? setsData.sets : setsData;
  const next = nextData ? nextData : setsData.next;
  return (
    <CommunityPageSets
      preview={preview}
      setPreview={setPreview}
      resetPreview={resetPreview}
      sets={sets}
      next={next}
      page={page}
      prevPage={prevPage}
      nextPage={nextPage}
      noSetsMessage={`It looks like there aren't any community sets that are owned by ${
        ownedByFilter === "me" ? "you" : ownedByFilter
      } and named ${query}.`}
    />
  );
}

// Redux
const ReduxState = (state) => ({
  user: state.user,
});

export default connect(ReduxState)(SearchQuery);
