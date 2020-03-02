import axios from "axios";
import { githubToken } from "../config";

export function postGithubIssue(title, body) {
  const issueUrl = "https://api.github.com/repos/ndlib/presqt-ui/issues";
  const bodyJSON = `{"title": "${title}", "body": "${body}"}`;

  return axios.post(issueUrl, JSON.parse(bodyJSON), {
    headers: { "Authorization": `token ${githubToken}` }
  });
}
