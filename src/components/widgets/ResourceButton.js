/** @jsx jsx */
import { jsx } from "@emotion/core";

import textStyles from "../../styles/text";

const closedFolderIcon = require("../../images/icons/closedFolder.png");
const openFolderIcon = require("../../images/icons/openFolder.png");
const openFolderSelectedIcon = require("../../images/icons/openFolderSelected.png");
const closedFolderSelectedIcon = require("../../images/icons/closedFolderSelected.png");
const fileIcon = require("../../images/icons/file.png");
const fileSelectedIcon = require("../../images/icons/fileSelected.png");
const presqtMetadataFileIcon = require("../../images/icons/presqtMetadataFile.png");
const presqtMetadataFileIconSelected = require("../../images/icons/presqtMetadataFileSelected.png");

export default function ResourceButton({ resource, level, onClick }) {

  const iconSelector = () => {
    if (resource.kind === "container") {
      if (resource.open && resource.active) {
        return openFolderSelectedIcon;
      }
      else if (resource.open && !resource.active) {
        return openFolderIcon;
      }
      else if (!resource.open && resource.active) {
        return closedFolderSelectedIcon;
      }
      else {
        return closedFolderIcon;
      }
    }
    else if (resource.title === "PRESQT_FTS_METADATA.json" || resource.title === "INVALID_PRESQT_FTS_METADATA.json") {
      if (resource.active) {
        return presqtMetadataFileIconSelected;
      }
      else {
        return presqtMetadataFileIcon;
      }
    }
    else {
      if (resource.active) {
        return fileSelectedIcon;
      }
      else {
        return fileIcon;
      }
    }
  };

  return (
    <button
      css={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 10,
        paddingLeft: 10 * level,
        borderWidth: 0,
        backgroundColor: "#FFFFFF",
        overflowWrap: "anywhere",
        textAlign: "left"
      }}
      onClick={() => onClick(resource)}
    >
      <img
        src={iconSelector()}
        alt="Resource Icon"
        css={{ paddingRight: 10, height: 25 }}
      />
      <span css={textStyles.listItem}>{resource.title}</span>
    </button>
  );
}
