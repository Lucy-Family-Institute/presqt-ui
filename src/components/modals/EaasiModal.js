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
  const eaasiProposalPostData = useSelector(state => state.eaasiProposalPostData);
  const eaasiProposalGetData = useSelector(state => state.eaasiProposalGetData);
  const downloadStatus = useSelector(state => state.downloadStatus);
  const selectedResource = useSelector(state => state.selectedResource);
  const selectedTarget = useSelector(state => state.selectedTarget);
  const apiTokens = useSelector(state => state.apiTokens);
  const activeTicketNumber = useSelector(state => state.activeTicketNumber);

  const [modalContent, setModalContent] = useDefault("");

  /**
   *  Close the modal.
   **/
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
    if (eaasiProposalPostData) {
      dispatch(actionCreators.eaasi.getEaasiProposal(eaasiProposalPostData.proposal_link));
    }
  }, [eaasiProposalPostData]);

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
          // disabled={downloadStatus === 'pending' || downloadStatus === 'cancelPending'}
        >
          EaaSI Service
        </DialogTitle>
        <DialogContent style={{ padding: 20 }}>
          <div css={{ display: "flex", justifyContent: "center" }}>
            <p>
              {selectedResource && !downloadStatus ? (
                `Clicking on this button will send the contents of ${selectedResource.title} to EaaSI. They will prepare the contents and return an image that can be run as an emulator.`
              ) : downloadStatus && !eaasiProposalPostData ? (
                "Your request is being processed on the PresQT server..."
              ) : eaasiProposalPostData ? (
                eaasiProposalPostData.message
              ) : eaasiProposalGetData &&
                "image_url" in eaasiProposalGetData ? (
                <Fragment>
                  EaaSI has successfully created an emulation image. It can be
                  downloaded by clicking
                  <a href={`${eaasiProposalGetData.image_url}`} target="_blank">
                    {" "}
                    here.
                  </a>
                </Fragment>
              ) : null}
            </p>
          </div>
          {!downloadStatus ? (
            <div css={{ display: "flex", justifyContent: "center" }}>
              <CustomEaasiButton
                onClick={submitProposal}
                variant="contained"
                color="primary"
                disabled={downloadStatus ? downloadStatus === "pending" : false}
              >
                <span css={textStyles.buttonText}>Send</span>
              </CustomEaasiButton>
            </div>
          ) : downloadStatus &&
            !eaasiProposalPostData &&
            !eaasiProposalGetData ? (
            <Spinner />
          ) : eaasiProposalGetData && "message" in eaasiProposalGetData ? (
            <Spinner />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  ) : null;
}
