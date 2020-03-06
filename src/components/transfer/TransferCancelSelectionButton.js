/** @jsx jsx */
import { Fragment } from "react";
import { jsx, css } from "@emotion/core";
import {actionCreators} from "../../redux/actionCreators";
import { useDispatch, useSelector } from "react-redux";
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import colors from "../../styles/colors";

export default function TransferCancelSelectionButton({ disabled }) {
    const dispatch = useDispatch();

    const transferTargetResources = useSelector(state => state.transferTargetResources);

    const submitCancel = () => {
        dispatch(actionCreators.transfer.clearTransferResource());
        dispatch(actionCreators.transfer.deselectTransferResource(transferTargetResources));
    };

    return (
        <Fragment>
              <IconButton
                variant="contained"
                style={!disabled ? { color: colors.presqtBlue } : null}
                onClick={submitCancel}
                disabled={disabled}
              >
                <CancelIcon />
              </IconButton>
        </Fragment>
    )
};