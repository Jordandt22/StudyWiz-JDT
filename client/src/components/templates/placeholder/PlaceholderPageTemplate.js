import React from "react";

// React Router
import { NavLink } from "react-router-dom";

// MUI
import { Container, Box } from "@material-ui/core";

// Components
import Footer from "../../layout/footer/Footer";

function PlaceholderPageTemplate(props) {
  const { title, message } = props;

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
          <NavLink to="/" className="link">
            Home
          </NavLink>

          <p>or</p>

          <NavLink to="/community" className="link">
            Explore
          </NavLink>
        </Box>
      </Container>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default PlaceholderPageTemplate;
