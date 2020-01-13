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

export default function UploadResultsContent() {
  const [stepThreeContent, setStepThreeContent] = useState(<LeftSpinner />);

  const sourceUploadStatus = useSelector(state => state.resources.sourceUploadStatus);
  const sourceUploadData = useSelector(state => state.resources.sourceUploadData);

  useEffect(() => {
    if (sourceUploadStatus === 'success') {
      const failedFixityMessage = sourceUploadData.failed_fixity.length > 0
        ? [
          `The following files failed fixity: ${sourceUploadData.failed_fixity.join(', ')}`,
          <ErrorOutlineIcon color="error"/>
        ]
        : [
          'No files failed fixity',
          <CheckCircleOutlineIcon color="primary"/>
        ];
      const resourcesIgnoredMessage = sourceUploadData.resources_ignored.length > 0
        ? [
          `The following duplicate resources were ignored: 
          ${sourceUploadData.resources_ignored.join(', ')}`,
          <ErrorOutlineIcon color="error"/>
        ]
        : [
          'No duplicate resources were ignored',
          <CheckCircleOutlineIcon color="primary"/>
        ];
      const resourcesUpdatedMessage = sourceUploadData.resources_updated.length > 0
        ? [
          `The following duplicate resources were updated:
          ${sourceUploadData.resources_updated.join(', ')}`,
          <ErrorOutlineIcon color="error"/>
        ]
        : [
          'No duplicate resources were updated',
          <CheckCircleOutlineIcon color="primary"/>
        ];

      const successfulMessage =
        <Grid item md={6}>
          <div>
            <List dense={true}>
              <ListItem>
                <ListItemIcon>
                  {failedFixityMessage[1]}
                </ListItemIcon>
                <ListItemText
                  primary={failedFixityMessage[0]}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  {resourcesIgnoredMessage[1]}
                </ListItemIcon>
                <ListItemText
                  primary={resourcesIgnoredMessage[0]}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  {resourcesUpdatedMessage[1]}
                </ListItemIcon>
                <ListItemText
                  primary={resourcesUpdatedMessage[0]}
                />
              </ListItem>
            </List>
          </div>
        </Grid>;

      setStepThreeContent(successfulMessage);
    } else if (sourceUploadStatus === 'failure') {
      setStepThreeContent(<div>{sourceUploadData.message}</div>);
    }
  }, [sourceUploadStatus]);

  return(stepThreeContent)
}