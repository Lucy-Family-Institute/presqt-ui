import axios from "axios";
import { apiURLBase } from "../config";

export function postFairshareEvaluator(doi) {
  return axios.post(`${apiURLBase}services/fairshare/evaluator/`, {
    resource_id: doi,
  });
}

export function getFairshareEvaluatorTests() {
  console.log("HERE");
  return axios.get(`${apiURLBase}services/fairshare/evaluator/`);
}
