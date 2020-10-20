/** @jsx jsx */
import { useDispatch } from "react-redux";
import { jsx } from "@emotion/core";
import textStyles from "../../styles/text";
import { actionCreators } from "../../redux/actionCreators";
import ActionButton from "../widgets/buttons/ActionButton";

export default function FAIRshareTransferButton({ disabled }) {
  const dispatch = useDispatch();

  return (
      <ActionButton
        elevation={0}
        variant="contained"
        onClick={() => dispatch(actionCreators.fairshare.displayFairshareTransferModal())}
        disabled={disabled}
      >
        <span css={textStyles.buttonText}>FAIRshare Evaluator Results</span>
      </ActionButton>
  )
}