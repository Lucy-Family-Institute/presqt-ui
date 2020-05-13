import axios from "axios";
import { apiURLBase } from "../config";

/**
 * Service Collection Endpoint
 */
export function getStatuses() {
  return axios.get(`${apiURLBase}statuses/`);
}
