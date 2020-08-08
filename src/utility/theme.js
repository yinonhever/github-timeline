import { createMuiTheme } from "@material-ui/core/styles";

// This Material UI theme is used in the tabs and chart elements

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#141c45"
        },
        secondary: {
            main: "#42a5f5"
        },
        background: {
            paper: "#141c45"
        }
    },
    typography: {
        button: {
            fontSize: "1.2rem",
            fontWeight: 800,
            letterSpacing: "2.2px",
            fontFamily: "inherit"
        }
    }
})

export default theme;