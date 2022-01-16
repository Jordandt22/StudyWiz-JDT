import React from "react";

// MUI
import { Box } from "@material-ui/core";
import { Divider } from "@mui/material";

// Contexts
import { useSets } from "../../../context/sets/Sets.context";

// Components
import SetCard from "./SetCard";

function SetsList(props) {
  const { sets, title } = props;
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
          You haven't used any sets <span>{title}</span>
          {search ? ` named ${search}.` : "."}
        </p>
      ) : (
        <>
          {sets.map((set) => {
            const { title: setTitle, creator, _id, terms } = set;

            return (
              <SetCard
                key={_id}
                setId={_id}
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