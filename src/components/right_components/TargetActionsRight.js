/** @jsx jsx */
import { jsx } from "@emotion/core";
import TargetActions from "../TargetActions";
import {useSelector} from "react-redux";

export default function TargetActionsRight() {
  const selectedRightResource = useSelector(state => state.resources.selectedRightResource);
  const rightSearchValue = useSelector(state => state.resources.rightSearchValue);

  return (
    <TargetActions
      side="right"
      selectedResource={selectedRightResource}
      searchValue={rightSearchValue}
      customCSS={{
        gridArea: "targetActionsRight",
        borderRightColor: "#979797",
        borderRightWidth: 1,
        borderRightStyle: "solid",
        paddingLeft: 25
      }}
    />
  )
}