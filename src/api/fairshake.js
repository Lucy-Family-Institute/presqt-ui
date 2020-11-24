import axios from "axios";
import { apiURLBase } from "../config";

export function getFairshakeRubric(rubric_id) {
    console.log("IN API CALL", rubric_id)
    return axios.get(
        `${apiURLBase}services/fairshake/rubric/${rubric_id}/`
    )
}