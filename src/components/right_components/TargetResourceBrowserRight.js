/** @jsx jsx */
import { jsx } from "@emotion/core";
import { React } from "react";
import TargetResourceBrowser from "../TargetResourceBrowser";
import {useSelector} from "react-redux";

export default function TargetResourceBrowserRight() {
  const rightTarget = useSelector(state => state.targets.rightTarget);
  const rightTargetResources = useSelector(state => state.resources.rightTargetResources);

  return (
    <TargetResourceBrowser
      side="right"
      gridArea={"targetResourcesRight"}
      target={rightTarget}
      targetResources={rightTargetResources}
    />
  )
}
