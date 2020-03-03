/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useDispatch, useSelector } from "react-redux";
import text from '../../../styles/text';
import { actionCreators } from "../../../redux/actionCreators";

export default function TransferStepperSelectResource({ setActiveStep }) {
  const dispatch = useDispatch();

  const selectedTransferResourceName = useSelector(state => state.selectedTransferResourceName);
  const apiOperationErrors = useSelector(state => state.apiOperationErrors);

  if (apiOperationErrors) {
    dispatch(actionCreators.resources.removeFromErrorList(
      actionCreators.transfer.loadFromTransferTarget.toSring()
    ));
    setActiveStep(1);
  }

  if (selectedTransferResourceName) {
    return (
      <div css={text.body}>Selected Resource: <span css={text.selectedResource}>{selectedTransferResourceName}</span></div>
      )
  }
  return (
    <div css={text.noSelectedResource}>No Resource Selected</div>
  )
}