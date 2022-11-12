import React from "react";

// React Router
import { NavLink } from "react-router-dom";

// MUI
import { Container } from "@mui/material";

function LandingPage() {
  return (
    <Container
      style={{
        background: `url(${
          process.env.PUBLIC_URL + "/assets/images/sw_studying.png"
        })`,
      }}
      className="landing-page-container"
    >
      <div className="shadow">
        <h1>Need Help Studying?</h1>
        <div>
          <p>
            With <span>StudyWiz</span>, you'll have access to many different
            tools to help you on your educational journey. Like flashcards,
            games, and many other activities.
          </p>
          <p>
            You'll also be able to study with others through community sets and
            explore all your favorite subjects.
          </p>
        </div>

        <NavLink to="/signup">Start Now</NavLink>
      </div>
    </Container>
  );
}

export default LandingPage;
