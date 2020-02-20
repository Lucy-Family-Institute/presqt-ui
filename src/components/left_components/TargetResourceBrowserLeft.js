/** @jsx jsx */
import { jsx } from "@emotion/core";
import { React } from "react";
import TargetResourceBrowser from "../TargetResourceBrowser";
import {useSelector} from "react-redux";

export default function TargetResourceBrowserLeft() {
  const leftTarget = useSelector(state => state.targets.leftTarget);
  const leftTargetResources = useSelector(state => state.resources.leftTargetResources);

  return (
    <TargetResourceBrowser
      side="left"
      gridArea="targetResourcesLeft"
      target={leftTarget}
      targetResources={leftTargetResources}
    />
  )
}
