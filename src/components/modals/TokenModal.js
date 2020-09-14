/** @jsx jsx */

import {jsx} from "@emotion/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {useDispatch, useSelector} from "react-redux";
import modalStyles from "../../styles/modal";
import textStyles from "../../styles/text";
import TokenTextField from "../widgets/text_fields/TokenTextField";
import React, {useState} from "react";
import ModalSubmitButton from "../widgets/buttons/ModalSubmitButton";
import {actionCreators} from "../../redux/actionCreators";
import DialogTitle from "./modalHeader";
import getError from "../../utils/getError";
import { InputAdornment } from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import buttons from "../../styles/buttons";



export default function TokenModal() {
  const dispatch = useDispatch();

  const apiOperationErrors = useSelector(state => state.apiOperationErrors);
  const sourceTarget = useSelector(state => state.selectedTarget);
  const tokenModalDisplay = useSelector(state => state.tokenModalDisplay);
  const connection = useSelector(state => state.selectedTarget);

  const error = getError(actionCreators.resources.loadFromTarget);

  const [token, setToken] = useState('');
  const [passwordIsMasked, setPasswordIsMasked] = useState(true);

  /**
   * Close the modal.
   * Dispatch saveToken action to save target token to apiTokens
   * Dispatch loadFromTarget action.
   */
  const handleClose = () => {
    dispatch(actionCreators.authorization.hideTokenModal());
    if (apiOperationErrors.length > 0 && error) {
      dispatch(actionCreators.resources.removeFromErrorList(
        actionCreators.resources.loadFromTarget.toString()));
      dispatch(actionCreators.authorization.removeToken(sourceTarget.name));
    }
    setToken('')
    setPasswordIsMasked(true);
  };

  /**
   * Close the modal.
   * Dispatch saveToken action to save target token to apiTokens
   * Dispatch loadFromTarget action.
   */
  const modalSubmit = () => {
    dispatch(actionCreators.authorization.hideTokenModal());
    dispatch(actionCreators.authorization.saveToken(connection.name, token));
    dispatch(actionCreators.resources.loadFromTarget(connection, token));
    if (apiOperationErrors.length > 0 && error){
      dispatch(actionCreators.resources.removeFromErrorList(
        actionCreators.resources.loadFromTarget.toString()));
    }
    setToken('');
    setPasswordIsMasked(true);
  };

  return connection
  ? (
    <div>
      <Dialog maxWidth="md" fullWidth={true} open={tokenModalDisplay}
              onClose={handleClose} aria-labelledby={"form-dialog-title"}>
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
              need to supply your
              <a href={`${connection.token_url}`} target="_blank" rel="noopener noreferrer">
              API token</a>. This will not be saved, so if you come back to this website, you will 
              need to provide your token again.
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
                type={passwordIsMasked ? 'password' : 'text'}
                value={token}
                label="Insert API Token Here"
                onChange={event => setToken(event.target.value)}
                onAnimationEnd={(event) => { event.stopPropagation() }}
                // If the enter button is pressed (code 13), submit the modal.
                onKeyDown={(event) => { event.keyCode === 13 && token !== '' ? modalSubmit() : null }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      {passwordIsMasked
                        ?
                        <VisibilityOffIcon
                          css={[buttons.inlineButton]}
                          onClick={() => setPasswordIsMasked(!passwordIsMasked)}
                        />
                        :
                        <VisibilityIcon
                          css={[buttons.inlineButton]}
                          onClick={() => setPasswordIsMasked(!passwordIsMasked)}
                        />
                      }
                    </InputAdornment>
                  )
                }}
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