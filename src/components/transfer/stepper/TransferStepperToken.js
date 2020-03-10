/** @jsx jsx */
import {jsx} from "@emotion/core";
import {actionCreators} from "../../../redux/actionCreators";
import SearchTextField from "../../widgets/text_fields/SearchTextField";
import { withStyles } from "@material-ui/styles";
import {useDispatch, useSelector} from "react-redux";

const TokenTextField = withStyles({
  root: {
    width: '90%',
  }
})(SearchTextField);

export default function TransferStepperToken({ handleNext }) {
  const dispatch = useDispatch();
  const transferDestinationToken = useSelector(state => state.transferDestinationToken);

  return (
    <TokenTextField
      size="small"
      type='text'
      label="Insert API Token Here"
      value={transferDestinationToken}
      onChange={event => dispatch(actionCreators.transfer.saveTransferToken(event.target.value))}
      // If the enter button is pressed (code 13), go to the next step.
      onKeyDown={(event) => {event.keyCode === 13 && transferDestinationToken !== '' ? handleNext() : null}}
    />
  )
}