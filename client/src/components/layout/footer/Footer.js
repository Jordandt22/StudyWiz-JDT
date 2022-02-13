import React from "react";

// MUI
import { Box } from "@mui/material";

// Components
import FooterNav from "./FooterNav";
import LazyLoadImage from "../../templates/LazyLoadImage";

function Footer() {
  const featuresNav = {
    label: "Features",
    links: [
      {
        label: "Vocabulary Sets",
        path: "/sets",
      },
      {
        label: "Community",
        path: "/community",
      },
      {
        label: "Schedule",
        path: "/schedule",
      },
    ],
  };

  const aboutNav = {
    label: "About",
    links: [
      {
        label: "Site Information",
        path: "/about",
      },
      {
        label: "Terms of Service",
        path: "/tos",
      },
      {
        label: "Privacy Policy",
        path: "/privacy",
      },
    ],
  };

  const contactNav = {
    label: "Contact",
    links: [
      {
        label: "StudyWizStaff@gmail.com",
        path: "/contact",
      },
    ],
  };

  return (
    <footer className="footer">
      {/* Footer Nav */}
      <Box className="footer-navs">
        <FooterNav nav={featuresNav} />
        <FooterNav nav={aboutNav} />
        <FooterNav nav={contactNav} />
      </Box>

      {/* Copyright */}
      <p className="copyright">
        © {new Date().getFullYear()} <strong>StudyWiz</strong>
      </p>

      {/* Image */}
      <LazyLoadImage
        alt="footer-image"
        src="/assets/images/sw_researching.png"
        className="footer-image"
      />
    </footer>
  );
}

export default Footer;
