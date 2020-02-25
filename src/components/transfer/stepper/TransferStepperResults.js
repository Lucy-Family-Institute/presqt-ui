/** @jsx jsx */
import React, { useEffect, useState, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {useDispatch, useSelector} from "react-redux";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { jsx } from '@emotion/core';
import {actionCreators} from "../../../redux/actionCreators";
import colors from "../../../styles/colors";
import RetryUploadButton from "../../widgets/buttons/RetryButtons/RetryUploadButton";
import RetryStartUploadOverButton from "../../widgets/buttons/RetryButtons/RetryStartUploadOverButton";
import CancelButton from "../../widgets/buttons/CancelButton";
import Spinner from "../../widgets/spinners/Spinner";


export default function TransferStepperResults() {
  const dispatch = useDispatch();

  const transferStatus = useSelector(state => state.resources.transferStatus);
  const transferData = useSelector(state => state.resources.transferData);
  const apiOperationErrors = useSelector(state => state.resources.apiOperationErrors);

  const [stepThreeContent, setStepThreeContent] = useState(
    <div>
      <div css={{paddingBottom: 15, display: 'flex', justifyContent: 'center'}}>
        The transfer is being processed on the server. If you refresh or leave the page the transfer will still continue.
      </div>
      <Spinner />
      <div css={{paddingTop: 15, display: 'flex', justifyContent: 'center'}}>
        <CancelButton actionType='TRANSFER' />
      </div>
    </div>
  );

  useEffect(() => {
    if (transferStatus === 'success') {
      const failedFixityMessage = transferData.failed_fixity.length > 0
        ? <ListItem>
          <ListItemIcon>
            <ErrorOutlineIcon style={{ color: colors.warningYellow }}/>
          </ListItemIcon>
          <ListItemText
            primary={`The following files failed fixity checks: ${transferData.failed_fixity.join(', ')}`}
          />
        </ListItem>
        : <ListItem>
          <ListItemIcon>
            <CheckCircleOutlineIcon style={{ color: colors.successGreen }}/>
          </ListItemIcon>
          <ListItemText
            primary='All files passed fixity checks'
          />
        </ListItem>;

      const resourcesIgnoredMessage = transferData.resources_ignored.length > 0
        ? <ListItem>
          <ListItemIcon>
            <ErrorOutlineIcon style={{ color: colors.warningYellow }}/>
          </ListItemIcon>
          <ListItemText
            primary={`The following duplicate resources were ignored: ${transferData.resources_ignored.join(', ')}`}
          />
        </ListItem>
        : null;

      const resourcesUpdatedMessage = transferData.resources_updated.length > 0
        ? <ListItem>
          <ListItemIcon>
            <ErrorOutlineIcon style={{ color: colors.warningYellow }}/>
          </ListItemIcon>
          <ListItemText
            primary={`The following duplicate resources were updated: ${transferData.resources_updated.join(', ')}`}
          />
        </ListItem>
        : null;

      const successfulMessage = (
        <Grid item md={12}>
          <div>
            <List dense={true}>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon
                    style={{ color: colors.successGreen }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={transferData.message}
                />
              </ListItem>
              {failedFixityMessage}
              {resourcesIgnoredMessage}
              {resourcesUpdatedMessage}
            </List>
          </div>
        </Grid>
      );
      setStepThreeContent(successfulMessage);
    }
  }, [transferStatus, apiOperationErrors]) 

  return (stepThreeContent);
}