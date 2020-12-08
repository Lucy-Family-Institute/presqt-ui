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
import { build_svg_from_score } from 'fairshakeinsignia'


export default function FAIRshakeAssessmentResults() {
  const dispatch = useDispatch();

  const [modalContentHeader, setModalContentHeader] = useState("");
  const [modalContentBody, setModalContentBody] = useState("");

  const fairshakeAssessmentResults = useSelector(state => state.fairshakeAssessmentResults)
  const fairshakeAssessmentStatus = useSelector(state => state.fairshakeAssessmentStatus)
  const apiOperationErrors = useSelector(state => state.apiOperationErrors);
  const fairshakeAssessmentError = getError(actionCreators.fairshake.submitFairshakeAssessment, apiOperationErrors)

  useEffect(() => {
    if (fairshakeAssessmentStatus === 'postPending') {
        setModalContentHeader("Sending assessment details to FAIRshake...");
        setModalContentBody(<Spinner />);
    }
    else if (fairshakeAssessmentStatus === 'postFailure') {
        setModalContentHeader(
            <div
            css={{ paddingTop: 20, paddingBottom: 20, display: 'flex', flexDirection: 'row', alignItems: 'center',  justifyContent: 'center' }}>
            <ErrorOutlineIcon color="error" />
            <span css={{ marginLeft: 5 }}>{fairshakeAssessmentError.data.error}</span>
            </div>);
    setModalContentBody("");
    }
    else if (fairshakeAssessmentStatus === 'postFinished') {
        setModalContentHeader(
            <Fragment>
              <CheckCircleOutlineIcon
                style={{ color: colors.successGreen, paddingRight:5 }}
              />
              FAIRshake has successfully registered a digital object and created your assessment. It can be found&nbsp;<a href={`https://fairshake.cloud/digital_object/${fairshakeAssessmentResults.digital_object_id}/assessments/`} target="_blank">here.</a>
              {/*<div style={{width: 40, height: 40}} id="insignia"></div>*/}
            </Fragment>
          );
          setModalContentBody("");
    }
    
  }, [fairshakeAssessmentResults, fairshakeAssessmentError, fairshakeAssessmentStatus])

  useEffect(() => {
    if (fairshakeAssessmentResults) {
      build_svg_from_score(document.getElementById('insignia'), {
        project: 116,
        target: fairshakeAssessmentResults.digital_object_id
      })
    }
  }, [fairshakeAssessmentResults])

  return(
    <Fragment>
      <div style={{ display: "flex", justifyContent: "center", padding: 10 }}>
        {modalContentHeader}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {modalContentBody}
      </div>
      {
        fairshakeAssessmentResults ?
          <Fragment>
            <div style={{ display: "flex", justifyContent: "center", width: '100%'}}>
              The following image represents the results:
            </div>
            <div style={{ display: "flex", justifyContent: "center", width: '100%'}}>
              <div id="insignia" style={{marginTop: 10, width: 100, height: 100}}></div>
            </div>
          </Fragment>

        : null
      }
    </Fragment>
  )
}