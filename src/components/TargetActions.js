/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useSelector } from "react-redux";
import textStyles from "../styles/text";
import DownloadActionButton from "./action_buttons/DownloadActionButton";
import UploadActionButton from "./action_buttons/UploadActionButton";
import TransferActionButton from "./action_buttons/TransferActionButton";
import { actionCreators } from "../redux/actionCreators";
import arrayValueFinder from "../redux/reducers/helpers/arrayValueFinder";

/**
 * Component for target action buttons on the detail page. It is responsible for the rendering of
 * the html element, and rendering the correct component for each action.
 **/
export default function TargetActionsLeft({side, selectedResource, searchValue, customCSS}) {
  const pendingAPIOperations = useSelector(state => state.resources.pendingAPIOperations);
  let buttonsList = [];
  if (selectedResource) {
    for (let i = 0; i < selectedResource.links.length; i++) {
      buttonsList.push(selectedResource.links[i].name);
    }
  }

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
          {selectedResource ? selectedResource.title : null}
        </span>

        <div css={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
          {selectedResource
            ? <DownloadActionButton
              key={"Download"}
              disabled={!arrayValueFinder(buttonsList, "Download")}
            /> : null}
          {selectedResource
            ? <UploadActionButton
              side={side}
              key={"UPLOAD"}
              text="Upload"
              type="EXISTING"
              disabled={!searchValue ? !arrayValueFinder(buttonsList, "Upload") : true}
            /> : null}
          {selectedResource
            ? <TransferActionButton
              key={"Transfer"}
              disabled={true}
            />: null}
        </div>
      </div>
    );
  };

  return (
    <div
      css={customCSS}
    >
      {pendingAPIOperations.includes(
        actionCreators.resources.selectResource.toString() + side
      ) ||
      pendingAPIOperations.includes(
        actionCreators.resources.loadFromTargetSearch.toString() + side
      )
        ? null
        : DisplayTargetActions()}
    </div>
  );
}
