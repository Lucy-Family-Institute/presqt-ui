/** @jsx jsx */
import {Fragment} from "react";
import { useSelector, useDispatch } from "react-redux";
import { jsx } from "@emotion/core";
import textStyles from "../../styles/text";
import { actionCreators } from "../../redux/actionCreators";
import DownloadModal from "../modals/downloadModal";
import useModal from "../../hooks/useModal";
import ActionButton from "./ActionButton";

export default function DownloadButton({key, text}) {
  const dispatch = useDispatch();
  const sourceTargetToken = useSelector(state => state.authorization.apiTokens[state.targets.source.name]);
  const selectedInSource = useSelector(state => state.resources.selectedInSource);

  const submitDownload = () => {
    toggleModalVisibility();
    dispatch(actionCreators.resources.downloadResource(selectedInSource, sourceTargetToken));
    // Add downloadResource success reducers
    // Add downloadResource Failure reducers
    // Look in API operations
    //   If downloadResource is not in it AND downloadResource is not in API operations errors
    //       Then start checking in download job
    //   Else Display errors in Modal
  };

  const { modalVisible, toggleModalVisibility } = useModal();

  return (
    <Fragment>
      <DownloadModal
        modalActive={modalVisible}
        toggleModal={toggleModalVisibility}
      />

      <ActionButton
      elevation={0}
      variant="contained"
      onClick={submitDownload}
      >
        <span css={textStyles.buttonText}>{text}</span>
      </ActionButton>

    </Fragment>
  )
}
