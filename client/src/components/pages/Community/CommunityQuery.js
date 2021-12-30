import React from "react";
import { connect } from "react-redux";

// Queries
import { useGetCommunitySets } from "../../../query/queries";

// Contexts
import { useCommunity } from "../../../context/community/Community.context";

// Components
import CommunityPageSets from "../../templates/community/CommunityPageSets";
import CommunitySetCardSkeleton from "../../templates/community/skeletons/CommunitySetCardSkeleton";
import ErrorBox from "../../layout/error/ErrorBox";

function CommunityQuery(props) {
  const {
    user: {
      auth: { fbId },
    },
  } = props;
  const { sortedBy, page } = useCommunity();
  const filter =
    sortedBy === 1 ? "newest" : sortedBy === 2 ? "oldest" : "popularity";
  const limit = 5;
  const queryKey = `${fbId}_COMMUNITY_FILTER:${filter}_PAGE:${page}_LIMIT:${limit}`;
  const { data, isLoading, isError, error } = useGetCommunitySets(
    queryKey,
    {
      fbId,
      filter,
      page,
      limit,
    },
    { keepPreviousData: false }
  );

  // Loading & Error
  if (isLoading) {
    return <CommunitySetCardSkeleton limit={limit} />;
  } else if (isError) {
    return <ErrorBox message={error.message} />;
  }

  const { sets: setsData, next: nextData } = data.data;
  const sets = setsData.sets ? setsData.sets : setsData;
  const next = nextData ? nextData : setsData.next;
  return <CommunityPageSets sets={sets} next={next} />;
}

// Redux
const ReduxState = (state) => ({
  user: state.user,
});

export default connect(ReduxState)(CommunityQuery);
