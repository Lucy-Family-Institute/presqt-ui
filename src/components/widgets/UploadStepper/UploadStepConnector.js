import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import StepConnector from "@material-ui/core/StepConnector";
import colors from "../../../styles/colors";

const CustomConnector = withStyles({
  active: {
    '& $line': {
      borderColor: colors.presqtBlue,
    },
  },
  completed: {
    '& $line': {
      borderColor: colors.presqtBlue,
    },
  },
  line: {
    borderColor: colors.presqtBlue,
  },
  disabled: {
    borderColor: colors.presqtBlue,
  },

})(StepConnector);

export default function UploadStepConnector() {
  return <CustomConnector orientation="vertical" />
}