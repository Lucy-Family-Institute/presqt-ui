/** @jsx jsx */
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "./modalHeader";
import DialogContent from "@material-ui/core/DialogContent";
import { jsx } from "@emotion/core";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment } from "react";
import { actionCreators } from "../../redux/actionCreators";
import textStyles from "../../styles/text";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import colors from "../../styles/colors";
import Spinner from "../widgets/spinners/Spinner";
import useDefault from "../../hooks/useDefault";

const CustomEaasiButton = withStyles({
  root: {
    backgroundColor: colors.presqtBlue,
    "&:hover": {
      backgroundColor: "#0a4996"
    }
  }
})(Button);

export default function EaasiModal() {
  const dispatch = useDispatch();

  const eaasiModalDisplay = useSelector(state => state.eaasiModalDisplay);
  const downloadForServiceStatus = useSelector(state => state.downloadForServiceStatus);
  const downloadForService = useSelector(state => state.downloadForService);
  const eaasiProposalPostData = useSelector(state => state.eaasiProposalPostData);
  const eaasiProposalGetData = useSelector(state => state.eaasiProposalGetData);
  const downloadStatus = useSelector(state => state.downloadStatus);
  const selectedResource = useSelector(state => state.selectedResource);
  const selectedTarget = useSelector(state => state.selectedTarget);
  const apiTokens = useSelector(state => state.apiTokens);
  const activeTicketNumber = useSelector(state => state.activeTicketNumber);
  const eaasiProposalStatus = useSelector(state => state.eaasiProposalStatus);

  const [modalContentHeader, setModalContentHeader] = useDefault("");
  const [modalContentBody, setModalContentBody] = useDefault("");

  const handleClose = () => {
    dispatch(actionCreators.eaasi.hideEaasiModal());
    dispatch(actionCreators.download.clearDownloadData());
    dispatch(actionCreators.eaasi.clearEaasiData());
  };

  const submitProposal = () => {
    dispatch(actionCreators.download.downloadResource(
        selectedResource,
        apiTokens[selectedTarget.name],
        true));
  };

  useEffect(() => {
    if (downloadForServiceStatus === "finished") {
      dispatch(actionCreators.eaasi.sendEaasiProposal(activeTicketNumber));
    }
  }, [downloadForServiceStatus]);

  useEffect(() => {
    if (downloadForService && !downloadForServiceStatus) {
      setModalContentHeader("Your request is being processed on the PresQT server...");
      setModalContentBody(<Spinner />)
    }
    else if (eaasiProposalStatus === 'postPending') {
      setModalContentHeader("Proposal task is being processed on the EaaSI server...")
    }
    else if (eaasiProposalStatus === 'postFinished') {
      dispatch(actionCreators.eaasi.getEaasiProposal(eaasiProposalPostData.proposal_link));
    }
    else if (eaasiProposalStatus === 'getPending') {
      setModalContentHeader("Proposal task is being processed on the EaaSI server...")
    }
    else if (eaasiProposalStatus === 'getFinished') {
      setModalContentHeader(
        <Fragment>
          EaaSI has successfully created an emulation image. It can be downloaded by clicking <a href={`${eaasiProposalGetData.image_url}`} target="_blank">here.</a>
        </Fragment>
      );
      setModalContentBody("");
    }
    else if (selectedResource){
      setModalContentHeader(`Clicking on this button will send the contents of 
        '${selectedResource.title}' to EaaSI. They will prepare the contents and return an image that can be run as an emulator.`);
      setModalContentBody(
        <CustomEaasiButton
          onClick={submitProposal}
          variant="contained"
          color="primary"
          disabled={downloadStatus ? downloadStatus === "pending" : false}
        >
          <span css={textStyles.buttonText}>Send</span>
        </CustomEaasiButton>
      )
    }
  }, [eaasiProposalStatus, eaasiModalDisplay, downloadForService]);

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
          disabled={downloadStatus && eaasiProposalStatus !== 'getFinished' }
        >
          EaaSI Service
        </DialogTitle>
        <DialogContent style={{ padding: 20 }}>
          <div css={{ display: "flex", justifyContent: "center" }}>
            <p>{modalContentHeader}</p>
          </div>
          <div css={{ display: "flex", justifyContent: "center" }}>
            {modalContentBody}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  ) : null;
}
