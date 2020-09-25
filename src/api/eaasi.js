import {apiURLBase} from "../config";
import axios from "axios";

/** EaaSI Proposal **/
export function postEaasiProposal(sourceToken) {
  const proposalURL = `${apiURLBase}services/eaasi/proposals/`;

  return axios.post(proposalURL, {}, {
    headers: {
      'presqt-source-token': sourceToken
    }});
}

export function getEaasiProposal(proposal_link) {
  return axios.get(proposal_link);
}