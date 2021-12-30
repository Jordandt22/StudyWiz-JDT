import React, { useEffect } from "react";

// React Router
import { NavLink } from "react-router-dom";

// MUI
import { Box } from "@material-ui/core";

// Contexts
import { useCommunity } from "../../../context/community/Community.context";

// Components
import CommunitySetCard from "./CommunitySetCard";
import SetsPageNav from "./SetsPageNav";

function CommunityPageSets(props) {
  const { sets, next } = props;
  const noSets = sets ? sets.length <= 0 : true;
  const { preview, setPreview } = useCommunity();

  useEffect(() => {
    if (!noSets) {
      const { title, _id, terms } = sets[0];
      setPreview({ title, setId: _id, terms });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sets]);

  return (
    <Box className="community-sets">
      {noSets ? (
        <Box className="no-recent-sets">
          <p>It looks like there aren't any community sets available.</p>
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
      {!noSets && <SetsPageNav next={next} />}
    </Box>
  );
}

export default CommunityPageSets;
