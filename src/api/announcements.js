import axios from "axios";
import { serverBase } from "../config";

/**
 * Announcements Endpoint
 */
export function fetchAnnouncements() {
  return axios.get(`${serverBase}announcements.txt`);
}
