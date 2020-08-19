import axios from "axios";
import { githubToken } from "../config";

export function postGithubIssue(title, body) {
  const issueUrl = "https://api.github.com/repos/ndlib/presqt-ui/issues";
  // Replace newlines with newline character
  const newBody = body.replace(/(?:\r\n|\r|\n)/g, '\\n')
  const bodyJSON = `{"title": "${title}", "body": "${newBody}"}`;
  
  return axios.post(issueUrl, JSON.parse(bodyJSON), {
    headers: { "Authorization": `token ${githubToken}` }
  });

}
