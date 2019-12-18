/** @jsx jsx */
import { useState, useEffect } from "react";
import { jsx } from "@emotion/core";
import { useSelector } from "react-redux";

import textStyles from "../styles/text";
import DownloadButton from "./widgets/DownloadButton";
import UploadButton from "./widgets/UploadButton";
import TransferButton from "./widgets/TransferButton";
// import { initiateResourceDownload } from '../api/resources';
import useModal from "../hooks/useModal";
// import DownloadModal from './modals/DownloadModal';
import { actionCreators } from "../redux/actionCreators";

// const temporaryLinktoFunctionMap = {
//   Download: initiateResourceDownload
// };

// /**
//  * Mapping object for each target action component. Gets dynamically used for each button.
//  **/
// const actionLinkToComponent = {
//   Download: DownloadModal
// };

/**
 * Component for target action buttons on the detail page. It is responsible for the rendering of
 * the html element, and rendering the correct component for each action.
 **/
export default function TargetActions() {
  /** SELECTOR DEFINITIONS
   * selectedSourceResource : Object of the resource details of the selected resource to display.
   * pendingAPIOperations   : List of API operations currently in progress.
   **/
  const selectedSourceResource = useSelector(
    state => state.resources.selectedInSource
  );
  const pendingAPIOperations = useSelector(
    state => state.resources.pendingAPIOperations
  );

  /** STATE DEFINITIONS
   * [modalType, setModalType] : Action modal state of which action button has been clicked on.
   **/
  const [modalType, setModalType] = useState(null);
  const [link, setLink] = useState(null);

  const { modalVisible, toggleModalVisibility } = useModal();

  // THIS IS CAUSING AN INFINITE LOOP. COMMENTING OUT UNTIL DOWNLOAD GETS WORKED ON AGAIN.
  // useEffect(() => {
  //   console.log(link);
  //   if (link) {
  //     setModalType(() => actionLinkToComponent[link.name]);
  //     toggleModalVisibility();
  //   }
  // }, [link, toggleModalVisibility]);

  const DisplayTargetActions = () => {
    return (
      <div>
        <span
          css={[
            {
              display: "flex",
              flexDirection: "row",
              minHeight: 50,
              alignItems: "center"
            },
            textStyles.largeHeader
          ]}
        >
          {selectedSourceResource ? selectedSourceResource.title : null}
        </span>

        <div css={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
          {selectedSourceResource &&
            selectedSourceResource.links.map(link =>
              link.name === "Download" ? (
                <DownloadButton
                  key={link.name}
                  text={link.name}
                  onClick={() => setLink(link)}
                />
              ) : link.name === "Upload" ? (
                <UploadButton
                  key={link.name}
                  text={link.name}
                  onClick={() => setLink(link)}
                />
              ) : link.name === "Transfer" ? (
                <TransferButton
                  key={link.name}
                  text={link.name}
                  onClick={() => setLink(link)}
                />
              ) : null
            )}
        </div>
      </div>
    );
  };

  return (
    <div
      css={{
        gridArea: "targetActions",
        borderLeftColor: "#979797",
        borderLeftWidth: 1,
        borderLeftStyle: "solid",
        paddingLeft: 25
      }}
    >
      {pendingAPIOperations.includes(
        actionCreators.resources.selectSourceResource.toString()
      ) ||
      pendingAPIOperations.includes(
        actionCreators.resources.loadFromSourceTargetSearch.toString()
      )
        ? null
        : DisplayTargetActions()}
    </div>
  );
}
