/** @jsx jsx */
import {jsx} from "@emotion/core";
import {actionCreators} from "../../../redux/actionCreators";
import SearchTextField from "../../widgets/text_fields/SearchTextField";
import { withStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import testTokenFinder from  "../../../helperFunctions/testTokenFinder"

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
    let token = testTokenFinder(transferDestinationTarget, transferDestinationToken)
    dispatch(actionCreators.transfer.saveTransferToken(token))
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