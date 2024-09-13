import { Navigate, Route, Routes } from "react-router";
import { SkyFrontPage } from "../pages/SkyFrontPage";
import { Teachers } from "../pages/Teachers";
import { Students } from "../pages/Students";
import { Subjects } from "../pages/Subjects";
import { Grades } from "../pages/Grades";
import { Reports } from "../pages/Reports";

export const SkyFrontRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<SkyFrontPage />} />
      <Route path="/teachers" element={<Teachers />} />
      <Route path="/students" element={<Students />} />
      <Route path="/subjects" element={<Subjects />} />
      <Route path="/grades" element={<Grades />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
