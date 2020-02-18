/** @jsx jsx */
import { jsx } from "@emotion/core";
import TargetActions from "../TargetActions";
import {useSelector} from "react-redux";

export default function TargetActionsLeft() {
  const selectedLeftResource = useSelector(state => state.resources.selectedLeftResource);
  const leftSearchValue = useSelector(state => state.resources.leftSearchValue);

  return (
    <TargetActions
      side="left"
      selectedResource={selectedLeftResource}
      searchValue={leftSearchValue}
      customCSS={{
        gridArea: "targetActionsLeft",
        borderLeftColor: "#979797",
        borderLeftWidth: 1,
        borderLeftStyle: "solid",
        paddingLeft: 25,
        borderRightColor: "black",
        borderRightWidth: 1,
        borderRightStyle: "solid",
      }}
    />
  )
}