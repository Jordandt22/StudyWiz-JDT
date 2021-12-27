import React from "react";
import { connect } from "react-redux";

// Queries
import { useGetMultipleSets } from "../../../../query/queries";

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
  return (
    <>
      {setsData.map((set) => {
        const { title, creator, terms, _id } = set;

        return (
          <SetCard
            key={`${_id}-recent-set`}
            title={title}
            creator={creator}
            terms={terms}
            setId={_id}
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
