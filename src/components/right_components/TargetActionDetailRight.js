/** @jsx jsx */
import { jsx } from "@emotion/core";
import TargetActionDetail from "../TargetActionDetail";
import {useSelector} from "react-redux";

export default function TargetActionDetailRight() {
  const selectedRightResource = useSelector(state => state.resources.selectedRightResource);

  return (
    <TargetActionDetail
      side="right"
      selectedResource={selectedRightResource}
      customCSS={{
        gridArea: "targetActionDetailRight",
        borderRightColor: "#C5C5C5",
        borderRightWidth: 1,
        borderRightStyle: "solid",
        paddingLeft: 25
      }}
    />
  )
}

