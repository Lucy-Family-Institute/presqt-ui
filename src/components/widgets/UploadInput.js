import React, {Fragment, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators} from "../../redux/actionCreators";
import SelectFile from "./SelectFile";
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
      {/*<DropzoneArea*/}
      {/*  acceptedFiles={['application/zip']}*/}
      {/*  filesLimit={1}*/}
      {/*  showPreviewsInDropzone={false}*/}
      {/*  showPreviews={false}*/}
      {/*  onChange={handleChange.bind(this)}*/}
      {/*  dropzoneText={"Drag file here or click. File must be a BagIt file in zip format."}*/}
      {/*/>*/}

      {/*{*/}
      {/*  file*/}
      {/*    ? <FileChip*/}
      {/*      label={`Upload ${file.name}`}*/}
      {/*      onClick={submitUpload}*/}
      {/*      onDelete={deleteFile}*/}
      {/*      deleteIconColorPrimary="white"*/}
      {/*    />*/}
      {/*    : null*/}
      {/*}*/}
    </Fragment>
  )
}