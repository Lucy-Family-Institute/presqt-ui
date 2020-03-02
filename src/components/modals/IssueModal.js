/** @jsx jsx */

import { jsx } from "@emotion/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { useDispatch, useSelector } from "react-redux";
import modalStyles from "../../styles/modal";
import TokenTextField from "../widgets/text_fields/TokenTextField";
import { useState } from "react";
import ModalSubmitButton from "../widgets/buttons/ModalSubmitButton";
import { actionCreators } from "../../redux/actionCreators";
import DialogTitle from "./modalHeader";
import { postGithubIssue } from "../../api/github_issues";
import Spinner from "../widgets/spinners/Spinner";

export default function TokenModal() {
  const dispatch = useDispatch();

  const issueModalDisplay = useSelector(state => state.authorization.issueModalDisplay);
  const githubStatus = useSelector(state => state.authorization.githubStatus);
  const githubIssueData = useSelector(state => state.authorization.githubIssueData);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleClose = () => {
    dispatch(actionCreators.authorization.hideIssueModal());
    dispatch(actionCreators.authorization.clearGithubIssue());
    setTitle("");
    setBody("");
  };

  const modalSubmit = () => {
    dispatch(actionCreators.authorization.submitGithubIssue(title, body));
  };

  const getContent = () => {
    return (
      !githubStatus
        ? <div>
          <div
            css={{
              paddingTop: 5,
              paddingBottom: 10,
              display: "flex",
              justifyContent: "center"
            }}
          >
            <TokenTextField
              variant="outlined"
              size="small"
              type="text"
              value={title}
              label="Insert Title of The Issue Here..."
              onChange={event => setTitle(event.target.value)}
              onAnimationEnd={event => event.stopPropagation()}
            />
          </div>
          <div
            css={{
              paddingTop: 10,
              paddingBottom: 10,
              display: "flex",
              justifyContent: "center"
            }}
          >
            <TokenTextField
              id="outlined-multiline-static"
              label="Insert Content of The Issue Here..."
              onChange={event => setBody(event.target.value)}
              value={body}
              multiline
              rows="4"
              variant="outlined"
            />
          </div>
          <div
            css={{
              paddingTop: 10,
              paddingBottom: 10,
              display: "flex",
              justifyContent: "center"
            }}
          >
            <ModalSubmitButton
              variant="contained"
              css={[
                title ? modalStyles.button : modalStyles.disabledButton,
                modalStyles.buttonText
              ]}
              onClick={() => modalSubmit()}
              disabled={!title || !body}
            >
              Submit Issue
            </ModalSubmitButton>
          </div>
        </div>
        : githubStatus === 'pending'
        ? <Spinner/>
        : githubStatus === "failure"
          ? <div
            css={{
              paddingTop: 5,
              paddingBottom: 10,
              display: "flex",
              justifyContent: "center"
            }}
          >
            <p>Github returned an error trying to post the issue.</p>
          </div>
          :
          <div
            css={{
              paddingTop: 5,
              paddingBottom: 10,
              display: "flex",
              justifyContent: "center"
            }}
          >
            <p>
              Github issue #{githubIssueData.number} created successfully. You
              can find your issue <a href={`${githubIssueData.html_url}`} target='_blank'>here.</a>
            </p>
          </div>
    )
  };

  return issueModalDisplay ? (
    <div>
      <Dialog
        maxWidth="md"
        fullWidth={true}
        open={issueModalDisplay}
        onClose={handleClose}
        aria-labelledby={"form-dialog-title"}
      >
        <DialogTitle id="form-dialog-title" onClose={handleClose}>
          Create an Issue on GitHub
        </DialogTitle>
        <DialogContent>
          {getContent()}
        </DialogContent>
      </Dialog>
    </div>
  ) : null;
}
