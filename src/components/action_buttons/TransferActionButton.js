/** @jsx jsx */

import { jsx } from "@emotion/core";
import textStyles from "../../styles/text";
import ActionButton from "../widgets/buttons/ActionButton";
import SplitButton from "../widgets/buttons/SplitButton";

export default function TransferActionButton({ disabled }) {
  const options = ['Transfer to Existing', 'Transfer New Resource'];
  
  return (
    <SplitButton
      options={options}
      // elevation={0}
      // variant="contained"
      // disabled={disabled}
    />
  )
}