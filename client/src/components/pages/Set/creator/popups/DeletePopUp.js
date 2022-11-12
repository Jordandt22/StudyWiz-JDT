import React from "react";
import { connect } from "react-redux";

// React Router
import { useNavigate } from "react-router-dom";

// API
import { deleteSet as deleteSetAPI } from "../../../../../query/api";

// MUI
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from "@mui/material";

// Redux
import {
  setAlert,
  setLoading,
} from "../../../../../redux/global/global.actions";
import { setSets } from "../../../../../redux/sets/sets.actions";

// Contents
import { useSet } from "../../../../../context/set/Set.context";

// Components
import SlideTransition from "../../../../layout/transitions/SlideTransition";

function DeletePopUp(props) {
  const {
    setId,
    info: { title },
    terms,
    user: {
      auth: { fbId },
    },
    setLoading,
    setAlert,
    setSets,
  } = props;
  const navigate = useNavigate();
  const {
    creator: { creatorPopUps, closeCreatorPopUps },
  } = useSet();
  const deleteSetFunc = async () => {
    closeCreatorPopUps();
    setLoading({ isLoading: true, loadingText: `Deleting ${title}...` });
    await deleteSetAPI(fbId, setId, (data, err) => {
      if (err || !data) {
        setLoading({ isLoading: false });
        return setAlert({
          message: "Sorry, a problem occured while deleting this set.",
          severity: "error",
          title: "Error",
        });
      }

      const {
        user: { sets },
      } = data.data;
      navigate("/sets");
      setSets(sets);
      setLoading({ isLoading: false });
    });
  };

  return (
    <Dialog
      open={creatorPopUps.delete}
      TransitionComponent={SlideTransition}
      keepMounted
      onClose={closeCreatorPopUps}
    >
      <Box className="delete-popup">
        <DialogTitle>
          Are you sure you want to <strong>DELETE</strong> {title}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            All the information in this vocab set will be deleted and gone
            forever, including your {terms.length} terms. This action can't be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCreatorPopUps}>Cancel</Button>
          <Button className="delete-btn" onClick={deleteSetFunc}>
            Delete
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
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

export default connect(ReduxState, ReduxActions)(DeletePopUp);
