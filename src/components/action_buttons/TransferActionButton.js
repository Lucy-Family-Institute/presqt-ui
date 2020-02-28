/** @jsx jsx */
import { jsx } from "@emotion/core";
import textStyles from "../../styles/text";
import ActionButton from "../widgets/buttons/ActionButton";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../redux/actionCreators";

/**
 * This component is responsible for initializing and opening the transfer modal
 **/
export default function TransferActionButton({disabled}) {
  const dispatch = useDispatch();

  const submitUpload = () => {
    dispatch(actionCreators.transfer.displayTransferModal());
  };

  return (
    <ActionButton
      elevation={0}
      variant="contained"
      onClick={submitUpload}
      disabled={disabled}
    >
      <span css={textStyles.buttonText}>Transfer Out</span>
    </ActionButton>
  );
}
