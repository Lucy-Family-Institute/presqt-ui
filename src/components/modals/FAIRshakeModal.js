/** @jsx jsx */
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "./modalHeader";
import DialogContent from "@material-ui/core/DialogContent";
import { jsx } from "@emotion/core";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux/actionCreators";
import FAIRshakeStepper from "../fairshake_stepper/FAIRshakeStepper";

export default function FAIRshakeModal() {
    const dispatch = useDispatch();

    const fairshakeModalDisplay = useSelector(state => state.fairshakeModalDisplay);

  const handleClose = () => {
    dispatch(actionCreators.fairshake.clearFairshakeData());
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
                <FAIRshakeStepper />
            </DialogContent>
          </Dialog>
        </div>
      ) : null;
}