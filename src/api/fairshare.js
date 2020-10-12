import axios from "axios";
import { apiURLBase } from "../config";

export function postFairshareEvaluator(doi, testList, email) {
  return axios.post(
    `${apiURLBase}services/fairshare/evaluator/`,
    {
      resource_id: doi,
      tests: testList,
    },
    {
      headers: {
        "presqt-email-opt-in": email,
      },
    }
  );
}

export function getFairshareEvaluatorTests() {
  return axios.get(`${apiURLBase}services/fairshare/evaluator/`);
}
