import React, { useEffect } from "react";

// React Router
import { NavLink } from "react-router-dom";

// MUI
import { Box } from "@mui/material";

// Components
import CommunitySetCard from "./CommunitySetCard";
import SetsPageNav from "./SetsPageNav";

function CommunityPageSets(props) {
  const {
    noSetsMessage,
    sets,
    next,
    page,
    prevPage,
    nextPage,
    preview,
    setPreview,
    resetPreview,
  } = props;
  const noSets = sets ? sets.length <= 0 : true;

  // Setting the Vocab Set Preview to the first Vocab set.
  useEffect(() => {
    if (!noSets) {
      const { title, _id, terms } = sets[0];
      setPreview({ title, setId: _id, terms });
    } else {
      resetPreview();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sets]);

  return (
    <Box className="community-sets">
      {noSets ? (
        <Box className="no-recent-sets">
          <p>{noSetsMessage}</p>
          <NavLink to="/create" className="link primary-btn">
            Create One
          </NavLink>
        </Box>
      ) : (
        <>
          {sets.map((set) => {
            const { title, terms, users, creator, _id } = set;

            return (
              <CommunitySetCard
                key={`community-set-${_id}`}
                setId={_id}
                title={title}
                terms={terms}
                users={users}
                creator={creator}
                preview={preview}
                setPreview={setPreview}
              />
            );
          })}
        </>
      )}

      {/* Page Nav */}
      {!noSets && (
        <SetsPageNav
          next={next}
          page={page}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      )}
    </Box>
  );
}

export default CommunityPageSets;
