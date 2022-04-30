import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

// Lodash
import * as _ from "lodash";

// React Router
import { useParams } from "react-router-dom";

// MUI
import { Container } from "@mui/material";

// Queries
import { useGetSingleSet } from "../../../query/queries";

// Redux
import { setSets } from "../../../redux/sets/sets.actions";

// Contexts
import { useSet } from "../../../context/set/Set.context";

// Components
import FlashcardsSideBar from "./FlashcardsSideBar";
import Flashcard from "../../templates/flashcards/Flashcard";
import FlashcardNavbar from "../../templates/flashcards/FlashcardNavbar";
import ErrorBox from "../../layout/error/ErrorBox";
import FlashcardsSkeleton from "./FlashcardsSkeleton";

function Flashcards(props) {
  const {
    user: {
      auth: { fbId },
    },
    sets,
    setSets,
  } = props;
  const {
    terms: { resetCurTerm },
  } = useSet();
  const { setId } = useParams();
  const [shuffle, setShuffle] = useState(null);
  const shuffleTerms = (terms) =>
    setShuffle((prevShuffle) => (!prevShuffle ? _.shuffle(terms) : null));

  // Resetting Current Term
  useEffect(() => {
    resetCurTerm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setId, shuffle]);

  // Getting Set Data
  const { data, isLoading, isError, error } = useGetSingleSet(
    `${fbId}_SET_SETID:${setId}`,
    {
      fbId,
      setId,
    }
  );

  // Updating User's Sets in Redux
  useEffect(() => {
    if (!isLoading && !isError && data?.data?.user?.sets) {
      const { user } = data.data;
      setSets(user.sets);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading, isError]);

  // Loading & Error
  if (isLoading) {
    return <FlashcardsSkeleton />;
  } else if (isError) {
    return <ErrorBox message={error.message} />;
  }

  const { set } = data.data;
  const terms = shuffle ? shuffle : set.terms;
  const userSet = sets.filter((set) => set.setId === setId)[0];
  return (
    <Container className="page-container flashcards-container">
      {/* Flashcards Sidebar */}
      <FlashcardsSideBar
        shuffle={shuffle}
        shuffleTerms={() => shuffleTerms(set.terms)}
        set={set}
      />

      <main className="flashcards-main-content">
        {/* Flashcards */}
        <Flashcard userSet={userSet} setId={setId} terms={terms} />

        {/* Flashcard Nav Bar */}
        <FlashcardNavbar setId={setId} terms={terms} fullscreen={false} />
      </main>
    </Container>
  );
}

// Redux
const ReduxState = (state) => ({
  user: state.user,
  sets: state.sets.sets,
});

const ReduxActions = (dispatch) => ({
  setSets: (sets) => dispatch(setSets(sets)),
});

export default connect(ReduxState, ReduxActions)(Flashcards);
