import React from "react";

// React Router
import { NavLink } from "react-router-dom";

// MUI
import { Box } from "@material-ui/core";

function FooterNav(props) {
  const {
    nav: { label, links },
  } = props;

  return (
    <Box className="footer-nav">
      <h4>{label}</h4>

      {links.map((link) => {
        const { label: linkLabel, path } = link;

        return (
          <NavLink key={`${linkLabel}-footer-link`} to={path} className="link">
            {linkLabel}
          </NavLink>
        );
      })}
    </Box>
  );
}

export default FooterNav;
