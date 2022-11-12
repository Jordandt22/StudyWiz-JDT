import React from "react";
import { connect } from "react-redux";

// Queries
import { useGetSetUsers } from "../../../../../../query/queries";

// MUI
import { Box } from "@mui/material";

// Components
import LoadingSpinner from "../../../../../layout/loading/LoadingSpinner";
import InfoPopUpContent from "./InfoPopUpContent";
import ErrorBox from "../../../../../layout/error/ErrorBox";

function SetInfoQuery(props) {
  const {
    setId,
    info,
    creator,
    user: {
      auth: { fbId },
    },
  } = props;
  const { data, isLoading, isError, error } = useGetSetUsers(
    `${fbId}_SET_SETID:${setId}_USERS`,
    {
      fbId,
      setId,
    }
  );

  // Loading & Error
  if (isLoading) {
    return (
      <Box className="center">
        <LoadingSpinner />
      </Box>
    );
  } else if (isError) {
    return <ErrorBox message={error.message} />;
  } else if (data.data.error) {
    return <ErrorBox message={data.data.error} />;
  }

  const { users } = data.data;
  return <InfoPopUpContent info={info} creator={creator} users={users} />;
}

// Redux
const ReduxState = (state) => ({
  user: state.user,
});

export default connect(ReduxState)(SetInfoQuery);
