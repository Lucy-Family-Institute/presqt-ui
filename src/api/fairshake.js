import axios from "axios";
import { apiURLBase } from "../config";

export function getFairshakeRubric(rubric_id) {
    return axios.get(
        `${apiURLBase}services/fairshake/rubric/${rubric_id}/`
    )
}