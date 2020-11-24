import { call, put, delay, takeEvery } from "@redux-saga/core/effects";
import { actionCreators } from "../actionCreators";
import { getFairshakeRubric } from "../../api/fairshake";


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
        console.log(response.data)
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