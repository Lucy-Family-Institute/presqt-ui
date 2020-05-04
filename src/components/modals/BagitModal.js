/** @jsx jsx */
import { jsx } from "@emotion/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux/actionCreators";
import DialogTitle from "./modalHeader";
import BagitStepper from "../bagi_stepper/BagitStepper";

export default function BagitModal() {
  const dispatch = useDispatch();

  const bagitModalDisplay = useSelector(state => state.bagitModalDisplay);

  const handleClose = () => {
    dispatch(actionCreators.bagit.hideBagitModal());
    dispatch(actionCreators.bagit.clearBagitData())
  };

  return bagitModalDisplay ? (
    <div>
      <Dialog
        maxWidth="md"
        fullWidth={true}
        open={bagitModalDisplay}
        onClose={handleClose}
        aria-labelledby={"form-dialog-title"}
      >
        <DialogTitle id="form-dialog-title" onClose={handleClose}>
          BagIt Tool
        </DialogTitle>
        <DialogContent style={{ padding: 20 }}>
          <BagitStepper />
        </DialogContent>
      </Dialog>
    </div>
  ) : null;
}
