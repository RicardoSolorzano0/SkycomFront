import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme/AppTheme";

export const SkycomFrontApp = () => {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  );
};
