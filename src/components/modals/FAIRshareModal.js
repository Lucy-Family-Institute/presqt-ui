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
    const fairshareModalDisplay = useSelector(state => state.fairshareModalDisplay);

    const handleClose = () => {
      dispatch(actionCreators.fairshare.hideFairshareModal());
      dispatch(actionCreators.fairshare.clearFairshareData());
    }

    return fairshareModalDisplay ? (
        <div css={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Dialog
            maxWidth="md"
            fullWidth={true}
            open={fairshareModalDisplay}
            onClose={handleClose}
            aria-labelledby={"form-dialog-title"}
            disableBackdropClick={true}
            disableEscapeKeyDown={true}
          >
            <DialogTitle
              id="form-dialog-title"
              onClose={handleClose}
            //   disabled={checkDisabled()}
            >
              FAIRshare Evaluator Service
            </DialogTitle>
            <DialogContent style={{ padding: 20 }}>
              <FAIRshareStepper />
            </DialogContent>
          </Dialog>
        </div>
      ) : null;
}