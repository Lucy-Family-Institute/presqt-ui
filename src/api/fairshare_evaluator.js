import axios from "axios";
import { apiURLBase } from "../config";

export default function postFairshareEvaluator(resourceID) {
  return axios.post(`${apiURLBase}services/fairshare/evaluator/`, {
    resource_id: resourceID,
  });
}
