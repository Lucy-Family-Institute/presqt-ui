/** @jsx jsx */
import {Fragment, useEffect, useState} from "react";
import Spinner from "../widgets/spinners/Spinner";
import {actionCreators} from "../../redux/actionCreators";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import {jsx} from "@emotion/core";
import {useDispatch, useSelector} from "react-redux";
import colors from "../../styles/colors";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import getError from "../../utils/getError";

export default function EaasiStepperResults() {
  const dispatch = useDispatch();

  const eaasiProposalStatus = useSelector(state => state.eaasiProposalStatus);
  const eaasiModalDisplay = useSelector(state => state.eaasiModalDisplay);
  const downloadForService = useSelector(state => state.downloadForService);
  const eaasiProposalPostData = useSelector(state => state.eaasiProposalPostData);
  const eaasiProposalGetData = useSelector(state => state.eaasiProposalGetData);
  const downloadForServiceStatus = useSelector(state => state.downloadForServiceStatus);
  const apiOperationErrors = useSelector(state => state.apiOperationErrors);

  const [modalContentHeader, setModalContentHeader] = useState("");
  const [modalContentBody, setModalContentBody] = useState("");

  const eaasiGetError = getError(actionCreators.eaasi.getEaasiProposal, apiOperationErrors);
  const eaasiPostError = getError(actionCreators.eaasi.sendEaasiProposal, apiOperationErrors);

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
    else if (eaasiProposalStatus === 'postFailure') {
      setModalContentHeader(
        <div
          css={{ paddingTop: 20, paddingBottom: 20, display: 'flex', flexDirection: 'row', alignItems: 'center',  justifyContent: 'center' }}>
          <ErrorOutlineIcon color="error" />
          <span css={{ marginLeft: 5 }}>EaaSI Error: {eaasiPostError.data.message}</span>
        </div>);
      setModalContentBody("");
    }
    else if (eaasiProposalStatus === 'getPending') {
      setModalContentHeader("Proposal task is being processed on the EaaSI server...")
    }
    else if (eaasiProposalStatus === 'getFinished') {
      setModalContentHeader(
        <Fragment>
          <CheckCircleOutlineIcon
            style={{ color: colors.successGreen, paddingRight:5 }}
          />
          EaaSI has successfully created an emulation image. It can be downloaded by clicking&nbsp;<a href={`${eaasiProposalGetData.image_url}`} target="_blank">here.</a>
        </Fragment>
      );
      setModalContentBody("");
    }
    else if (eaasiProposalStatus === 'getFailure') {
      setModalContentHeader(
        <div
          css={{ paddingTop: 20, paddingBottom: 20, display: 'flex', flexDirection: 'row', alignItems: 'center',  justifyContent: 'center' }}>
          <ErrorOutlineIcon color="error" />
          <span css={{ marginLeft: 5 }}>EaaSI Error: {eaasiGetError.data.message}</span>
        </div>);
      setModalContentBody("");
    }
  }, [eaasiProposalStatus, eaasiModalDisplay, downloadForService]);

  return(
    <Fragment>
      <div css={{ display: "flex", justifyContent: "center", padding: 10 }}>
        {modalContentHeader}
      </div>
      <div css={{ display: "flex", justifyContent: "center" }}>
        {modalContentBody}
      </div>
    </Fragment>
  )
}