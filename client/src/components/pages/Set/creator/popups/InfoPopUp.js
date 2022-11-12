import React from "react";

// Contexts
import { useSet } from "../../../../../context/set/Set.context";

// Components
import CustomPopUp from "../../../../templates/popup/CustomPopUp";
import SetInfoQuery from "./info/SetInfoQuery";

function InfoPopUp(props) {
  const { info, creator, setId } = props;
  const {
    creator: { creatorPopUps, closeCreatorPopUps },
  } = useSet();

  return (
    <CustomPopUp
      onClose={closeCreatorPopUps}
      open={creatorPopUps.info}
      className="info-pop-up"
      title={
        <h2>
          Info about <span>{info.title}</span>
        </h2>
      }
    >
      <SetInfoQuery setId={setId} info={info} creator={creator} />
    </CustomPopUp>
  );
}

export default InfoPopUp;
