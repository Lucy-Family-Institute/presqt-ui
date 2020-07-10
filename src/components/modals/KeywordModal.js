/** @jsx jsx */
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "./modalHeader";
import DialogContent from "@material-ui/core/DialogContent";
import { jsx } from "@emotion/core";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment } from "react";
import { actionCreators } from "../../redux/actionCreators";
import KeywordStepper from "../keyword_stepper/KeywordStepper";
import getError from '../../utils/getError';

export default function KeywordModal() {
  const dispatch = useDispatch();

  const apiOperationErrors = useSelector((state) => state.apiOperationErrors);
  const keywordModalDisplay = useSelector((state) => state.keywordModalDisplay);
  const keywords = useSelector((state) => state.keywords);

  const keywordPostError = getError(actionCreators.keywords.sendKeywords);

  const handleClose = () => {
    dispatch(actionCreators.keywords.clearKeywordData());
    dispatch(actionCreators.keywords.hideKeywordModal());
    dispatch(actionCreators.keywords.clearKeywords());
    if (apiOperationErrors.length > 0 && keywordPostError) {
      dispatch(
        actionCreators.resources.removeFromErrorList(
          actionCreators.keywords.sendKeywords.toString()
        )
      );
    }
  };

  return keywordModalDisplay ? (
    <div css={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <Dialog
        maxWidth="md"
        fullWidth={true}
        open={keywordModalDisplay}
        onClose={handleClose}
        aria-labelledby={"form-dialog-title"}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
        <DialogTitle
          id="form-dialog-title"
          onClose={handleClose}
          disabled={!keywords}
        >
          Keyword Enhancement
        </DialogTitle>
        <DialogContent style={{ padding: 20 }}>
          <KeywordStepper />
        </DialogContent>
      </Dialog>
    </div>
  ) : null;
}
