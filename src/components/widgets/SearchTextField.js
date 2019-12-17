import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/styles";

/**
 * Create a new component that inherits the Material TextField component so we can update the colors
 */
const SearchTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#0C52A7"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#0C52A7"
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#0C52A7"
      }
    }
  }
})(TextField);

export default SearchTextField;