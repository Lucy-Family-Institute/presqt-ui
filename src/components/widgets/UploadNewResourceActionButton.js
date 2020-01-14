/** @jsx jsx */
import { jsx } from "@emotion/core";
import textStyles from "../../styles/text";
import useModal from "../../hooks/useModal";
import UploadModal from "../modals/UploadModal";
import { Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button/Button";
import ActionButton from "./ActionButton";

const UploadActionButton = withStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    marginRight: 150,
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#E57B00",
    border: "1px solid #E57B00",
    color: "white",
    boxShadow: "none",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#E57B00"
    }
  }
})(ActionButton);

export default function UploadNewResourceActionButton() {
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

      <UploadActionButton
        elevation={0}
        variant="contained"
        onClick={submitUpload}
      >
        <span css={textStyles.buttonText}>Upload New Project</span>
      </UploadActionButton>
    </Fragment>
  );
}
