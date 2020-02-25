/** @jsx jsx */
import {jsx} from "@emotion/core";
import { useState } from "react";
import SearchTextField from "../../widgets/text_fields/SearchTextField";
import { withStyles } from "@material-ui/styles";

const TokenTextField = withStyles({
  root: {
    width: '90%',
  }
})(SearchTextField);

export default function TransferStepperToken({ setDestinationToken, destinationToken, handleNext }) {
  return (
    <TokenTextField
      size="small"
      type='text'
      value={destinationToken}
      label="Insert API Token Here"
      onChange={event => setDestinationToken(event.target.value)}
      // If the enter button is pressed (code 13), go to the next step.
      onKeyDown={(event) => { if (event.keyCode === 13) {handleNext()} }}
    />
  )
}