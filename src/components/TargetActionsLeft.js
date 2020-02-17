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
export default function TargetActionsLeft() {
  /** SELECTOR DEFINITIONS
   * selectedLeftResource : Object of the resource details of the selected resource to display.
   * pendingAPIOperations   : List of API operations currently in progress.
   **/
  const selectedLeftResource = useSelector(state => state.resources.selectedLeftResource);
  const pendingAPIOperations = useSelector(state => state.resources.pendingAPIOperations);
  const leftSearchValue = useSelector(state => state.resources.leftSearchValue);
  var buttonsList = [];
  if (selectedLeftResource) {
    for (var i = 0; i < selectedLeftResource.links.length; i++) {
      buttonsList.push(selectedLeftResource.links[i].name);
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
          {selectedLeftResource ? selectedLeftResource.title : null}
        </span>

        <div css={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
          {selectedLeftResource
            ? <DownloadActionButton
              key={"Download"}
              disabled={!arrayValueFinder(buttonsList, "Download")}
            /> : null}
          {selectedLeftResource
          ? <UploadActionButton
              key={"UPLOAD"}
              text="Upload"
              type="EXISTING"
              disabled={!leftSearchValue ? !arrayValueFinder(buttonsList, "Upload") : true}
            /> : null}
          {selectedLeftResource
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
      css={{
        gridArea: "targetActionsLeft",
        borderLeftColor: "#979797",
        borderLeftWidth: 1,
        borderLeftStyle: "solid",
        paddingLeft: 25,
        borderRightColor: "black",
        borderRightWidth: 1,
        borderRightStyle: "solid",
      }}
    >
      {pendingAPIOperations.includes(
        actionCreators.resources.selectResource.toString()
      ) ||
      pendingAPIOperations.includes(
        actionCreators.resources.loadFromTargetSearch.toString()
      )
        ? null
        : DisplayTargetActions()}
    </div>
  );
}
