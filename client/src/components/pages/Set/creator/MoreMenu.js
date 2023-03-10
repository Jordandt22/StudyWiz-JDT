import React, { useState } from "react";

// React Router
import { useNavigate } from "react-router-dom";

// MUI
import { Box, Tooltip, ClickAwayListener } from "@mui/material";
import { MoreHorizRounded, Edit, Delete } from "@mui/icons-material";

// Contexts
import { useSet } from "../../../../context/set/Set.context";
import { useCreateForm } from "../../../../context/create-form/CreateForm.context";

function MoreMenu(props) {
  const { setId, setForEditForm } = props;
  const {
    creator: { openCreatorPopUp },
  } = useSet();
  const navigate = useNavigate();
  const [menuOpen, setOpen] = useState(false);
  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);
  const {
    edit: { setEditFormSetID, setEditFormValues },
  } = useCreateForm();
  const moreMenuOptions = [
    {
      label: "Edit",
      icon: <Edit className="icon" />,
      onClick: () => {
        setEditFormSetID(setId);
        setEditFormValues(setForEditForm);
        navigate(`/edit`);
      },
    },
    {
      label: "Delete",
      icon: <Delete className="icon" />,
      onClick: () => openCreatorPopUp("delete"),
    },
  ];

  return (
    <ClickAwayListener onClickAway={closeMenu}>
      <Tooltip
        PopperProps={{
          disablePortal: true,
          className: "more-menu",
        }}
        onClose={closeMenu}
        open={menuOpen}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title={
          <Box className="more-menu">
            {moreMenuOptions.map((opt) => {
              const { label, icon, onClick } = opt;

              return (
                <Box
                  id={label + "-opt"}
                  key={label + "-more-menu-opt"}
                  className="more-menu-opt row"
                  onClick={onClick}
                >
                  <Box className="icon-box">{icon}</Box>

                  <p className="label">{label}</p>
                </Box>
              );
            })}
          </Box>
        }
      >
        <button
          type="button"
          className="fc-set-opt-btn center"
          onClick={openMenu}
        >
          <MoreHorizRounded className="icon" />
        </button>
      </Tooltip>
    </ClickAwayListener>
  );
}

export default MoreMenu;
