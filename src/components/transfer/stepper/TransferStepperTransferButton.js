/** @jsx jsx */
import {jsx} from "@emotion/core";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators} from "../../../redux/actionCreators";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import colors from "../../../styles/colors";
import textStyles from "../../../styles/text";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import EditIcon from '@material-ui/icons/Edit';

import ListItemIcon from "@material-ui/core/ListItemIcon";

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
export default function TransferStepperTransferButton({handleNext, selectedDuplicate}) {
  const dispatch = useDispatch();

  const selectedTarget = useSelector(state => state.selectedTarget);
  const targetToken = useSelector(state => state.apiTokens[selectedTarget.name]);
  const sourceResource = useSelector(state => state.selectedResource);
  const selectedTransferResource = useSelector(state => state.selectedTransferResource);
  const transferDestinationToken = useSelector(state => state.transferDestinationToken);
  const transferDestinationTarget = useSelector(state => state.transferDestinationTarget);

  /**
   * When the transfer button is pushed, dispatch the Transfer action and transfer the stepper
   * index to move forward.
   **/

  const submitTransfer = () => {
    dispatch(actionCreators.transfer.transferResource(
      transferDestinationTarget,
      transferDestinationToken,
      sourceResource,
      selectedDuplicate,
      selectedTransferResource,
      selectedTarget.name,
      targetToken
    ));

      handleNext()
  };

  return (
    <div>
      <div>
        The following actions will occur with this transaction:
        <List>
          <ListItem>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Create or edit File Transfer Service Metadata file." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            {selectedTransferResource
              ? <ListItemText
                primary={`Transfer ${selectedTarget.readable_name} resource '${sourceResource.title}' to the ${transferDestinationTarget} resource '${selectedTransferResource.title}'.`}/>
              : <ListItemText primary={`Transfer ${selectedTarget.readable_name} resource '${sourceResource.title}' to ${transferDestinationTarget} as a new project.`}/>
            }
          </ListItem>
        </List>
      </div>
      <CustomTransferButton
        onClick={submitTransfer}
        variant="contained"
        color="primary"
      >
        <span css={textStyles.buttonText}>Transfer File</span>
      </CustomTransferButton>
    </div>

  )
}