/** @jsx jsx */
import { Fragment, useEffect, useState } from "react";
import Spinner from "../widgets/spinners/Spinner";
import { actionCreators } from "../../redux/actionCreators";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { jsx } from "@emotion/core";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../styles/colors";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import getError from "../../utils/getError";

export default function FAIRshareStepperResults() {
  const dispatch = useDispatch();

  const fairshareEvaluationStatus = useSelector((state) => state.fairshareEvaluationStatus);
  const fairshareModalDisplay = useSelector((state) => state.fairshareModalDisplay);
  const fairshareResultsData = useSelector((state) => state.fairshareResultsData);

  const fairsharePostError = getError(actionCreators.fairshare.sendFairshareEvaluation);

  const [modalContentHeader, setModalContentHeader] = useState("Evaluation task is being processed on the FAIRshare server, this may take several minutes...");
  const [modalContentBody, setModalContentBody] = useState(<Spinner />);

  useEffect(() => {
    if (fairshareEvaluationStatus === "postFinished") {
      setModalContentHeader(
        <Fragment>
          //STYLE THIS
          {fairshareResultsData.toString()}
        </Fragment>
      );
      setModalContentBody("");
    }
    else if (fairshareEvaluationStatus === "postFailure") {
      setModalContentHeader(
        <div
          css={{
            paddingTop: 20,
            paddingBottom: 20,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ErrorOutlineIcon color="error" />
          <span css={{ marginLeft: 5 }}>
            FAIRshare Error: {fairsharePostError.data.error}
          </span>
        </div>
      );
      setModalContentBody("");
    }
  }, [fairshareEvaluationStatus, fairshareModalDisplay]);
    
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
