import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  root: {
    color: "#e6e6e6",
    "&$checked": {
      color: "#e6e6e6"
    }
  },
  checked: {},
  listSection: {
    backgroundColor: "#e7e4e4",
    color: "#00d8a4"
  },
  nested: {
    backgroundColor: "#7f7eff",
    color: "#e6e6e6",
    paddingLeft: theme.spacing(4),
    "&:hover": {
      backgroundColor: "#00d8a4"
    }
  }
}));
export default useStyles;
