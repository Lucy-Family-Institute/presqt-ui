/** @jsx jsx */
import {jsx} from "@emotion/core";
import {useSelector} from "react-redux";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import colors from "../../styles/colors";
import List from "@material-ui/core/List";
import IconListItem from "../widgets/list_items/IconListItem";
import EditIcon from "@material-ui/icons/Edit";
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import OSFIcon from "../../images/partner_icons/osf";
import GitHubIcon from "../../images/partner_icons/github";
import ZenodoIcon from "../../images/partner_icons/zenodo";
import FigshareIcon from "../../images/partner_icons/figshare";

const CustomUploadButton = withStyles({
  root: {
    backgroundColor: colors.presqtBlue,
    '&:hover': {
      backgroundColor: '#0a4996',
    },
  },
})(Button);

/**
 * Component responsible for rendering the upload button in the upload stepper and passing the
 * selected file to the Upload API endpoint
 **/
export default function UploadAgreement({handleNext, resourceToUploadTo}) {

  const sourceResource = useSelector(state => state.selectedResource);
  const selectedTarget = useSelector(state => state.selectedTarget);

  /**
   * When the upload button is pushed, dispatch the Upload action and update the stepper
   * index to move forward.
   **/
  const submitNext = () => {
    handleNext()
  };

  return (
    <div>
      <div>
        The following actions will occur with this transaction:
        <List>
          {/* Upload Statement */}
          <IconListItem
            icon={<EditIcon />}
            text={
              resourceToUploadTo
                ? `Upload to the ${selectedTarget.readable_name} resource '${sourceResource.title}'.`
                : `Upload to ${selectedTarget.readable_name} as a new project.`
            }
          />

          {/* Metadata Statement*/}
          <IconListItem
            icon={<LocalParkingIcon />}
            text="Write or edit File Transfer Service Metadata file at the top level." />

          {/* Destination Target Statement*/
            selectedTarget.name === 'osf'
            ? <IconListItem
            icon={<OSFIcon />}
            text={`Resources will be stored in OSF Storage by default.`} />
            : selectedTarget.name === 'github'
            ? <IconListItem
            icon={<GitHubIcon />}
            text="Github does not provide checksums for files."/>
            : selectedTarget.name === 'zenodo'
            ? <IconListItem
            icon={<ZenodoIcon />}
            text={`New resource will be written in BagIt format as a ZIP file.`} />
            : selectedTarget.name === 'figshare'
            ? <IconListItem
            icon={<FigshareIcon />}
            text={`New resource will be written in BagIt format as a ZIP file.`} />
            : null
          }
        </List>
      </div>
    </div>

  )
}