/** @jsx jsx */
import {jsx} from "@emotion/core";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators} from "../../redux/actionCreators";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import colors from "../../styles/colors";
import textStyles from "../../styles/text";
import List from "@material-ui/core/List";
import IconListItem from "../widgets/list_items/IconListItem";
import EditIcon from "@material-ui/icons/Edit";
import ListItemText from "@material-ui/core/ListItemText";
import WarningIcon from "@material-ui/icons/Warning";

const CustomEnhanceButton = withStyles({
  root: {
    backgroundColor: colors.presqtBlue,
    '&:hover': {
      backgroundColor: '#0a4996',
    },
  },
})(Button);


export default function KeywordEnhanceButton({ setActiveStep, newKeywords }) {
    const dispatch = useDispatch();

    const selectedResource = useSelector((state) => state.selectedResource);
    const selectedTarget = useSelector(state => state.selectedTarget);
    const targetToken = useSelector(state => state.apiTokens[state.selectedTarget.name]);

    const formattedKeywords = newKeywords.join(", ");
  
    const enhanceKeywords = () => {
        dispatch(actionCreators.keywords.sendKeywords(selectedResource, targetToken, newKeywords));

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    return (
        <div>
            <div>
                The following actions will occur with this transaction:
                <List>
                    {/* Keyword Enhancement Statement */}
                    <IconListItem
                        icon={<EditIcon />}
                        text={`The following keywords will be added to the ${selectedTarget.readable_name} resource '${selectedResource.title}': ${formattedKeywords}.`}
                    />
                    {/* Metadata Statement*/}
                    <IconListItem
                        icon={<EditIcon />}
                        text="Write or edit File Transfer Service Metadata file at the top level."
                    />
                </List>
            </div>
            <CustomEnhanceButton
                onClick={enhanceKeywords}
                variant="contained"
                color="primary"
            >
                <span css={textStyles.buttonText}>Enhance Keywords</span>
            </CustomEnhanceButton>
        </div>
    )
}