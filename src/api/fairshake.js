import axios from "axios";
import { apiURLBase } from "../config";

export function getFairshakeRubric(rubric_id) {
    return axios.get(
        `${apiURLBase}services/fairshake/rubric/${rubric_id}/`
    )
}

export function sendFairshakeAssessment(projectUrl, projectTitle, rubricAnswers, rubric_id) {
    return axios.post(
        `${apiURLBase}services/fairshake/rubric/${rubric_id}/`,
        {
            project_url: projectUrl,
            project_title: projectTitle,
            rubric_answers: rubricAnswers
        }
    )
}