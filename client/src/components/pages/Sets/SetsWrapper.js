import React from "react";
import { connect } from "react-redux";

// React Router
import { NavLink } from "react-router-dom";

// Utils
import { filterSets } from "../../../utils/sets.utils";

// MUI
import { Box } from "@mui/material";

// Contexts
import { useSets } from "../../../context/sets/Sets.context";

// Components
import SetsQuery from "./SetsQuery";

function SetsWrapper(props) {
  const {
    user: {
      auth: { fbId },
    },
    sets: { sets },
  } = props;
  const { filter } = useSets();
  const filteredSets = filterSets(fbId, sets, filter);

  return (
    <Box className="sets-box">
      <h2>Vocab Sets</h2>

      {/* Sets */}
      {filteredSets.length > 0 ? (
        <SetsQuery sets={filteredSets} />
      ) : (
        <Box className="no-recent-sets">
          <p>
            {filter === 1
              ? "It looks like you haven't created any sets yet."
              : filter === 2
              ? "It looks like you haven't favorited any sets yet."
              : filter === 3
              ? "It looks like you haven't used any sets from other people yet."
              : "It looks like you haven't used any vocab sets yet."}
          </p>
          {filter === 1 ? (
            <NavLink to="/create" className="link primary-btn">
              Create One
            </NavLink>
          ) : (
            <NavLink to="/community" className="link primary-btn">
              Explore
            </NavLink>
          )}
        </Box>
      )}
    </Box>
  );
}

// Redux
const ReduxState = (state) => ({
  user: state.user,
  sets: state.sets,
});

export default connect(ReduxState)(SetsWrapper);
