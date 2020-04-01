/** @jsx jsx */
import { useDispatch } from "react-redux";
import { jsx } from "@emotion/core";
import textStyles from "../../styles/text";
import { actionCreators } from "../../redux/actionCreators";
import ActionButton from "../widgets/buttons/ActionButton";

export default function DownloadActionButton({ disabled }) {
  const dispatch = useDispatch();

  return (
      <ActionButton
        elevation={0}
        variant="contained"
        onClick={() => dispatch(actionCreators.download.displayDownloadModal())}
        disabled={disabled}
      >
        <span css={textStyles.buttonText}>Download</span>
      </ActionButton>
  )
}
