/** @jsx jsx */
import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { jsx } from "@emotion/core";
import textStyles from "../../../styles/text";
import buttonStyles from "../../../styles/buttons";
import { actionCreators } from "../../../redux/actionCreators";
import Button from "@material-ui/core/Button/Button";

/**
 * This component handles the download action button in the TargetActions component.
 * It is responsible for dispatching the action that will make the download API call and open
 * a modal to display the download status.
 **/
export default function CancelButton({setModalContent, modalDefaultMessage}) {
  const classes = buttonStyles.RetryDownload();
  const dispatch = useDispatch();

  const submitCancel = () => {
      console.log("CANCEL THE PROCESS");
    };

  return (
    <Fragment>
      <Button variant="contained" color="primary" className={classes.button} onClick={submitCancel}>
        <span css={textStyles.buttonText}>Cancel</span>
      </Button>
    </Fragment>
  );
}