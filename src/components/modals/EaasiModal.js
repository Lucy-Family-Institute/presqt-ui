/** @jsx jsx */
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "./modalHeader";
import DialogContent from "@material-ui/core/DialogContent";
import {jsx} from "@emotion/core";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {actionCreators} from "../../redux/actionCreators";
import textStyles from "../../styles/text";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import colors from "../../styles/colors";

const CustomEaasiButton = withStyles({
  root: {
    backgroundColor: colors.presqtBlue,
    '&:hover': {
      backgroundColor: '#0a4996',
    },
  },
})(Button);

export default function EaasiModal() {
  const dispatch = useDispatch();

  const eaasiModalDisplay = useSelector(state => state.eaasiModalDisplay);

  /**
   *  Close the modal.
   **/
  const handleClose = () => {
    dispatch(actionCreators.eaasi.hideEaasiModal());
  };

  return eaasiModalDisplay ? (
    <div css={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      <Dialog
        maxWidth="md"
        fullWidth={true}
        open={eaasiModalDisplay}
        onClose={handleClose}
        aria-labelledby={"form-dialog-title"}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
        <DialogTitle
          id="form-dialog-title"
          onClose={handleClose}
          // disabled={downloadStatus === 'pending' || downloadStatus === 'cancelPending'}
        >
          EaaSI Time, Baby!
        </DialogTitle>
        <DialogContent style={{ padding: 20 }}>
            <div css={{ display: 'flex',  justifyContent:'center' }}>
              <p>
                Yo, click this button and Eaasi gets yo stuff and proposes some shiz
              </p>
            </div>
            <div css={{ display: 'flex',  justifyContent:'center' }}>
              <CustomEaasiButton
                // onClick={submitUpload}
                variant="contained"
                color="primary"
              >
                <span css={textStyles.buttonText}>Send</span>
              </CustomEaasiButton>
            </div>
        </DialogContent>
      </Dialog>
    </div>
  ) : null;
}