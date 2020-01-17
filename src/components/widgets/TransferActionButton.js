/** @jsx jsx */

import { jsx } from "@emotion/core";
import textStyles from "../../styles/text";
import ActionButton from "./ActionButton";

export default function TransferActionButton() {
  return (
    <ActionButton
      elevation={0}
      variant="contained"
    >
      <span css={textStyles.buttonText}>Transfer</span>
    </ActionButton>
  )
}