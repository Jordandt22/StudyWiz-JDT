import React from "react";

// MUI
import { Box, Tooltip } from "@mui/material";
import {
  ContentCopyRounded,
  StarBorderOutlined,
  StarRate,
  MoreHorizRounded,
  IosShare,
} from "@mui/icons-material";

// Contexts
import { useSet } from "../../../../context/set/Set.context";

function FCSetOptions(props) {
  const { favorite, isCreator, favoriteSet, APISocket, setId } = props;
  const {
    creator: { openCreatorPopUp },
  } = useSet();

  return (
    <Box className="fc-set-options row">
      {/* Copy Set */}
      <Tooltip title="Copy Set">
        <button type="button" className="fc-set-opt-btn center">
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

      {/* More Options (Only for Creator) */}
      {isCreator && (
        <Tooltip title="More">
          <button type="button" className="fc-set-opt-btn center">
            <MoreHorizRounded className="icon" />
          </button>
        </Tooltip>
      )}
    </Box>
  );
}

export default FCSetOptions;
