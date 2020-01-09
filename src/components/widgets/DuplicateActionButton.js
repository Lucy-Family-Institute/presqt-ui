import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import React from "react";

export default function DuplicateActionButton() {
  return (
    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
      <Button>Ignore</Button>
      <Button>Update</Button>
    </ButtonGroup>
  )
}
