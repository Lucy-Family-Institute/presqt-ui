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

export default function TokenModal() {
  const dispatch = useDispatch();

  const issueModalDisplay = useSelector(
    state => state.authorization.issueModalDisplay
  );

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleClose = () => {
    dispatch(actionCreators.authorization.hideIssueModal());
  };

  const modalSubmit = () => {
    dispatch(actionCreators.authorization.submitGithubIssue(title, body)) 
    dispatch(actionCreators.authorization.hideIssueModal());
    setTitle("");
    setBody("");
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
          <div>
            <div
              css={{
                paddingTop: 5,
                paddingBottom: 10,
                display: 'flex',
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
                onAnimationEnd={event => {
                  event.stopPropagation();
                }}
                // If the enter button is pressed (code 13), submit the modal.
                onKeyDown={event => {
                  if (event.keyCode === 13) {
                    modalSubmit();
                  }
                }}
              />
            </div>
              <div
                css={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  display: 'flex',
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
            <div css={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  display: 'flex',
                  justifyContent: "center"
                }}>
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
        </DialogContent>
      </Dialog>
    </div>
  ) : null;
}
