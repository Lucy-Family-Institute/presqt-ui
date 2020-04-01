/** @jsx jsx */
import {jsx} from "@emotion/core";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators} from "../../../redux/actionCreators";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import colors from "../../../styles/colors";
import textStyles from "../../../styles/text";
import List from "@material-ui/core/List";
import IconListItem from "../../widgets/list_items/IconListItem";
import EditIcon from "@material-ui/icons/Edit";
import WarningIcon from '@material-ui/icons/Warning';


const CustomTransferButton = withStyles({
  root: {
    backgroundColor: colors.presqtBlue,
    '&:hover': {
      backgroundColor: '#0a4996',
    },
    width: 167
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
  const available = useSelector(state => state.available);

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

  let destinationTargetReadableName = '';
  for (let i = 0; i < available.length; i++) {
    if (available[i].name === transferDestinationTarget) {
      destinationTargetReadableName = available[i].readable_name
    }
  }

  return (
    <div>
      <div>
        The following actions will occur with this transaction:
        <List>
          {/* Transfer Statement */}
          <IconListItem
            icon={<EditIcon />}
            text={
              selectedTransferResource
              ? `Transfer ${selectedTarget.readable_name} resource '${sourceResource.title}' to the ${destinationTargetReadableName} resource '${selectedTransferResource.title}'.`
              : `Transfer ${selectedTarget.readable_name} resource '${sourceResource.title}' to ${destinationTargetReadableName} as a new project.`
            }
          />

          {/* Metadata Statement*/}
          <IconListItem
            icon={<EditIcon />}
            text="Write or edit File Transfer Service Metadata file at the top level."
          />

          {/* Github Statement */
            selectedTarget.name === 'github' || transferDestinationTarget === 'github'
            ? <IconListItem
                icon={<WarningIcon />}
                text="Github does not provide checksums for files."/>
            : null
          }

          {/* Source Target Statement*/
            selectedTarget.name === 'osf'
              ? <IconListItem
                icon={<WarningIcon />}
                text="OSF will only provide checksums for OSF Storage files." />
              : null
          }

          {/* Destination Target Statement*/
            transferDestinationTarget === 'osf'
            ? <IconListItem
                icon={<EditIcon />}
                text={`'${sourceResource.title}' will be stored in OSF Storage by default.`} />
            : transferDestinationTarget === 'zenodo'
            ? <IconListItem
                icon={<EditIcon />}
                text={`'${sourceResource.title}' will be written in BagIt format as a ZIP file.`} />
            : null
          }
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
