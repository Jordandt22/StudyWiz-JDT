import React, { useEffect } from "react";
import { connect } from "react-redux";

// React Router
import { useParams } from "react-router-dom";

// MUI
import { Container } from "@mui/material";

// Queries
import { useGetSingleSet } from "../../../query/queries";

// Redux
import { setSets } from "../../../redux/sets/sets.actions";

// Components
import SetMainContent from "./SetMainContent";
import ErrorBox from "../../layout/error/ErrorBox";
import MainSkeleton from "./skeletons/MainSkeleton";

function Set(props) {
  const {
    user: {
      auth: { fbId },
    },
    setSets,
  } = props;
  const { setId } = useParams();
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
    return <MainSkeleton setId={setId} />;
  } else if (isError) {
    return <ErrorBox message={error.message} />;
  }

  const { set } = data.data;
  return (
    <Container className="page-container set-page-container">
      {/* Main Content */}
      <SetMainContent set={set} />
    </Container>
  );
}

// Redux
const ReduxState = (state) => ({
  user: state.user,
});

const ReduxActions = (dispatch) => ({
  setSets: (sets) => dispatch(setSets(sets)),
});

export default connect(ReduxState, ReduxActions)(Set);
