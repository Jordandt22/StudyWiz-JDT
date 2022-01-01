import React from "react";
import { connect } from "react-redux";

// MUI
import { Box } from "@material-ui/core";

// Utils
import {
  combineSetsData,
  organizeSets,
  searchSets,
  sortSets,
} from "../../../utils/sets.utils";

// Queries
import { useGetMultipleSets } from "../../../query/queries";

// Contexts
import { useSets } from "../../../context/sets/Sets.context";

// Components
import SetsList from "./SetsList";

function SetsQuery(props) {
  const {
    user: {
      auth: { fbId },
    },
    sets,
  } = props;
  const { filter, sortedBy, search } = useSets();
  const queryKey = `${fbId}_SETS_FILTER:${filter}`;
  const { data, isLoading, isError, error } = useGetMultipleSets(queryKey, {
    fbId,
    sets,
  });

  // Loading & Error
  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>{error.message}</div>;
  }

  const { sets: setsData } = data.data;
  const searchedSets = search ? searchSets(setsData, search) : setsData;
  const sortedSets = sortSets(searchedSets, sortedBy);
  const combinedSetsData = combineSetsData(sets, sortedSets);
  const { thisWeekSets, notThisWeekSets } = organizeSets(
    combinedSetsData,
    sortedBy === 0
  );
  return (
    <Box className="sets">
      {/* This Week Sets */}
      <SetsList sets={thisWeekSets} title="This Week" />

      {/* Before This Week Sets */}
      <SetsList sets={notThisWeekSets} title="Before This Week" />
    </Box>
  );
}

// Redux
const ReduxState = (state) => ({
  user: state.user,
});

export default connect(ReduxState)(SetsQuery);
