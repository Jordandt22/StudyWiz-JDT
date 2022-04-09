import React, { useState } from "react";

// MUI
import { Box } from "@mui/material";
import { Person } from "@mui/icons-material";

// Components
import UserPhoto from "../../../../../templates/UserPhoto";

function InfoPopUpContent(props) {
  const {
    info: { totalUsers, privacy },
    creator: { displayName, photoURL, fbId: creatorFbId },
    users,
  } = props;
  const [showUsers, setShowUsers] = useState(false);

  return (
    <>
      {/* Creator */}
      <Box className="creator-info-box row">
        <UserPhoto
          displayName={displayName}
          photoURL={photoURL}
          fbId={creatorFbId}
        />

        <Box className="creator-info">
          <p>Created By</p>
          <strong>{displayName}</strong>
        </Box>
      </Box>

      {/* Users */}
      <Box className="users-box">
        <Box className="set-user-info row">
          {/* Total Users */}
          <Box
            className={`total-users center ${
              showUsers ? "active" : "not-active"
            }`}
            onClick={() => setShowUsers((prevState) => !prevState)}
          >
            <p>{totalUsers}</p> <Person className="icon" />
          </Box>

          {/* Privacy */}
          <Box className="privacy">
            <p>Viewable By</p>
            <h3>{privacy.private ? "Only You" : "Everyone"}</h3>
          </Box>
        </Box>

        {/* Users */}
        {showUsers && (
          <>
            {users.map((user) => {
              const { fbId: setUserFbId, displayName, photoURL } = user;

              return (
                <Box
                  key={setUserFbId + "-" + displayName}
                  className="user-box row"
                >
                  <UserPhoto
                    displayName={displayName}
                    photoURL={photoURL}
                    fbId={setUserFbId}
                  />
                  <p>{displayName}</p>
                </Box>
              );
            })}
          </>
        )}
      </Box>
    </>
  );
}

export default InfoPopUpContent;
