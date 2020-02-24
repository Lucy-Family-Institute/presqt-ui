/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useSelector } from "react-redux";
import text from '../../../styles/text';

export default function TransferStepperSelectResource() {
  const selectedTransferResource = useSelector(state => state.resources.selectedTransferResource);

  if (selectedTransferResource) {
    return (
      <div css={text.body}>Selected Resource: <span css={text.selectedResource}>{selectedTransferResource.title}</span></div>
      )
  }
  return (
    <div css={text.noSelectedResource}>No Resource Selected</div>
  )
}