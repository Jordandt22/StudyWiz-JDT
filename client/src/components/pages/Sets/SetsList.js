import React from "react";

// MUI
import { Box, Divider } from "@mui/material";

// Contexts
import { useSets } from "../../../context/sets/Sets.context";

// Components
import SetCard from "./SetCard";

function SetsList(props) {
  const { sets, title, isSortedByRecent } = props;
  const { search } = useSets();

  return (
    <Box className="sets-list">
      <Box className="between-row">
        <Divider textAlign="left" className="divider">
          <h3>{title}</h3>
        </Divider>
      </Box>

      {/* Sets */}
      {sets.length <= 0 ? (
        <p className="no-sets">
          You haven't {isSortedByRecent ? "used" : "created"} any sets{" "}
          <span>{title}</span>
          {search ? ` named ${search}.` : "."}
        </p>
      ) : (
        <>
          {sets.map((set) => {
            const { title: setTitle, creator, setId, terms } = set;

            return (
              <SetCard
                key={setId}
                setId={setId}
                title={setTitle}
                terms={terms}
                creator={creator}
              />
            );
          })}
        </>
      )}
    </Box>
  );
}

export default SetsList;
