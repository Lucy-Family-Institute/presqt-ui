import {apiURLBase} from "../config";
import axios from "axios";

/** EaaSI Proposal **/
export function postEaasiProposal(ticket_number) {
  const proposalURL = `${apiURLBase}services/eaasi/proposals/`;
  const bodyFormData = new FormData();
  bodyFormData.set('ticket_number', ticket_number);

  return axios.post(proposalURL, bodyFormData);
}

export function getEaasiProposal(proposal_link) {
  return axios.get(proposal_link);
}