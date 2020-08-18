import axios from 'axios';
import { apiURLBase } from '../config';
import sha256 from 'crypto-js/sha256';

export function getCollectionProgress(targetToken) {
    const ticketNumber = sha256(targetToken).toString();
    return axios.get(`${apiURLBase}collection/${ticketNumber}`, {
      headers: {'presqt-source-token': targetToken}
    });
}