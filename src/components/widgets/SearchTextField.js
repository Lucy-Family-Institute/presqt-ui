import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/styles";
import colors from "../../styles/colors";

/**
 * Create a new component that inherits the Material TextField component so we can update the colors
 */
const SearchTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: colors.presqtBlue
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: colors.presqtBlue
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: colors.presqtBlue
      }
    }
  }
})(TextField);

export default SearchTextField;