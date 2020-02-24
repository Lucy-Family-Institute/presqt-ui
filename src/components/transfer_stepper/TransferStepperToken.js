/** @jsx jsx */
import {jsx} from "@emotion/core";
import { useState } from "react";
import SearchTextField from "../widgets/text_fields/SearchTextField";
import { withStyles } from "@material-ui/styles";

const TokenTextField = withStyles({
  root: {
    width: 300,
  }
})(SearchTextField);

export default function TransferStepperToken({ setDestinationToken }) {
  const [token, setToken] = useState('');

  return (
    <TokenTextField
      size="small"
      type='text'
      value={setDestinationToken(token)}
      label="Insert API Token Here"
      onChange={event => setToken(event.target.value)}
    />
  )
}