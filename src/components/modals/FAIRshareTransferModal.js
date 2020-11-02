/** @jsx jsx */
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "./modalHeader";
import DialogContent from "@material-ui/core/DialogContent";
import { jsx } from "@emotion/core";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux/actionCreators";
import FAIRshareResultsContent from "../fairshare_stepper/FAIRshareResultsContent";
import List from "@material-ui/core/List";
import IconListItem from "../widgets/list_items/IconListItem"
import InfoIcon from '@material-ui/icons/Info';


export default function FAIRshareModal() {
    const dispatch = useDispatch();

    const apiOperationErrors = useSelector(state => state.apiOperationErrors);
    const fairshareTransferModalDisplay = useSelector(state => state.fairshareTransferModalDisplay);
    const transferData = useSelector(state => state.transferData);

    const handleClose = () => {
      dispatch(actionCreators.fairshare.hideFairshareTransferModal());
    }
  
    return fairshareTransferModalDisplay ? (
        <div css={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Dialog
            maxWidth="md"
            fullWidth={true}
            open={fairshareTransferModalDisplay}
            onClose={handleClose}
            aria-labelledby={"form-dialog-title"}
            disableBackdropClick={true}
            disableEscapeKeyDown={true}
          >
            <DialogTitle
              id="form-dialog-title"
              onClose={handleClose}
            >
              FAIRshare Evaluator Service Results
            </DialogTitle>
          <DialogContent style={{ padding: 20 }}>
          <List dense={true} style={{paddingLeft: 12}}>
              <IconListItem text="Some tests may be failing because the transferred resource url is too new." icon={<InfoIcon />} />
          </List>
            {transferData.fairshare_evaluation_results.length > 1
                ? transferData.fairshare_evaluation_results.map((testInfo) => (
                    <FAIRshareResultsContent testInfo={testInfo} />
                ))
                : null}
            </DialogContent>
        </Dialog>
        </div>
      ) : null;
}