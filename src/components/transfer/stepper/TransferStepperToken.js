/** @jsx jsx */
import {jsx} from "@emotion/core";
import {actionCreators} from "../../../redux/actionCreators";
import SearchTextField from "../../widgets/text_fields/SearchTextField";
import { withStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import {testTokens, testTokenCommand} from "../../../config";

const TokenTextField = withStyles({
  root: {
    width: '90%',
  }
})(SearchTextField);

export default function TransferStepperToken({ handleNext }) {
  const dispatch = useDispatch();
  const transferDestinationToken = useSelector(state => state.transferDestinationToken)
  const transferDestinationTarget = useSelector(state => state.transferDestinationTarget);

  const tokenSubmit = (value) => {
    let finalValue = value;
    if (value === testTokenCommand) {
      for (var key in testTokens) {
        if (key === transferDestinationTarget) {
          finalValue = testTokens[key]
        }
      }
    };
    dispatch(actionCreators.transfer.saveTransferToken(finalValue))
  };

  return (
    <TokenTextField
      size="small"
      type='text'
      label="Insert API Token Here"
      onChange={event => tokenSubmit(event.target.value)}
      // If the enter button is pressed (code 13), go to the next step.
      onKeyDown={(event) => {if (event.keyCode === 13 && transferDestinationToken !== '') {handleNext()}}}
    />
  )
}