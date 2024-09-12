import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Theme } from "./theme";

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
