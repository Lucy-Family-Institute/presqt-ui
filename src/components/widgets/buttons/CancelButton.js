/** @jsx jsx */
import { Fragment } from "react";
import { jsx } from "@emotion/core";
import textStyles from "../../../styles/text";
import buttonStyles from "../../../styles/buttons";
import Button from "@material-ui/core/Button/Button";
import {actionCreators} from "../../../redux/actionCreators";
import {useDispatch} from "react-redux";

export default function CancelButton() {
  const classes = buttonStyles.RetryDownload();
  const dispatch = useDispatch();

  const submitCancel = () => {
      console.log("CANCEL THE PROCESS");
      dispatch(actionCreators.resources.cancelDownload())
    };

  return (
    <Fragment>
      <Button variant="contained" color="primary" className={classes.button} onClick={submitCancel}>
        <span css={textStyles.buttonText}>Cancel</span>
      </Button>
    </Fragment>
  );
}