import React from "react";
import { connect } from "react-redux";

// Queries
import { useGetSetUsers } from "../../../../../../query/queries";
import InfoPopUpContent from "./InfoPopUpContent";

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
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>{error.message}</div>;
  }

  const { users } = data.data;
  return <InfoPopUpContent info={info} creator={creator} users={users} />;
}

// Redux
const ReduxState = (state) => ({
  user: state.user,
});

export default connect(ReduxState)(SetInfoQuery);
