/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useSelector } from "react-redux";
import textStyles from "../styles/text";
import DownloadActionButton from "./widgets/DownloadActionButton";
import UploadActionButton from "./widgets/UploadActionButton";
import TransferActionButton from "./widgets/TransferActionButton";
import { actionCreators } from "../redux/actionCreators";

/**
 * Component for target action buttons on the detail page. It is responsible for the rendering of
 * the html element, and rendering the correct component for each action.
 **/
export default function TargetActions() {
  /** SELECTOR DEFINITIONS
   * selectedSourceResource : Object of the resource details of the selected resource to display.
   * pendingAPIOperations   : List of API operations currently in progress.
   **/
  const selectedSourceResource = useSelector(state => state.resources.selectedInSource);
  const pendingAPIOperations = useSelector(state => state.resources.pendingAPIOperations);
  const sourceSearchValue = useSelector(state => state.resources.sourceSearchValue);

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
                <DownloadActionButton
                  key={link.name}
                />
              ) : link.name === "Upload" && !sourceSearchValue ? (
                <UploadActionButton
                  key={link.name}
                  text="Upload"
                  type="EXISTING"
                  disabled={false}
                />
              ) : link.name === "Upload" && sourceSearchValue ? (
                <UploadActionButton
                  key={link.name}
                  text="Upload"
                  type="EXISTING"
                  disabled={true}
                />
              )  : link.name === "Transfer" ? (
                <TransferActionButton
                  key={link.name}
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
