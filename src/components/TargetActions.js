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
export default function TargetActions() {
  const selectedResource = useSelector(state => state.resources.selectedResource);
  const selectedTarget = useSelector(state => state.targets.selectedTarget);
  const pendingAPIOperations = useSelector(state => state.resources.pendingAPIOperations);
  const searchValue = useSelector(state => state.resources.searchValue);

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
              key="UPLOAD"
              type="EXISTING"
              disabled={!searchValue ? !arrayValueFinder(buttonsList, "Upload") : true}
            /> : null}
          {selectedResource
          ? <TransferActionButton
              key="Transfer"
              disabled={!selectedTarget.supported_actions.resource_transfer_out}
            />: null}
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
