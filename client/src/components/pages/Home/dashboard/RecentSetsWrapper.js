import React from "react";
import { connect } from "react-redux";

// React Router
import { NavLink } from "react-router-dom";

// MUI
import { Box } from "@material-ui/core";

// Utils
import { sortSetsByRecent } from "../../../../utils/sets.utils";

// Components
import Display from "../../../templates/sets/Display";
import RecentSets from "./RecentSets";

function RecentSetsWrapper(props) {
  const {
    sets: { sets },
  } = props;
  const limit = 6;
  const sortedSets = sortSetsByRecent(sets).slice(0, limit);
  const noSets = sortedSets.length <= 0;

  return (
    <Display
      title="Recent Vocab Sets"
      link={!noSets && { path: "/sets", label: "View All" }}
    >
      {noSets ? (
        <Box className="no-recent-sets">
          <p>It looks like you haven't used any vocab sets yet.</p>
          <NavLink to="/community" className="link primary-btn">
            Explore Some ?
          </NavLink>
        </Box>
      ) : (
        <Box className="recent-sets-box">
          <RecentSets limit={limit} sets={sortedSets} />
        </Box>
      )}
    </Display>
  );
}

// Redux
const ReduxState = (state) => ({
  sets: state.sets,
});

export default connect(ReduxState)(RecentSetsWrapper);
