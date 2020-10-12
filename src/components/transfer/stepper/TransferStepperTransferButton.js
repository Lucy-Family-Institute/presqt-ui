/** @jsx jsx */
import {jsx} from "@emotion/core";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators} from "../../../redux/actionCreators";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import colors from "../../../styles/colors";
import textStyles from "../../../styles/text";
import { Fragment } from 'react';
import SearchTextField from "../../widgets/text_fields/SearchTextField";


const CustomTransferButton = withStyles({
  root: {
    backgroundColor: colors.presqtBlue,
    '&:hover': {
      backgroundColor: '#0a4996',
    },
    width: 167
  },
})(Button);

/**
 * Component responsible for rendering the transfer button in the transfer stepper and passing the
 * selected file to the Transfer API endpoint
 **/
export default function TransferStepperTransferButton({handleNext, selectedDuplicate, selectedKeywordAction, keywordList, emailValue, setEmailValue, selectedFairshareAction}) {
  const dispatch = useDispatch();

  const selectedTarget = useSelector(state => state.selectedTarget);
  const targetToken = useSelector(state => state.apiTokens[selectedTarget.name]);
  const sourceResource = useSelector(state => state.selectedResource);
  const selectedTransferResource = useSelector(state => state.selectedTransferResource);
  const transferDestinationToken = useSelector(state => state.transferDestinationToken);
  const transferDestinationTarget = useSelector(state => state.transferDestinationTarget);
  const available = useSelector(state => state.available);

  /**
   * When the transfer button is pushed, dispatch the Transfer action and transfer the stepper
   * index to move forward.
   **/
  const submitTransfer = () => {
    dispatch(actionCreators.transfer.transferResource(
      transferDestinationTarget,
      transferDestinationToken,
      sourceResource,
      selectedDuplicate,
      selectedKeywordAction,
      keywordList,
      selectedTransferResource,
      selectedTarget.name,
      targetToken,
      emailValue,
      selectedFairshareAction
    ));

    handleNext()
  };

  const emailKeystroke = (event) => {
    setEmailValue(event.target.value);
  };

  return (
    <Fragment>
      <div css={{paddingBottom:10}}>
        You can input your email below and we will notify you once this transfer is complete. Inputing your email
        is not mandatory and we will not store this information on the server once the process has 
        finished.
      </div>
      <div css={{paddingBottom:10}}>
        <SearchTextField
          size="small"
          type="text"
          id="outlined-basic"
          label="Email Address"
          variant="outlined"
          value={emailValue}
          onChange={event => emailKeystroke(event)}
        />
      </div>
      <CustomTransferButton
        onClick={submitTransfer}
        variant="contained"
        color="primary"
      >
        <span css={textStyles.buttonText}>Transfer File</span>
      </CustomTransferButton>
    </Fragment>
  )
}
