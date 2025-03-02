import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Blue
    },
    secondary: {
      main: "#dc004e", // Red
    },
    background: {
      default: "#F8F9FB", // Απαλό γκρι (sidebar background)
    },
    text: {
      primary: "#1F2937", // Σκούρο γκρι (κείμενο)
      secondary: "#6B7280", // Ανοιχτό γκρι (subtext)
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
    },
  },
});

export default theme;
