import React, {Fragment, useState} from "react";
import {DropzoneArea} from "material-ui-dropzone";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators} from "../../redux/actionCreators";

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

  return (
    <Fragment>
      <DropzoneArea
        acceptedFiles={['application/zip']}
        filesLimit={1}
        showPreviewsInDropzone={false}
        showPreviews={true}
        onChange={handleChange.bind(this)}
        useChipsForPreview={true}
        previewChipProps={{
          variant: "default"
        }}
        dropzoneText={"Drag file here or click. File must be a BagIt file in zip format."}
      />

      <button
        onClick={submitUpload}
      >
        Upload
      </button>
    </Fragment>
  )
}