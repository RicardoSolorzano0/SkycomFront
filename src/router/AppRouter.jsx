import { Navigate, Route, Routes } from "react-router";
import { SkyFrontRoute } from "../skyfront/routes/SkyFrontRoute";

export const AppRouter = () => {
  let status = "authenticated";

  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<SkyFrontRoute />} />
      ) : (
        <Route path="/auth/*" element={<div>AuthRoutes in progress</div>} />
      )}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
