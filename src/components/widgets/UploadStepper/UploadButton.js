/** @jsx jsx */
import {jsx} from "@emotion/core";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators} from "../../../redux/actionCreators";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";

const CustomUploadButton = withStyles({
  root: {
    backgroundColor: '#0C52A7',
    '&:hover': {
      backgroundColor: '#0a4996',
    },
  },
})(Button);

export default function UploadButton(props) {
  const dispatch = useDispatch();

  const selectedInSource = useSelector(state => state.resources.selectedInSource);
  const sourceTargetToken = useSelector(state => state.authorization.apiTokens[state.targets.source.name]);

  const submitUpload = () => {
    dispatch(actionCreators.resources.uploadToSourceTarget(
      props.selectedFile,
      props.selectedDuplicate,
      selectedInSource,
      sourceTargetToken));

      props.handleNext()
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