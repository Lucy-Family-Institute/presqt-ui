/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useSelector } from 'react-redux';
import AvailableConnections from "../AvailableConnections";

export default function AvailableConnectionsLeft() {
  const rightTarget = useSelector(state => state.targets.rightTarget);

  return (
    <AvailableConnections
      side="right"
      target={rightTarget}
      gridArea="availableConnectionsRight"
    />
  )
}
