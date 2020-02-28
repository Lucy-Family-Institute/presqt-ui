/** @jsx jsx */
import {jsx} from "@emotion/core";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators} from "../../../redux/actionCreators";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import colors from "../../../styles/colors";

const CustomTransferButton = withStyles({
  root: {
    backgroundColor: colors.presqtBlue,
    '&:hover': {
      backgroundColor: '#0a4996',
    },
  },
})(Button);

/**
 * Component responsible for rendering the transfer button in the transfer stepper and passing the
 * selected file to the Transfer API endpoint
 **/
export default function TransferStepperTransferButton({handleNext, destinationTarget,
                                                        destinationToken, selectedDuplicate}) {
  const dispatch = useDispatch();

  const selectedTarget = useSelector(state => state.selectedTarget.name);
  const targetToken = useSelector(state => state.apiTokens[state.selectedTarget.name]);
  const sourceResource = useSelector(state => state.selectedResource);
  const selectedTransferResource = useSelector(state => state.selectedTransferResource);
  /**
   * When the transfer button is pushed, dispatch the Transfer action and transfer the stepper
   * index to move forward.
   **/

  const submitTransfer = () => {
    dispatch(actionCreators.transfer.transferResource(
      destinationTarget,
      destinationToken,
      sourceResource,
      selectedDuplicate,
      selectedTransferResource,
      selectedTarget,
      targetToken
    ));

      handleNext()
  };

  return (
    <CustomTransferButton
      onClick={submitTransfer}
      variant="contained"
      color="primary"
    >
    Transfer File
    </CustomTransferButton>
  )
}