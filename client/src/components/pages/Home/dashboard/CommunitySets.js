import React from "react";
import { connect } from "react-redux";

// React Router
import { NavLink } from "react-router-dom";

// Queries
import { useGetCommunitySets } from "../../../../query/queries";

// MUI
import { Box } from "@mui/material";

// Components
import Display from "../../../templates/sets/Display";
import MinimalSetCard from "../../../templates/sets/MinimalSetCard";
import MinimalSetsSkeleton from "../../../templates/sets/skeletons/MinimalSetsSkeleton";
import ErrorBox from "../../../layout/error/ErrorBox";

// Community Sets Display
const CommunitySetsDisplay = (props) => {
  const { link, children } = props;

  return (
    <Display title="Popular Community Sets" link={link}>
      {children}
    </Display>
  );
};

function CommunitySets(props) {
  const {
    user: {
      auth: { fbId },
    },
  } = props;
  const filter = "popularity";
  const page = 1;
  const limit = 6;
  const { data, isLoading, isError, error } = useGetCommunitySets(
    `${fbId}_COMMUNITY_FILTER:${filter}_PAGE:${page}_LIMIT:${limit}`,
    {
      fbId,
      filter,
      page,
      limit,
    }
  );

  // Loading & Error
  if (isLoading) {
    return (
      <CommunitySetsDisplay>
        <MinimalSetsSkeleton numOfSets={limit} />
      </CommunitySetsDisplay>
    );
  } else if (isError) {
    return (
      <CommunitySetsDisplay>
        <ErrorBox message={error.message} />
      </CommunitySetsDisplay>
    );
  }

  const { sets: setsData } = data.data;
  const sets = setsData.sets ? setsData.sets : setsData;
  const noSets = sets ? sets.length <= 0 : true;
  return (
    <CommunitySetsDisplay
      link={!noSets && { path: "/community", label: "View More" }}
    >
      {noSets ? (
        <Box className="no-recent-sets">
          <p>It looks like there aren't any community sets available.</p>
          <NavLink to="/create" className="link primary-btn">
            Create One
          </NavLink>
        </Box>
      ) : (
        <Box className="dashboard-community-sets">
          {sets.map((set) => {
            const { title, terms, creator, _id } = set;

            return (
              <MinimalSetCard
                key={`${_id}-community-set`}
                title={title}
                terms={terms}
                creator={creator}
                setId={_id}
              />
            );
          })}
        </Box>
      )}
    </CommunitySetsDisplay>
  );
}

// Redux
const ReduxState = (state) => ({
  user: state.user,
});

export default connect(ReduxState)(CommunitySets);
