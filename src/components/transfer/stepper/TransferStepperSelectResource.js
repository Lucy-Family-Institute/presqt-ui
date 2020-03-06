/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useSelector } from "react-redux";
import text from '../../../styles/text';
import TransferCancelSelectionButton from "../TransferCancelSelectionButton"

export default function TransferStepperSelectResource() {
  const selectedTransferResourceName = useSelector(state => state.selectedTransferResourceName);

  if (selectedTransferResourceName) {
    return (
      <div css={text.transferResource}>Selected Resource: <span css={text.selectedResource}>{selectedTransferResourceName}
        <TransferCancelSelectionButton disabled={false} />
      </span>
      </div>
      )
  }
  return (
    <div css={text.transferResource}>
        No Resource Selected
        <span>
        <TransferCancelSelectionButton disabled={true} />
      </span>
    </div>
  )
}