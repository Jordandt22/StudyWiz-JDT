import React, { createContext, useContext, useState } from "react";

// Nav Context
const NavContext = createContext();
export const useNav = () => useContext(NavContext);

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const [menuOpen, setOpen] = useState(false);
  const toggleMenu = () => setOpen((prevState) => !prevState);

  // Content Links
  const contentLinks = [
    {
      label: "Community",
      path: "/community",
    },
    {
      label: "Vocab Sets",
      path: "/sets",
    },
    {
      label: "Schedule",
      path: "/schedule",
    },
    {
      label: "Settings",
      path: "/settings",
    },
  ];

  // Site Info Links
  const siteInfoLinks = [
    {
      label: "About",
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
  ];

  return (
    <NavContext.Provider
      value={{ menuOpen, toggleMenu, contentLinks, siteInfoLinks }}
    >
      {props.children}
    </NavContext.Provider>
  );
};
