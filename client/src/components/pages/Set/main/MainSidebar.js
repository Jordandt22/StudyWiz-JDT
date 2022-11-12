import React from "react";

// React Router
import { NavLink } from "react-router-dom";

// MUI
import { Box } from "@mui/material";

// Contexts
import { useSet } from "../../../../context/set/Set.context";

// Side Bar List
const SideBarList = (props) => {
  const { id, title, list } = props;

  return (
    <Box id={id} className="section">
      <h4>{title}</h4>

      {list.map((item) => {
        const { label, path, icon } = item;

        return (
          <NavLink key={label + "-" + path} to={path} className="link row">
            {icon}
            <p>{label}</p>
          </NavLink>
        );
      })}
    </Box>
  );
};

function MainSideBar(props) {
  const { setId } = props;
  const { getStudyTools, getGames } = useSet();
  const studyTools = getStudyTools(setId);
  const games = getGames(setId);

  return (
    <Box className="set-side-bar">
      {/* Study Tools */}
      <SideBarList id="study-section" title="Study" list={studyTools} />

      {/* Study Games */}
      <SideBarList id="games-section" title="Games" list={games} />
    </Box>
  );
}

export default MainSideBar;
