import axios from "axios";
import { apiURLBase } from "../config";

/**
 * Service Collection Endpoint
 */
export function getServices() {
  return axios.get(`${apiURLBase}services/`);
}

/**
 * Service Detail Endpoint
 */
export function getService(service) {
  return axios.get(`${apiURLBase}services/${service.name}/`);
}