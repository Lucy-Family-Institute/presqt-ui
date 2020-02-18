/** @jsx jsx */
import { jsx } from "@emotion/core";
import TargetActionDetail from "../TargetActionDetail";
import {useSelector} from "react-redux";

export default function TargetActionDetailLeft() {
  const selectedLeftResource = useSelector(state => state.resources.selectedLeftResource);

  return (
    <TargetActionDetail
      side="left"
      selectedResource={selectedLeftResource}
      customCSS={{
        gridArea: "targetActionDetailLeft",
        borderLeftColor: "#C5C5C5",
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
