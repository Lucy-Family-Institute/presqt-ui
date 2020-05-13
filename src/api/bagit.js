import axios from "axios";
import {apiURLBase} from "../config";

export function submitBagit(file) {
  const bodyFormData = new FormData();
  bodyFormData.set('presqt-file', file);
  return axios.post(`${apiURLBase}bag_and_zip/`, bodyFormData, {responseType: 'blob'})
}