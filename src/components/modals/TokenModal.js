/** @jsx jsx */

import {jsx} from "@emotion/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {useDispatch, useSelector} from "react-redux";
import modalStyles from "../../styles/modal";
import textStyles from "../../styles/text";
import TokenTextField from "../widgets/TokenTextField";
import {useEffect, useState} from "react";
import ModalSubmitButton from "../widgets/ModalSubmitButton";
import {actionCreators} from "../../redux/actionCreators";
import DialogTitle from "./modalHeader";

export default function TokenModal({connection, modalState, setModalState}) {
  const dispatch = useDispatch();

  /** SELECTOR DEFINITIONS
   * apiTokens          : Object of <targets: tokens> submitted in the current session
   * apiOperationErrors : List of objects of current api errors
   * sourceTarget       : Object of the current source selected
   **/
  const apiTokens = useSelector(state => state.authorization.apiTokens);
  const apiOperationErrors = useSelector(state => state.resources.apiOperationErrors);
  const sourceTarget = useSelector(state => state.targets.source);

  const [token, setToken] = useState('');

  const error = apiOperationErrors.find(
    element => element.action === actionCreators.resources.loadFromSourceTarget.toString());

  /**
   * Add errors to the token state if they exist.
   **/
  useEffect(() => {
    if (modalState) {
      setToken(apiTokens[sourceTarget.name] ? apiTokens[sourceTarget.name]: '');
    }
  }, [modalState]);

  /**
   * Close the modal.
   * Dispatch saveToken action to save target token to apiTokens
   * Dispatch loadFromSourceTarget action.
   *    -> Saga call to Resource-Collection occurs with this action.
   *        -> Saga function dispatched loadFromSourceTargetSuccess action when finished.
   */
  const handleClose = () => {
    setModalState(false);
    if (apiOperationErrors.length > 0 && error) {
      dispatch(actionCreators.resources.removeFromErrorList(
        actionCreators.resources.loadFromSourceTarget.toString()));
      dispatch(actionCreators.authorization.removeToken(sourceTarget.name));
    }
  };

  /**
   * Close the modal.
   * Dispatch saveToken action to save target token to apiTokens
   * Dispatch loadFromSourceTarget action.
   *    -> Saga call to Resource-Collection occurs with this action.
   *        -> Saga function dispatched loadFromSourceTargetSuccess action when finished.
   */
  const modalSubmit = () => {
    setModalState(false);
    dispatch(actionCreators.authorization.saveToken(connection.name, token));
    dispatch(actionCreators.resources.loadFromSourceTarget(connection, token, null));
    if (apiOperationErrors.length > 0 && error){
      dispatch(actionCreators.resources.removeFromErrorList(
        actionCreators.resources.loadFromSourceTarget.toString()));
    }
    setToken('');
  };

  return connection
  ? (
    <div>
      <Dialog maxWidth="md" fullWidth={true} open={modalState} onClose={handleClose} aria-labelledby={"form-dialog-title"}>
        <DialogTitle id="form-dialog-title" onClose={handleClose}>
          {`Access Token for ${connection.readable_name}`}
        </DialogTitle>
        <DialogContent>
          <div
            css={{
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              color: 'black'
            }}
          >
              <p>In order to connect to {connection.readable_name} you will
              need to supply your API token. This will not be saved, so if
              you come back to this website, you will need to provide your
              token again.
              </p>
            <div
              css={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexBasis: 35
              }}
            >
              <TokenTextField
                size="small"
                type='text'
                value={token}
                label="Insert API Token Here"
                onChange={event => setToken(event.target.value)}
                onAnimationEnd={(event) => {event.stopPropagation()}}
              />
              <ModalSubmitButton
                variant="contained"
                css={[
                  token ? modalStyles.button : modalStyles.disabledButton,
                  modalStyles.buttonText
                ]}
                onClick={() => modalSubmit()}
                disabled={!token}
              >
                Connect
              </ModalSubmitButton>
            </div>
            <p css={[textStyles.body, textStyles.cubsRed]}>
              {error ? error.data: ''}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
  : null
}