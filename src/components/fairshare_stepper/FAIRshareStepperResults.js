/** @jsx jsx */
import { Fragment, useEffect, useState } from "react";
import Spinner from "../widgets/spinners/Spinner";
import { actionCreators } from "../../redux/actionCreators";
import { jsx } from "@emotion/core";
import { useDispatch, useSelector } from "react-redux";
import getError from "../../utils/getError";
import FAIRshareResultsContent from "./FAIRshareResultsContent";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

export default function FAIRshareStepperResults() {
  const fairshareEvaluationStatus = useSelector((state) => state.fairshareEvaluationStatus);
  const fairshareResultsData = useSelector((state) => state.fairshareResultsData);
  const apiOperationErrors = useSelector(state => state.apiOperationErrors);

  const fairsharePostError = getError(actionCreators.fairshare.sendFairshareEvaluation, apiOperationErrors);

  const [stepContent, setStepContent] = useState(
    <div>
      <div
        css={{
          paddingBottom: 15,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        Evaluation task is being processed on the FAIRshare server, this may
        take several minutes...
      </div>
      <Spinner />
    </div>
  );

  useEffect(() => {
    if (fairshareEvaluationStatus === "postFinished") {
      setStepContent(
        <Fragment>
          {fairshareResultsData.map((testInfo) => (
            <FAIRshareResultsContent testInfo={testInfo} />
          ))}
        </Fragment>
    );
    } else if (fairshareEvaluationStatus === "postFailure") {
      setStepContent(
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
    }
  }, [fairshareEvaluationStatus]);

  return stepContent;
}
