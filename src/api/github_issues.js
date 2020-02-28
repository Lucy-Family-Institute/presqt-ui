import axios from 'axios';

export function postGithubIssue(title, body) {
const issueUrl = 'https://api.github.com/repos/ndlib/presqt-ui/issues';
const bodyFormData = new FormData();

bodyFormData.set('title', title);
bodyFormData.set('body', body);

return axios.post(issueUrl, bodyFormData, headers={"Authoriation": `token ${process.env.GITHUB_KEY}`})