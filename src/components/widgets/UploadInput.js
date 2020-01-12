import React, {Fragment, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators} from "../../redux/actionCreators";
import UploadStepper from "./UploadStepper";


export default function UploadInput() {
  const dispatch = useDispatch();

  const sourceTargetToken = useSelector(state => state.authorization.apiTokens[state.targets.source.name]);
  const selectedInSource = useSelector(state => state.resources.selectedInSource);

  const [file, setFile] = useState(null);

  const handleChange = (selectedFile) => {
    setFile(selectedFile[0])
  };

  const submitUpload = () => {
    dispatch(actionCreators.resources.uploadToSourceTarget(file, selectedInSource, sourceTargetToken))
  };

  const deleteFile = () => {
    setFile(null);
  };

  return (
    <Fragment>
      <UploadStepper />

    </Fragment>
  )
}