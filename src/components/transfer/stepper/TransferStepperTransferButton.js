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
 * Component responsible for rendering the upload button in the upload stepper and passing the
 * selected file to the Upload API endpoint
 **/
export default function TransferStepperTransferButton({handleNext, destinationTarget,
                                                        destinationToken, selectedDuplicate}) {
  const dispatch = useDispatch();

  const selectedTarget = useSelector(state => state.targets.selectedTarget.name);
  const targetToken = useSelector(state => state.authorization.apiTokens[state.targets.selectedTarget.name]);
  const sourceResource = useSelector(state => state.resources.selectedResource);
  const selectedTransferResource = useSelector(state => state.resources.selectedTransferResource);
  /**
   * When the upload button is pushed, dispatch the Upload action and update the stepper
   * index to move forward.
   **/

  const submitTransfer = () => {
    dispatch(actionCreators.resources.transferResource(
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