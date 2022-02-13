import React, { createContext, useContext, useState } from "react";

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

  // Terms
  const [currentTerm, setCurTerm] = useState({
    pos: 0,
    showTerm: true,
  });
  const prevTerm = () =>
    setCurTerm((curTerm) => {
      const { pos: curPos } = curTerm;

      return curPos > 0
        ? {
            pos: curPos - 1,
            showTerm: true,
          }
        : curTerm;
    });

  const nextTerm = (amountOfTerms) =>
    setCurTerm((curTerm) => {
      const { pos: curPos } = curTerm;

      return curPos < amountOfTerms - 1
        ? {
            pos: curPos + 1,
            showTerm: true,
          }
        : curTerm;
    });

  const flipCard = () =>
    setCurTerm((curTerm) => ({ ...curTerm, showTerm: !curTerm.showTerm }));

  // Key Down Functions
  const handleKeyDown = (e, amountOfTerms) => {
    switch (e.code) {
      case "Space":
        if (e.target === document.body) {
          e.preventDefault();
          return flipCard();
        } else {
          return;
        }

      case "ArrowLeft":
        return prevTerm();

      case "ArrowRight":
        return nextTerm(amountOfTerms);

      default:
        return;
    }
  };

  // Keyboard
  const [keyboardOpen, setOpen] = useState(false);
  const openKeyboard = () => setOpen(true);
  const closeKeyboard = () => setOpen(false);

  return (
    <SetContext.Provider
      value={{
        getStudyTools,
        getGames,
        handleKeyDown,
        terms: {
          currentTerm,
          prevTerm,
          nextTerm,
          flipCard,
        },
        keyboard: {
          keyboardOpen,
          openKeyboard,
          closeKeyboard,
        },
      }}
    >
      {props.children}
    </SetContext.Provider>
  );
};
