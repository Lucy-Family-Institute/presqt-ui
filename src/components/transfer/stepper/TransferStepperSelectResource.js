/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useSelector } from "react-redux";
import text from '../../../styles/text';
import TransferCancelSelectionButton from "../TransferCancelSelectionButton"



export default function TransferStepperSelectResource() {
  const selectedTransferResourceName = useSelector(state => state.selectedTransferResourceName);

    return (
      <div css={text.transferResource}>Selected Resource:
        <span css={!selectedTransferResourceName ? text.noSelectedResource : text.selectedResource}>{!selectedTransferResourceName ? ' None' : ` ${selectedTransferResourceName}`}
          <TransferCancelSelectionButton
            disabled={!selectedTransferResourceName}
          />
        </span>
      </div>
    )
}