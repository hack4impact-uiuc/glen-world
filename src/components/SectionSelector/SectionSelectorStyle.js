import { makeStyles } from "@material-ui/core/styles";
import "typeface-roboto";
/**
 * Use JS instead of CSS because material-ui overrides the CSS
 */
const useStyles = makeStyles(theme => ({
  row: {
    maxWidth: "1200px",
    borderRadius: "30px"
  },
  link: {
    textDecoration: "none",
    "&:hover": { textDecoration: "none" }
  },
  button_root: {
    width: "22vw",
    minHeight: "22vw",
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "15%",
    borderColor: "#FFFFFF",
    overflow: "hidden",
    "&:hover": {
      backgroundColor: "#FFFFFF",
      borderColor: "#FFFFFF"
    },
    "&:focus": {
      outline: "none"
    }
  },
  button_label: {
    flexDirection: "column",
    fontSize: "3.5vw",
    fontWeight: "bold",
    fontFamily: "Roboto"
  },
  button_selected: {
    width: "22vw",
    minHeight: "22vw",
    background: "#b1b0ff",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "15%",
    borderColor: "#000000",
    overflow: "hidden",
    "&:hover": {
      backgroundColor: "#b1b0ff",
      borderColor: "#FFFFFF"
    },
    "&:focus": {
      outline: "none"
    }
  }
}));
export default useStyles;
