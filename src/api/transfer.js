import axios from "axios";
import {apiURLBase} from "../config";

/**
 * Resource Transfer Endpoint
 **/
export function postResourceTransfer(destinationTarget, destinationToken, sourceResource, duplicateAction,
                                     keywordAction, keywordList, resourceToTransferTo, sourceTarget, sourceToken, emailAddress) {

  let resourceTransferURL;
  if (!resourceToTransferTo) {
    resourceTransferURL = `${apiURLBase}targets/${destinationTarget}/resources/`;
  } else {
    resourceTransferURL = `${apiURLBase}targets/${destinationTarget}/resources/${resourceToTransferTo.id}/`;
  }

  return axios.post(resourceTransferURL,
    {'source_target_name': sourceTarget, 'source_resource_id': sourceResource.id, 'keywords': keywordList},
    {
      headers: {
        'presqt-destination-token': destinationToken,
        'presqt-source-token': sourceToken,
        'presqt-file-duplicate-action': duplicateAction,
        'presqt-keyword-action': keywordAction,
        'presqt-email-opt-in': emailAddress,
        'Content-Type': 'application/json'
      }
    }
  )
}

/**
 * Resource Transfer Job Endpoint
 **/
export function resourceTransferJob(transferJobURL, sourceToken, destinationToken) {
  return axios.get(
    transferJobURL,
    {
      headers: {
        'presqt-source-token': sourceToken,
        'presqt-destination-token': destinationToken
      }
    });
}

/**
 * Cancel Transfer Job Endpoint
 **/
export function cancelResourceTransferJob(sourceToken, destinationToken) {
  return axios.patch(`${apiURLBase}job_status/transfers/`,
    null, {
      headers: {
        'presqt-source-token': sourceToken,
        'presqt-destination-token': destinationToken
      }
    });
}