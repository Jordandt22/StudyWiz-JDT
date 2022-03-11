import React, { useState } from "react";

// MUI
import { Box, Dialog } from "@mui/material";
import { PrivacyTip } from "@mui/icons-material";

// Components
import MenuOptions from "./privacy/MenuOptions";

function SetPrivacySettings() {
  const [openPrivacySettings, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <Box className="set-privacy-settings">
      <button
        type="button"
        className="privacy-settings-btn row"
        onClick={() => setOpen(true)}
      >
        <PrivacyTip className="icon" />
        Change Privacy Settings
      </button>

      {/* Privacy Settings Menu */}
      <Dialog open={openPrivacySettings}>
        <Box className="privacy-settings-menu">
          {/* Header */}
          <Box className="menu-header row">
            <PrivacyTip className="icon" />
            <h3>Privacy Settings</h3>
          </Box>
          {/* Options */}
          <Box className="menu-opts-container">
            <Box className="row">
              {/* Who can view this set */}
              <MenuOptions
                name="privacy.private"
                label="Who can view this set"
                options={[
                  { label: "Everyone", value: false },
                  { label: "Just Me", value: true },
                ]}
              />
              {/* Who can view this set's creator */}
              <MenuOptions
                name="privacy.hideCreator"
                label="Who can view the creator"
                options={[
                  { label: "Everyone", value: false },
                  { label: "Just Me", value: true },
                ]}
              />
            </Box>

            {/* Privacy Settigns Buttons */}
            <button type="button" className="save-btn" onClick={closeMenu}>
              Save
            </button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}

export default SetPrivacySettings;
