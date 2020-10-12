/** @jsx jsx */

import { jsx } from "@emotion/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { useDispatch, useSelector } from "react-redux";
import modalStyles from "../../styles/modal";
import TokenTextField from "../widgets/text_fields/TokenTextField";
import ModalSubmitButton from "../widgets/buttons/ModalSubmitButton";
import { actionCreators } from "../../redux/actionCreators";
import DialogTitle from "./modalHeader";
import Spinner from "../widgets/spinners/Spinner";
import useDefault from "../../hooks/useDefault";

export default function IssueModal() {
  const dispatch = useDispatch();
  var Filter = require('bad-words');
  const filter = new Filter();

  const issueModalDisplay = useSelector(state => state.issueModalDisplay);
  const githubStatus = useSelector(state => state.githubStatus);
  const githubIssueData = useSelector(state => state.githubIssueData);

  const [title, setTitle] = useDefault("");
  const [body, setBody] = useDefault("");

  const handleClose = () => {
    dispatch(actionCreators.github.hideIssueModal());
    dispatch(actionCreators.github.clearGithubIssue());
    setTitle();
    setBody();
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
                onChange={event => setTitle(filter.clean(event.target.value))}
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
                onChange={event => setBody(filter.clean(event.target.value))}
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
                  modalStyles.button,
                  modalStyles.buttonText
                ]}
                onClick={() => dispatch(actionCreators.github.submitGithubIssue(title, body))}
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
