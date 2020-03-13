import { makeStyles } from "@material-ui/core/styles";
/**
 * Use JS instead of CSS because material-ui overrides the CSS
 */
const useStyles = makeStyles(theme => ({
  root: {
    color: "#4D4C4C",
    "&$checked": {
      color: "#b1b0ff"
    }
  },
  checked: {
    color: "#b1b0ff"
  },
  listSection: {
    backgroundColor: "#e7e4e4",
    color: "#4D4C4C",
    fontSize: "14pt"
  },
  nested: {
    backgroundColor: "#ffffff",
    color: "#4D4C4C",
    fontSize: "14pt",
    paddingLeft: theme.spacing(4),
    "&:hover": {
      backgroundColor: "#efefef"
    }
  }
}));
export default useStyles;
