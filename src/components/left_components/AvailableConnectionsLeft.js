/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useSelector } from 'react-redux';
import AvailableConnections from "../AvailableConnections";


export default function AvailableConnectionsLeft() {
  const leftTarget = useSelector(state => state.targets.leftTarget);

  return (
    <AvailableConnections
      side="left"
      target={leftTarget}
      gridArea="availableConnectionsLeft"
    />
  )
}
