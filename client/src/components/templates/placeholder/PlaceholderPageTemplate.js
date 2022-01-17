import React from "react";

// React Router
import { NavLink } from "react-router-dom";

// MUI
import { Container, Box } from "@material-ui/core";

// Components
import Footer from "../../layout/footer/Footer";

function PlaceholderPageTemplate(props) {
  const { title, message, links } = props;
  const firstLink = links && links[0];
  const secondLink = links && links[1];

  return (
    <>
      <Container className="page-container placeholder-container">
        {/* Top Box */}
        <Box className="rounded-box top-box">{title}</Box>

        {/* Mid Box */}
        <Box className="rounded-box mid-box">
          <p>{message}</p>
        </Box>

        {/* Bottom Box */}
        <Box className="rounded-box bot-box row">
          {/* First Link */}
          {firstLink ? (
            <NavLink to={firstLink.path} className="link">
              {firstLink.label}
            </NavLink>
          ) : (
            <NavLink to="/" className="link">
              Home
            </NavLink>
          )}

          <p>or</p>

          {secondLink ? (
            <NavLink to={secondLink.path} className="link">
              {secondLink.label}
            </NavLink>
          ) : (
            <NavLink to="/community" className="link">
              Explore
            </NavLink>
          )}
        </Box>
      </Container>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default PlaceholderPageTemplate;
