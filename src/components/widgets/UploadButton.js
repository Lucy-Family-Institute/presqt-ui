/** @jsx jsx */
import Button from "@material-ui/core/Button";
import {jsx} from "@emotion/core";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators} from "../../redux/actionCreators";

export default function UploadButton(props) {
  const dispatch = useDispatch();

  const selectedTarget = useSelector(state => state.targets.source.name)
  const selectedInSource = useSelector(state => state.resources.selectedInSource);
  const sourceTargetToken = useSelector(state => state.authorization.apiTokens[state.targets.source.name]);

  const submitUpload = () => {
    dispatch(actionCreators.resources.uploadToSourceTarget(
      selectedTarget,
      props.selectedFile,
      props.selectedDuplicate,
      selectedInSource,
      sourceTargetToken));

      props.handleNext()
  };

  return (
    <Button
      onClick={submitUpload}
      variant="contained"
      color="primary"
    >
    Upload File
    </Button>
  )
}