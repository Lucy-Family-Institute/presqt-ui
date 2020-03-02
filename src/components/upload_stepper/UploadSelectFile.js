/** @jsx jsx */
import Button from "@material-ui/core/Button/Button";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { jsx } from '@emotion/core';
import withStyles from "@material-ui/core/styles/withStyles";
import colors from "../../styles/colors";
import textStyles from "../../styles/text";

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),

    },
  },
  input: {
    display: 'none',
  },
}));

const CustomButton = withStyles({
  root: {
    backgroundColor: colors.presqtBlue,
    '&:hover': {
      backgroundColor: '#0a4996',
    },
  },
})(Button);

/**
 * Component for file select input inside of the upload stepper
 **/
export default function UploadSelectFile({selectedFile, setSelectedFile}) {
  const classes = useStyles();

  /**
   * When a file is selected, add it to the selectedFile state
   **/
  const onChangeHandler = (file) => {
    setSelectedFile(file)
  };

  return (
    <div css={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <div className={classes.root}>
          <input
            accept="application/zip"
            className={classes.input}
            id="contained-button-file"
            type="file"
            onChange={event => onChangeHandler(event.target.files[0])}
          />
          <label htmlFor="contained-button-file">
            <CustomButton
              variant="contained"
              component="span"
              color="primary"
              endIcon={<CloudUploadIcon />}
              onAnimationEnd={(event) => {event.stopPropagation()}}
            >
              <span css={textStyles.buttonText}>Select File</span>
            </CustomButton>
          </label>
        </div>
      <span css={{color: '#696969'}}>{selectedFile ? selectedFile.name : null}</span>
    </div>
  )
}
