/** @jsx jsx */

import {jsx} from "@emotion/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {useDispatch, useSelector} from "react-redux";
import modalStyles from "../../styles/modal";
import textStyles from "../../styles/text";
import TokenTextField from "../widgets/text_fields/TokenTextField";
import React, {useEffect, useState} from "react";
import ModalSubmitButton from "../widgets/buttons/ModalSubmitButton";
import {actionCreators} from "../../redux/actionCreators";
import DialogTitle from "./modalHeader";

export default function TokenModal() {
  const dispatch = useDispatch();

  const apiTokens = useSelector(state => state.authorization.apiTokens);
  const apiOperationErrors = useSelector(state => state.resources.apiOperationErrors);
  const sideSelected = useSelector(state => state.resources.sideSelected);
  const tokenModalDisplay = useSelector(state => state.authorization.tokenModalDisplay);

  const target = sideSelected === 'left'
    ? useSelector(state => state.targets.leftTarget)
    : useSelector(state => state.targets.rightTarget);

  const [token, setToken] = useState('');

  const error = apiOperationErrors.find(
    element => element.action === actionCreators.resources.loadFromTarget.toString());

  /**
   * Add errors to the token state if they exist.
   **/
  useEffect(() => {
    if (tokenModalDisplay) {
      setToken(apiTokens[target.name] ? apiTokens[target.name]: '');
    }
  }, [tokenModalDisplay]);

  /**
   * Close the modal.
   * Dispatch saveToken action to save target token to apiTokens
   * Dispatch loadFromTarget action.
   *    -> Saga call to Resource-Collection occurs with this action.
   *        -> Saga function dispatched loadFromTargetSuccess action when finished.
   */
  const handleClose = () => {
    dispatch(actionCreators.authorization.hideTokenModal());
    if (apiOperationErrors.length > 0 && error) {
      dispatch(actionCreators.resources.removeFromErrorList(
        actionCreators.resources.loadFromTarget.toString()));
      dispatch(actionCreators.authorization.removeToken(target.name));
    }
  };

  /**
   * Close the modal.
   * Dispatch saveToken action to save target token to apiTokens
   * Dispatch loadFromTarget action.
   *    -> Saga call to Resource-Collection occurs with this action.
   *        -> Saga function dispatched loadFromTargetSuccess action when finished.
   */
  const modalSubmit = () => {
    dispatch(actionCreators.authorization.hideTokenModal());
    dispatch(actionCreators.authorization.saveToken(target.name, token));
    dispatch(actionCreators.resources.loadFromTarget(sideSelected, target, token));
    if (apiOperationErrors.length > 0 && error){
      dispatch(actionCreators.resources.removeFromErrorList(
        actionCreators.resources.loadFromTarget.toString()));
    }
    setToken('');
  };

  return target
  ? (
    <div>
      <Dialog maxWidth="md" fullWidth={true} open={tokenModalDisplay}
              onClose={handleClose} aria-labelledby={"form-dialog-title"}>
        <DialogTitle id="form-dialog-title" onClose={handleClose}>
          {`Access Token for ${target.readable_name}`}
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
              <p>In order to connect to {target.readable_name} you will
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
                onAnimationEnd={(event) => { event.stopPropagation() }}
                // If the enter button is pressed (code 13), submit the modal.
                onKeyDown={(event) => { if (event.keyCode === 13) {modalSubmit()} }}
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