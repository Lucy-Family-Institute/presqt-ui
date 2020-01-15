/** @jsx jsx */
import { jsx } from "@emotion/core";
import textStyles from "../../styles/text";
import ActionButton from "./ActionButton";
import UploadModal from "../modals/UploadModal";
import { useSelector } from "react-redux";
import {Fragment, useState} from "react";

/**
 * This component is responsible for initializing and opening the upload modal
 **/
export default function UploadActionButton(props) {
  const [modalState, setModalState] = useState(false);

  let selectedInSource;
  // We want to pass along the resource if the upload is to an existing project
  // or null if the user has pressed the `Upload New Project Buttton`.
  if (props.type === 'NEW') {
    selectedInSource = null;
  }
  else {
    selectedInSource = useSelector(state => state.resources.selectedInSource);
  }

  const submitUpload = () => {
    setModalState(true);
  };

  return (
    <Fragment>
      <UploadModal
        modalState={modalState}
        setModalState={setModalState}
        selectedInSource={selectedInSource}
      />

      <ActionButton
        css={props.style}
        elevation={0}
        variant="contained"
        onClick={submitUpload}
      >
        <span css={textStyles.buttonText}>{props.text}</span>
      </ActionButton>
    </Fragment>
  )
}
