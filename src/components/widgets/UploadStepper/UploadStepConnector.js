import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import StepConnector from "@material-ui/core/StepConnector";

const CustomConnector = withStyles({
  active: {
    '& $line': {
      borderColor: '#0C52A7',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#0C52A7',
    },
  },
  line: {
    borderColor: '#0C52A7',
  },
  disabled: {
    borderColor: '#0C52A7',
  },

})(StepConnector);

export default function UploadStepConnector() {
  return <CustomConnector orientation="vertical" />
}