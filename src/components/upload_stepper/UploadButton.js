/** @jsx jsx */
import {jsx} from "@emotion/core";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators} from "../../redux/actionCreators";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import colors from "../../styles/colors";
import textStyles from "../../styles/text";
import List from "@material-ui/core/List";
import IconListItem from "../widgets/list_items/IconListItem";
import EditIcon from "@material-ui/icons/Edit";
import ListItemText from "@material-ui/core/ListItemText";
import WarningIcon from "@material-ui/icons/Warning";

const CustomUploadButton = withStyles({
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
export default function UploadButton({selectedFile, selectedDuplicate,
                                       handleNext, resourceToUploadTo}) {
  const dispatch = useDispatch();

  const sourceResource = useSelector(state => state.selectedResource);
  const selectedTarget = useSelector(state => state.selectedTarget);
  const targetToken = useSelector(state => state.apiTokens[state.selectedTarget.name]);

  /**
   * When the upload button is pushed, dispatch the Upload action and update the stepper
   * index to move forward.
   **/
  const submitUpload = () => {
    dispatch(actionCreators.upload.uploadToTarget(
      selectedTarget.name,
      selectedFile,
      selectedDuplicate,
      resourceToUploadTo,
      targetToken));

      handleNext()
  };

  return (
    <div>
      <div>
        The following actions will occur with this transaction:
        <List>
          {/* Metadata Statement*/}
          <IconListItem
            icon={<EditIcon />}
            text="Write or edit File Transfer Service Metadata file at the top level." />

          {/* Upload Statement */}
          <IconListItem
            icon={<EditIcon />}
            text={
              resourceToUploadTo
              ? <ListItemText
                primary={`Upload to the ${selectedTarget.readable_name} resource '${sourceResource.title}'.`}/>
              : <ListItemText primary={`Upload to ${selectedTarget.readable_name} as a new project.`}/>
            }
          />

          {/* Destination Target Statement*/
            selectedTarget.name === 'osf'
            ? <IconListItem
                icon={<EditIcon />}
                text={`Resources will be stored in OSF Storage by default.`} />
            : selectedTarget.name === 'github'
            ? <IconListItem
                icon={<WarningIcon />}
                text="Github does not provide checksums for files."/>
            : selectedTarget.name === 'zenodo'
            ? <IconListItem
              icon={<EditIcon />}
              text={`New resource will be written in BagIt format as a ZIP file.`} />
            : null
          }

        </List>

      </div>
      <CustomUploadButton
        onClick={submitUpload}
        variant="contained"
        color="primary"
      >
        <span css={textStyles.buttonText}>Upload File</span>
      </CustomUploadButton>
    </div>

  )
}