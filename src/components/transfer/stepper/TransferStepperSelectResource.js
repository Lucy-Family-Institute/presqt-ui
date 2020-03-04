/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useSelector } from "react-redux";
import text from '../../../styles/text';

export default function TransferStepperSelectResource() {
  const selectedTransferResourceName = useSelector(state =>
    state.selectedTransferResourceName);

  if (selectedTransferResourceName) {
    return (
      <div css={text.body}>Selected Resource: <span css={text.selectedResource}>{selectedTransferResourceName}</span></div>
      )
  }
  return (
    <div css={text.noSelectedResource}>No Resource Selected</div>
  )
}