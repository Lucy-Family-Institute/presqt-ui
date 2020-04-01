/** @jsx jsx */
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "./modalHeader";
import DialogContent from "@material-ui/core/DialogContent";
import { jsx } from "@emotion/core";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment } from "react";
import { actionCreators } from "../../redux/actionCreators";
import getError from "../../utils/getError";
import EaasiStepper from "../eaasi_stepper/EaasiStepper";

export default function EaasiModal() {
  const dispatch = useDispatch();

  const apiOperationErrors = useSelector(state => state.apiOperationErrors);
  const eaasiModalDisplay = useSelector(state => state.eaasiModalDisplay);
  const downloadForServiceStatus = useSelector(state => state.downloadForServiceStatus);
  const downloadStatus = useSelector(state => state.downloadStatus);
  const activeTicketNumber = useSelector(state => state.activeTicketNumber);
  const eaasiProposalStatus = useSelector(state => state.eaasiProposalStatus);

  const eaasiGetError = getError(actionCreators.eaasi.getEaasiProposal);
  const eaasiPostError = getError(actionCreators.eaasi.sendEaasiProposal);

  const handleClose = () => {
    dispatch(actionCreators.eaasi.hideEaasiModal());
    dispatch(actionCreators.download.clearDownloadData());
    dispatch(actionCreators.eaasi.clearEaasiData());
    if (apiOperationErrors.length > 0 && eaasiGetError) {
      dispatch(actionCreators.resources.removeFromErrorList(
        actionCreators.eaasi.getEaasiProposal.toString()));
    }
    else if (apiOperationErrors.length > 0 && eaasiPostError) {
      dispatch(actionCreators.resources.removeFromErrorList(
        actionCreators.eaasi.sendEaasiProposal.toString()));
    }
  };

  const checkDisabled = () => {
    const disabledStatus = [null, 'postPending', 'postFinished', 'getPending'];
    return (downloadStatus && disabledStatus.indexOf(eaasiProposalStatus) > -1)
  };

  useEffect(() => {
    if (downloadForServiceStatus === "finished") {
      dispatch(actionCreators.eaasi.sendEaasiProposal(activeTicketNumber));
    }
  }, [downloadForServiceStatus]);

  return eaasiModalDisplay ? (
    <div css={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
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
          disabled={checkDisabled()}
        >
          EaaSI Service
        </DialogTitle>
        <DialogContent style={{ padding: 20 }}>
          <EaasiStepper />
        </DialogContent>
      </Dialog>
    </div>
  ) : null;
}
