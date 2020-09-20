/** @jsx jsx */
import {jsx} from "@emotion/core";
import {useDispatch, useSelector} from "react-redux";
import List from "@material-ui/core/List";
import IconListItem from "../../widgets/list_items/IconListItem";
import EditIcon from "@material-ui/icons/Edit";
import OSFIcon from "../../../images/partner_icons/osf";
import GitHubIcon from "../../../images/partner_icons/github";
import ZenodoIcon from "../../../images/partner_icons/zenodo";
import FigshareIcon from "../../../images/partner_icons/figshare";
import GitLabIcon from "../../../images/partner_icons/gitlab";
import LocalParkingIcon from '@material-ui/icons/LocalParking';


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
            icon={<LocalParkingIcon />}
            text="Write or edit File Transfer Service Metadata file at the top level."
          />
          {/* Keyword Statement GitHub */
            (selectedTarget.name === 'github' || transferDestinationTarget === 'github')
              ? <IconListItem
                icon={<GitHubIcon />}
                text="Enhanced Keywords on GitHub will be stored as 'topics'." />
            : null
          }

          {/* Keyword Statement OSF */
            (selectedTarget.name === 'osf' || transferDestinationTarget === 'osf')
            ? <IconListItem
              icon={<OSFIcon />}
              text="Enhanced Keywords on OSF will be stored as 'tags'." />
            : null
          }

          {/* Keyword Statement GitLab */
            (selectedTarget.name === 'gitlab' || transferDestinationTarget === 'gitlab')
            ? <IconListItem
              icon={<GitLabIcon />}
              text="Enhanced Keywords on GitLab will be stored as 'tag_list'." />
            : null
          }
          
          {/* Keyword Statement Zenodo */
            (selectedTarget.name === 'zenodo' || transferDestinationTarget === 'zenodo')
            ? <IconListItem
              icon={<ZenodoIcon />}
              text="Enhanced Keywords on Zenodo will be stored as 'keywords'." />
            : null
          }
          
          {/* Keyword Statement FigShare */
            (selectedTarget.name === 'figshare' || transferDestinationTarget === 'figshare')
            ? <IconListItem
              icon={<FigshareIcon />}
              text="Enhanced Keywords on FigShare will be stored as 'tags'." />
            : null
        }

          {/* Github Statement */
            selectedTarget.name === 'github' || transferDestinationTarget === 'github'
            ? <IconListItem
                icon={<GitHubIcon />}
                text="Github does not provide checksums for files."/>
            : null
          }

          {/* Source Target Statement*/
            selectedTarget.name === 'osf'
              ? <IconListItem
                icon={<OSFIcon />}
                text="OSF will only provide checksums for OSF Storage files." />
              : null
          }

          {/* Destination Target Statement*/
            transferDestinationTarget === 'osf'
            ? <IconListItem
                icon={<OSFIcon />}
                text={`'${sourceResource.title}' will be stored in OSF Storage by default.`} />
            : transferDestinationTarget === 'zenodo'
            ? <IconListItem
                icon={<ZenodoIcon />}
                text={`'${sourceResource.title}' will be written in BagIt format as a ZIP file.`} />
            : transferDestinationTarget === 'figshare'
            ? <IconListItem
                icon={<FigshareIcon />}
                text={`'${sourceResource.title}' will be written in BagIt format as a ZIP file.`} />
            : null
          }
        </List>
      </div>
    </div>

  )
}
