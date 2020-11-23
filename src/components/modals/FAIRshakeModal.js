/** @jsx jsx */
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "./modalHeader";
import DialogContent from "@material-ui/core/DialogContent";
import { jsx } from "@emotion/core";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { actionCreators } from "../../redux/actionCreators";
import getError from "../../utils/getError";
import FAIRshareStepper from "../fairshare_stepper/FAIRshareStepper";

export default function FAIRshareModal() {
    const dispatch = useDispatch();

    const apiOperationErrors = useSelector(state => state.apiOperationErrors);
    const fairshakeModalDisplay = useSelector(state => state.fairshakeModalDisplay);

    const handleClose = () => {
      dispatch(actionCreators.fairshake.hideFairshakeModal());
    }

    return fairshakeModalDisplay ? (
        <div css={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Dialog
            maxWidth="md"
            fullWidth={true}
            open={fairshakeModalDisplay}
            onClose={handleClose}
            aria-labelledby={"form-dialog-title"}
            disableBackdropClick={true}
            disableEscapeKeyDown={true}
          >
            <DialogTitle
              id="form-dialog-title"
              onClose={handleClose}
            >
              FAIRshake Manual Assessment Service
            </DialogTitle>
            <DialogContent style={{ padding: 20 }}>
              And then you do the assessment
            </DialogContent>
          </Dialog>
        </div>
      ) : null;
}