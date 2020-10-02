import axios from "axios";
import { apiURLBase } from "../config";

export function postFairshareEvaluator(doi, testList) {
  return axios.post(`${apiURLBase}services/fairshare/evaluator/`, {
    "resource_id": doi,
    "tests": testList,
  });
}

export function getFairshareEvaluatorTests() {
  return axios.get(`${apiURLBase}services/fairshare/evaluator/`);
}
