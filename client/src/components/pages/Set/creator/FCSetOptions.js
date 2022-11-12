import React from "react";
import { connect } from "react-redux";

// React Router
import { useNavigate } from "react-router-dom";

// MUI
import { Box, Tooltip } from "@mui/material";
import {
  ContentCopyRounded,
  StarBorderOutlined,
  StarRate,
  IosShare,
} from "@mui/icons-material";

// API
import { copySet as copySetAPI } from "../../../../query/api";

// Redux
import { setAlert, setLoading } from "../../../../redux/global/global.actions";
import { setSets } from "../../../../redux/sets/sets.actions";

// Contexts
import { useSet } from "../../../../context/set/Set.context";

// Components
import MoreMenu from "./MoreMenu";

function FCSetOptions(props) {
  const {
    favorite,
    isCreator,
    favoriteSet,
    APISocket,
    setId,
    title,
    setForEditForm,
    user: {
      auth: { fbId },
    },
    setLoading,
    setAlert,
    setSets,
  } = props;
  const navigate = useNavigate();
  const {
    creator: { openCreatorPopUp },
  } = useSet();

  // Copy Set
  const copySet = async () => {
    setLoading({ isLoading: true, loadingText: `Copying ${title}...` });
    await copySetAPI(fbId, setId, (data, err) => {
      if (err || !data) {
        setLoading({ isLoading: false });
        return setAlert({
          message: "Sorry, a problem occured while copying this set.",
          severity: "error",
          title: "Error",
        });
      }

      const {
        user: { sets },
      } = data.data;
      setLoading({ isLoading: false });
      setSets(sets);
      navigate("/sets");
    });
  };

  return (
    <Box className="fc-set-options row">
      {/* Copy Set */}
      <Tooltip title="Copy Set">
        <button
          type="button"
          className="fc-set-opt-btn center"
          onClick={copySet}
        >
          <ContentCopyRounded className="icon" />
        </button>
      </Tooltip>

      {/* Favorite Set */}
      <Tooltip title={!favorite ? "Favorite Set" : "Unfavorite Set"}>
        <button
          variant="button"
          className="fc-set-opt-btn center"
          onClick={() => favoriteSet(APISocket.current, setId)}
        >
          {!favorite ? (
            <StarBorderOutlined className="icon" />
          ) : (
            <StarRate className="icon fav-icon" />
          )}
        </button>
      </Tooltip>

      {/* Share / Export */}
      <Tooltip title="Share / Export">
        <button
          type="button"
          className="fc-set-opt-btn center"
          onClick={() => openCreatorPopUp("share")}
        >
          <IosShare className="icon" />
        </button>
      </Tooltip>

      {/* Information */}
      <Tooltip title="Info">
        <button
          type="button"
          className="fc-set-opt-btn center"
          onClick={() => openCreatorPopUp("info")}
        >
          <p>i</p>
        </button>
      </Tooltip>

      {/* More Options (Only for Creator) */}
      {isCreator && <MoreMenu setId={setId} setForEditForm={setForEditForm} />}
    </Box>
  );
}

// Redux
const ReduxState = (state) => ({
  user: state.user,
});

const ReduxActions = (dispatch) => ({
  setLoading: (loading) => dispatch(setLoading(loading)),
  setAlert: (alert) => dispatch(setAlert(alert)),
  setSets: (sets) => dispatch(setSets(sets)),
});

export default connect(ReduxState, ReduxActions)(FCSetOptions);
