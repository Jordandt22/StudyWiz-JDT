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
  const [termsOnFront, setTermsOnFront] = useState(true)
  const [currentTerm, setCurTerm] = useState({
    pos: 0,
    showTerm: true,
  });
  const resetCurTerm = () =>
    setCurTerm({
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

  // Terms Display
  const [showAll, setShowAll] = useState(true);

  // Creator Pop Ups
  const defaultCreatorPopUpsValue = {
    share: false,
    info: false,
    delete: false,
  };
  const [creatorPopUps, setCreatorPopUps] = useState(defaultCreatorPopUpsValue);
  const openCreatorPopUp = (name) =>
    setCreatorPopUps((prevState) => ({
      ...prevState,
      [name]: true,
    }));
  const closeCreatorPopUps = () =>
    setCreatorPopUps((prevState) => ({
      ...prevState,
      ...defaultCreatorPopUpsValue,
    }));

  // Creator Notifications
  const [creatorNotifs, setCreatorNotifs] = useState({
    share: false,
    export: false,
    delete: false,
  });
  const setPopUpNotification = (name, showNotif) =>
    setCreatorNotifs((prevState) => ({
      ...prevState,
      [name]: showNotif,
    }));

  return (
    <SetContext.Provider
      value={{
        getStudyTools,
        getGames,
        handleKeyDown,
        terms: {
          currentTerm,
          resetCurTerm,
          prevTerm,
          nextTerm,
          flipCard,
          termsOnFront, 
          setTermsOnFront
        },
        keyboard: {
          keyboardOpen,
          openKeyboard,
          closeKeyboard,
        },
        termsDisplay: {
          showAll,
          setShowAll,
        },
        creator: {
          creatorPopUps,
          openCreatorPopUp,
          closeCreatorPopUps,
          creatorNotifs,
          setPopUpNotification,
        },
      }}
    >
      {props.children}
    </SetContext.Provider>
  );
};
