import React, { createContext, useContext } from "react";

// Components
import FlashcardsIcon from "./study/FlashcardsIcon";
import MatchIcon from "./games/MatchIcon";

// Set Context
export const SetContext = createContext();
export const useSet = () => useContext(SetContext);

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const getStudyTools = (setId) => [
    {
      label: "Flashcards",
      path: `/set/${setId}/flashcards`,
      icon: <FlashcardsIcon />,
    },
  ];

  const getGames = (setId) => [
    {
      label: "Match",
      path: `/set/${setId}/match`,
      icon: <MatchIcon />,
    },
  ];

  return (
    <SetContext.Provider value={{ getStudyTools, getGames }}>
      {props.children}
    </SetContext.Provider>
  );
};
