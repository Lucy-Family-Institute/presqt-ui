/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useSelector } from "react-redux";
import text from '../../../styles/text';
import CancelButton from "../../widgets/buttons/CancelButton";

export default function TransferStepperSelectResource() {
  const selectedTransferResourceName = useSelector(state => state.selectedTransferResourceName);

  if (selectedTransferResourceName) {
    return (
      <div css={text.body}>Selected Resource:
        <span css={text.selectedResource}>
          {selectedTransferResourceName} <CancelButton actionType="REMOVE_RESOURCE"/>
        </span>
      </div>
      )
  }
  return (
    <div css={text.noSelectedResource}>No Resource Selected</div>
  )
}