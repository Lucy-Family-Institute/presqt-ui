import { call, put, takeEvery } from "@redux-saga/core/effects";
import { actionCreators } from "../actionCreators";
import { getFairshakeRubric, sendFairshakeAssessment } from "../../api/fairshake";


export function* watchGetFairshakeRubric() {
    yield takeEvery(
        actionCreators.fairshake.getFairshakeRubric,
        fairshakeRubric
    );
}

function* fairshakeRubric(action) {
    try {
        const response = yield call(
            getFairshakeRubric,
            action.payload.rubric_id
        );
        yield put(
            actionCreators.fairshake.getFairshakeRubricSuccess(response.data)
        );
    }
    catch (error) {
        yield put(
            actionCreators.fairshake.getFairshakeRubricFailure(
                error.response.data,
                error.response.status
            )
        );
    }
}


export function* watchSubmitFairshakeAssessment() {
    yield takeEvery(
        actionCreators.fairshake.submitFairshakeAssessment,
        submitFairshakeAssessment
    )
}

function* submitFairshakeAssessment(action) {
    try {
        const response = yield call(
            sendFairshakeAssessment,
            action.payload.projectUrl,
            action.payload.projectTitle,
            action.payload.rubricAnswers,
            action.payload.rubric_id
        );
        yield put(
            actionCreators.fairshake.submitFairshakeAssessmentSuccess(response.data)
        );
    }
    catch (error) {
        console.log(error.response)

        yield put(
            actionCreators.fairshake.submitFairshakeAssessmentFailure(
                error.response.data,
                error.response.status
            )
        );
    }
    }