import { GlobalStyles } from "@mui/system";

export const GlobalStyle = () => (
  <GlobalStyles
    styles={{
      body: {
        margin: "0 auto",
        width: "100%",
        padding: 0,
        backgroundColor: "white",
        textDecoration: "none",
        fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
        color: "#425563",
      },
      a: {
        textDecoration: "none",
      },
      "html, body, #root": {
        height: "100%",
        margin: 0,
      },
      "*": {
        margin: 0,
        padding: 0,
        border: 0,
      }
    }}
  />
);
