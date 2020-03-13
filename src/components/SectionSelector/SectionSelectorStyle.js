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
    width: "300px",
    height: "300px",
    top: "28px",
    background: "#CCCCFF",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "15%",
    borderColor: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#CCCCFF",
      borderColor: "#FFFFFF"
    },
    "&:focus": {
      backgroundColor: "#FCFFFE",
      outline: "none"
    }
  },
  button_label: {
    flexDirection: "column",
    fontSize: "60px",
    fontWeight: "bold",
    fontFamily: "Roboto"
  },
  header: {
    fontSize: "65px",
    fontFamily: "Roboto"
  },
  container: {
    paddingBottom: "100px"
  }
}));
export default useStyles;
