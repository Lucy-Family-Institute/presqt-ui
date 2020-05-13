import axios from "axios";
import {apiURLBase} from "../config";

/**
 * Resource Transfer Endpoint
 **/
export function postResourceTransfer(destinationTarget, destinationToken, sourceResource, duplicateAction,
                                     keywordAction, resourceToTransferTo, sourceTarget, sourceToken) {

  let resourceTransferURL;
  if (!resourceToTransferTo) {
    resourceTransferURL = `${apiURLBase}targets/${destinationTarget}/resources/`;
  } else {
    resourceTransferURL = `${apiURLBase}targets/${destinationTarget}/resources/${resourceToTransferTo.id}/`;
  }
  const bodyFormData = new FormData();

  bodyFormData.set('source_target_name', sourceTarget);
  bodyFormData.set('source_resource_id', sourceResource.id);

  return axios.post(resourceTransferURL,
    bodyFormData,
    {
      headers: {
        'presqt-destination-token': destinationToken,
        'presqt-source-token': sourceToken,
        'presqt-file-duplicate-action': duplicateAction,
        'presqt-keyword-action': keywordAction,
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
export function cancelResourceTransferJob(ticketNumber, sourceToken, destinationToken) {
  return axios.patch(`${apiURLBase}transfers/${ticketNumber}/`,
    null, {
      headers: {
        'presqt-source-token': sourceToken,
        'presqt-destination-token': destinationToken
      }
    });
}