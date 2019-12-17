/** @jsx jsx */
import { jsx } from "@emotion/core";

import textStyles from "../../styles/text";

const closedFolderIcon = require("../../images/icons/closedFolder.png");
const openFolderIcon = require("../../images/icons/openFolder.png");
const activeOpenFolderIcon = require("../../images/icons/poozer.png");
const activeClosedFolderIcon = require("../../images/icons/poozer_beard.png");
const fileIcon = require("../../images/icons/file.png");
const activeFileIcon = require("../../images/icons/marty.png");

export default function ResourceButton(props) {
  const { resource, level, onClick } = props;

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
        src={
          resource.kind === "container"
            ? resource.open && resource.active
              ? activeOpenFolderIcon
            : resource.open && !resource.active
              ? openFolderIcon
            : !resource.open && resource.active
              ? activeClosedFolderIcon
            : closedFolderIcon
          : resource.active
            ? activeFileIcon
          : fileIcon
        }
        alt="Resource Icon"
        css={{ paddingRight: 10, height: 25 }}
      />
      <span css={textStyles.listItem}>{resource.title}</span>
    </button>
  );
}
