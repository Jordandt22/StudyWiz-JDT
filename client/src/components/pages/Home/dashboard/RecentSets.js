import React from "react";
import { connect } from "react-redux";

// Queries
import { useGetMultipleSets } from "../../../../query/queries";

// Utils
import {
  combineSetsData,
  sortSetsByRecent,
} from "../../../../utils/sets.utils";

// Components
import SetCard from "../../../templates/sets/SetCard";
import ErrorBox from "../../../layout/error/ErrorBox";
import SetsSkeleton from "../../../templates/sets/skeletons/SetsSkeleton";

function RecentSets(props) {
  const {
    user: {
      auth: { fbId },
    },
    sets,
    limit,
  } = props;
  const { data, isLoading, isError, error } = useGetMultipleSets(
    `${fbId}_RECENT_SETS`,
    {
      fbId,
      sets,
    }
  );

  // Loading & Error
  if (isLoading) {
    return <SetsSkeleton numOfSets={limit} />;
  } else if (isError) {
    return <ErrorBox message={error.message} />;
  }

  const { sets: setsData } = data.data;
  const combinedSets = combineSetsData(sets, setsData);
  const sortedSets = sortSetsByRecent(combinedSets);
  return (
    <>
      {sortedSets.map((set) => {
        const { title, creator, terms, setId } = set;

        return (
          <SetCard
            key={`${setId}-recent-set`}
            title={title}
            creator={creator}
            terms={terms}
            setId={setId}
          />
        );
      })}
    </>
  );
}

// Redux
const ReduxState = (state) => ({
  user: state.user,
});

export default connect(ReduxState)(RecentSets);
