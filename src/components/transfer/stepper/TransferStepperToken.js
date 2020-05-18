/** @jsx jsx */
import {jsx} from "@emotion/core";
import {actionCreators} from "../../../redux/actionCreators";
import SearchTextField from "../../widgets/text_fields/SearchTextField";
import { withStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import { InputAdornment } from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import buttons from "../../../styles/buttons";
import {useState} from "react";

const TokenTextField = withStyles({
  root: {
    width: '90%',
  }
})(SearchTextField);

export default function TransferStepperToken({ handleNext, activeStep }) {
  const dispatch = useDispatch();
  const transferDestinationToken = useSelector(state => state.transferDestinationToken);

  const [passwordIsMasked, setPasswordIsMasked] = useState(true);

  return (
    <TokenTextField
      size="small"
      type={passwordIsMasked ? 'password' : 'text'}
      label="Insert API Token Here"
      value={transferDestinationToken}
      onChange={event => dispatch(actionCreators.transfer.saveTransferToken(event.target.value))}
      // If the enter button is pressed (code 13), go to the next step.
      onKeyDown={(event) => { event.keyCode === 13 && transferDestinationToken !== ''  && activeStep === 1 ? handleNext() : null }}
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
  )
}