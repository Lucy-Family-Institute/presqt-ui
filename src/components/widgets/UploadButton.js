/** @jsx jsx */
import { jsx } from "@emotion/core";
import textStyles from "../../styles/text";
import ActionButton from "./ActionButton";
import useModal from "../../hooks/useModal";
import UploadModal from "../modals/UploadModal";
import {Fragment} from "react";

export default function UploadButton() {

  const submitUpload = () => {
    toggleModalVisibility();
  };

  const { modalVisible, toggleModalVisibility } = useModal();

  return (
    <Fragment>
      <UploadModal
        modalActive={modalVisible}
        toggleModal={toggleModalVisibility}
      />

      <ActionButton
        elevation={0}
        variant="contained"
        onClick={submitUpload}
      >
        <span css={textStyles.buttonText}>Upload</span>
      </ActionButton>
    </Fragment>
  )
}
