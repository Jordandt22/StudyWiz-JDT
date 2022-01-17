import React from "react";
import { connect } from "react-redux";

// React Router
import { useParams } from "react-router-dom";

// MUI
import { Container } from "@mui/material";

// Queries
import { useGetSingleSet } from "../../../query/queries";

function Set(props) {
  const {
    user: {
      auth: { fbId },
    },
  } = props;
  const { setId } = useParams();
  const { data, isLoading, isError, error } = useGetSingleSet(
    `${fbId}_SET_SETID:${setId}`,
    {
      fbId,
      setId,
    }
  );

  // Loading & Error
  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>{error.message}</div>;
  }

  const { set, user } = data.data;
  console.log(set, user);
  return (
    <Container className="page-container set-page-container">{setId}</Container>
  );
}

// Redux
const ReduxState = (state) => ({
  user: state.user,
});

export default connect(ReduxState)(Set);
