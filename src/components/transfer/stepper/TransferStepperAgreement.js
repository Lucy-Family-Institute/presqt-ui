/** @jsx jsx */
import {jsx} from "@emotion/core";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators} from "../../../redux/actionCreators";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import colors from "../../../styles/colors";
import textStyles from "../../../styles/text";
import List from "@material-ui/core/List";
import IconListItem from "../../widgets/list_items/IconListItem";
import EditIcon from "@material-ui/icons/Edit";
import WarningIcon from '@material-ui/icons/Warning';
import VpnKeyIcon from "@material-ui/icons/VpnKey";


/**
 * Component responsible for rendering the transfer agreement in the transfer stepper
 **/
export default function TransferStepperAgreement() {
  const dispatch = useDispatch();

  const selectedTarget = useSelector(state => state.selectedTarget);
  const sourceResource = useSelector(state => state.selectedResource);
  const selectedTransferResource = useSelector(state => state.selectedTransferResource);
  const transferDestinationTarget = useSelector(state => state.transferDestinationTarget);
  const available = useSelector(state => state.available);


  let destinationTargetReadableName = '';
  for (let i = 0; i < available.length; i++) {
    if (available[i].name === transferDestinationTarget) {
      destinationTargetReadableName = available[i].readable_name
    }
  }

  return (
    <div>
      <div>
        The following actions will occur with this transaction:
        <List>
          {/* Transfer Statement */}
          <IconListItem
            icon={<EditIcon />}
            text={
              selectedTransferResource
              ? `Transfer ${selectedTarget.readable_name} resource '${sourceResource.title}' to the ${destinationTargetReadableName} resource '${selectedTransferResource.title}'.`
              : `Transfer ${selectedTarget.readable_name} resource '${sourceResource.title}' to ${destinationTargetReadableName} as a new project.`
            }
          />

          {/* Metadata Statement*/}
          <IconListItem
            icon={<EditIcon />}
            text="Write or edit File Transfer Service Metadata file at the top level."
          />
          {/* Keyword Statement GitHub */
            (selectedTarget.name === 'github' || transferDestinationTarget === 'github')
              ? <IconListItem
                icon={<VpnKeyIcon />}
                text="Enhanced Keywords on GitHub will be stored as 'topics'." />
            : null
          }

          {/* Keyword Statement OSF */
            (selectedTarget.name === 'osf' || transferDestinationTarget === 'osf')
            ? <IconListItem
              icon={<VpnKeyIcon />}
              text="Enhanced Keywords on OSF will be stored as 'tags'." />
            : null
          }

          {/* Keyword Statement GitLab */
            (selectedTarget.name === 'gitlab' || transferDestinationTarget === 'gitlab')
            ? <IconListItem
              icon={<VpnKeyIcon />}
              text="Enhanced Keywords on GitLab will be stored as 'tag_list'." />
            : null
          }
          
          {/* Keyword Statement Zenodo */
            (selectedTarget.name === 'zenodo' || transferDestinationTarget === 'zenodo')
            ? <IconListItem
              icon={<VpnKeyIcon />}
              text="Enhanced Keywords on Zenodo will be stored as 'keywords'." />
            : null
          }
          
          {/* Keyword Statement FigShare */
            (selectedTarget.name === 'figshare' || transferDestinationTarget === 'figshare')
            ? <IconListItem
              icon={<VpnKeyIcon />}
              text="Enhanced Keywords on FigShare will be stored as 'tags'." />
            : null
        }

          {/* Github Statement */
            selectedTarget.name === 'github' || transferDestinationTarget === 'github'
            ? <IconListItem
                icon={<WarningIcon />}
                text="Github does not provide checksums for files."/>
            : null
          }

          {/* Source Target Statement*/
            selectedTarget.name === 'osf'
              ? <IconListItem
                icon={<WarningIcon />}
                text="OSF will only provide checksums for OSF Storage files." />
              : null
          }

          {/* Destination Target Statement*/
            transferDestinationTarget === 'osf'
            ? <IconListItem
                icon={<EditIcon />}
                text={`'${sourceResource.title}' will be stored in OSF Storage by default.`} />
            : transferDestinationTarget === 'zenodo' || transferDestinationTarget === 'figshare'
            ? <IconListItem
                icon={<EditIcon />}
                text={`'${sourceResource.title}' will be written in BagIt format as a ZIP file.`} />
            : null
          }
        </List>
      </div>
    </div>

  )
}
