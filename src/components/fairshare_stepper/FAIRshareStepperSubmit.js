/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { Fragment, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import colors from "../../styles/colors";
import Button from "@material-ui/core/Button/Button";
import textStyles from "../../styles/text";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux/actionCreators";
import FAIRshareTestsList from "../widgets/list_items/FAIRshareTestsList";
import SearchTextField from "../widgets/text_fields/SearchTextField";

const CustomFairshareButton = withStyles({
  root: {
    backgroundColor: colors.presqtBlue,
    "&:hover": {
      backgroundColor: "#0a4996",
    },
  },
})(Button);

export default function FAIRshareStepperSubmit({ setActiveStep }) {
  const dispatch = useDispatch();

  const selectedResource = useSelector((state) => state.selectedResource);
  const fairshareTests = useSelector((state) => state.fairshareTests);
  const [newTests, setNewTests] = useState([]);
  const [email, setEmail] = useState("");

  const emailKeystroke = (event) => {
    setEmail(event.target.value);
  };

  const submitEvaluation = () => {
    // We need to build a list of all the test IDs
    let testsToPost = []
    const pushThoseTests = (newTests.map((value, index) => {
      testsToPost.push(value.test_id);
    }));
    dispatch(actionCreators.fairshare.sendFairshareEvaluation(selectedResource.identifier, testsToPost, email));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Fragment>
      <div css={{ paddingBottom: 10 }}>
        Submit a FAIRshare Evaluator request for <i>{selectedResource.title}</i>{" "}
        with identifier <i>{selectedResource.identifier}</i>. They will return the results of
        the tests you select to run below.
      </div>
      <FAIRshareTestsList
        tests={fairshareTests}
        header={"FAIRshare tests supported by PresQT"}
        setNewTests={setNewTests}
        newTests={newTests}
      />
      <div css={{ paddingBottom: 10 }}>
        You can input your email below and we will notify you once this evaluation is 
        complete. Inputing your email address is not mandatory and we will not
        store this information on the server once the process has finished.
      </div>
      <div css={{ paddingBottom: 10 }}>
        <SearchTextField
          size="small"
          type="text"
          id="outlined-basic"
          label="Email Address"
          variant="outlined"
          value={email}
          onChange={(event) => emailKeystroke(event)}
        />
        </div>
      <CustomFairshareButton
        onClick={submitEvaluation}
        variant="contained"
        color="primary"
      >
        <span css={textStyles.buttonText}>Evaluate</span>
      </CustomFairshareButton>
    </Fragment>
  );
}
