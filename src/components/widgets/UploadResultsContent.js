/** @jsx jsx */
import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {useSelector} from "react-redux";
import LeftSpinner from "./LeftSpinner";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { jsx } from '@emotion/core';
import {actionCreators} from "../../redux/actionCreators";
import colors from "../../styles/colors";

/**
 * This component watches for the upload state to change and then renders the appropriate
 * component to display the results of the upload.
 **/
export default function UploadResultsContent() {
  const sourceUploadStatus = useSelector(state => state.resources.sourceUploadStatus);
  const sourceUploadData = useSelector(state => state.resources.sourceUploadData);
  const apiOperationErrors = useSelector(state => state.resources.apiOperationErrors);

  const error = apiOperationErrors.find(
    element => element.action === actionCreators.resources.uploadToSourceTarget.toString());

  const [stepThreeContent, setStepThreeContent] = useState(<LeftSpinner />);

  /**
   * Watch for the upload state to change or for an upload error to occur. Once either of these
   * occur, update the state content to the new component that displays the result of the upload.
   **/
  useEffect(() => {
    // Upload Successful!
    if (sourceUploadStatus === 'success') {
      const failedFixityMessage = sourceUploadData.failed_fixity.length > 0
        ? [
          `The following files failed fixity checks: ${sourceUploadData.failed_fixity.join(', ')}`,
          <ErrorOutlineIcon style={{ color: colors.warningYellow }}/>
        ]
        : [
          'All files passed fixity checks',
          <CheckCircleOutlineIcon style={{ color: colors.successGreen }}/>
        ];

      const resourcesIgnoredMessage = sourceUploadData.resources_ignored.length > 0
        ? <ListItem>
            <ListItemIcon>
              <ErrorOutlineIcon style={{ color: colors.warningYellow }}/>
            </ListItemIcon>
            <ListItemText
              primary={`The following duplicate resources were ignored: ${sourceUploadData.resources_ignored.join(', ')}`}
            />
          </ListItem>
        : null;

      const resourcesUpdatedMessage = sourceUploadData.resources_updated.length > 0
        ? <ListItem>
          <ListItemIcon>
            <ErrorOutlineIcon style={{ color: colors.warningYellow }}/>
          </ListItemIcon>
          <ListItemText
            primary={`The following duplicate resources were updated: ${sourceUploadData.resources_updated.join(', ')}`}
          />
        </ListItem>
        : null;

      const successfulMessage =
        <Grid item md={12}>
          <div>
            <List dense={true}>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon style={{ color: colors.successGreen }}/>
                </ListItemIcon>
                <ListItemText
                  primary={sourceUploadData.message}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  {failedFixityMessage[1]}
                </ListItemIcon>
                <ListItemText
                  primary={failedFixityMessage[0]}
                />
              </ListItem>
              {resourcesIgnoredMessage}
              {resourcesUpdatedMessage}
            </List>
          </div>
        </Grid>;

      setStepThreeContent(successfulMessage);
    }
    // Upload Failed!
    else if (sourceUploadStatus === 'failure') {
      let errorMessage;
      // PresQT API error occurred
      if (error) {
        errorMessage = error.data
      }
      // Target error occurred
      else {
        errorMessage = sourceUploadData.message
      }

      setStepThreeContent(
        <Grid item md={12}>
          <div>
            <List dense={true}>
              <ListItem>
                <ListItemIcon>
                  <ErrorOutlineIcon color="error"/>
                </ListItemIcon>
                <ListItemText
                  primary={errorMessage}
                />
              </ListItem>
            </List>
          </div>
        </Grid>
      );
    }
  }, [sourceUploadStatus, apiOperationErrors]);

  return(stepThreeContent)
}