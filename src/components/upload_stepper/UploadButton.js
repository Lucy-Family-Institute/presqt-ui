/** @jsx jsx */
import {jsx} from "@emotion/core";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators} from "../../redux/actionCreators";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import colors from "../../styles/colors";

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

  const sideSelected = useSelector(state => state.resources.sideSelected);
  const selectedTarget = useSelector(state => sideSelected === 'left'
    ? state.targets.leftTarget : state.targets.rightTarget);
  const targetToken = useSelector(state => state.authorization.apiTokens[selectedTarget.name]);

  /**
   * When the upload button is pushed, dispatch the Upload action and update the stepper
   * index to move forward.
   **/
  const submitUpload = () => {
    dispatch(actionCreators.resources.uploadToTarget(
      selectedTarget.name,
      selectedFile,
      selectedDuplicate,
      resourceToUploadTo,
      targetToken)
    );
      handleNext()
  };

  return (
    <CustomUploadButton
      onClick={submitUpload}
      variant="contained"
      color="primary"
    >
    Upload File
    </CustomUploadButton>
  )
}