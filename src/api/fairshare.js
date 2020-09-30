import axios from "axios";
import { apiURLBase } from "../config";

export function postFairshareEvaluator(doi) {
  console.log("API CALL");
  return axios.post(`${apiURLBase}services/fairshare/evaluator/`, {
    resource_id: doi,
  });
}
