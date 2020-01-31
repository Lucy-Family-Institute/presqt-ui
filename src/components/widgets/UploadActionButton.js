/** @jsx jsx */
import { jsx } from "@emotion/core";
import textStyles from "../../styles/text";
import ActionButton from "./ActionButton";
import {useDispatch} from "react-redux";
import {actionCreators} from "../../redux/actionCreators";

/**
 * This component is responsible for initializing and opening the upload modal
 **/
export default function UploadActionButton(props) {
  const dispatch = useDispatch();

  const submitUpload = () => {
    dispatch(actionCreators.resources.displayUploadModal(props.type));
  };

  return (
      <ActionButton
        css={props.style}
        elevation={0}
        variant="contained"
        onClick={submitUpload}
      >
        <span css={textStyles.buttonText}>{props.text}</span>
      </ActionButton>
  )
}
