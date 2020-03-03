/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useSelector, useDispatch } from "react-redux";
import text from '../../../styles/text';
import { useEffect } from 'react';
import { actionCreators } from '../../../redux/actionCreators';

export default function TransferStepperSelectResource({ setActiveStep }) {
  const selectedTransferResourceName = useSelector(state => state.selectedTransferResourceName);

  if (selectedTransferResourceName) {
    return (
      <div css={text.body}>Selected Resource: <span css={text.selectedResource}>{selectedTransferResourceName}</span></div>
      )
  }
  return (
    <div css={text.noSelectedResource}>No Resource Selected</div>
  )
}