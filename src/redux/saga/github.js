import { postGithubIssue } from "../../api/github_issues";
import { actionCreators } from "../actionCreators";
import { call, put, takeEvery } from "@redux-saga/core/effects";

export function* watchSubmitIssue() {
  yield takeEvery(actionCreators.github.submitGithubIssue, submitGithubIssue);
}

function* submitGithubIssue(action) {
  try {
    const response = yield call(
      postGithubIssue,
      action.payload.title,
      action.payload.body
    );
    yield put(actionCreators.github.submitGithubIssueSuccess(response.data));
  }
  catch (error) {
    yield put(actionCreators.github.submitGithubIssueFailure(error.response));
  }
}
