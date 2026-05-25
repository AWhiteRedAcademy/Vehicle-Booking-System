import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import OwnerDashboard from "./pages/OwnerDashboard/OwnerDashboard";
import CompanyDashboard from "./pages/CompanyDashboard/CompanyDashboard";
import ProtectedRoute from "./components/routing/ProtectedRoute";

function RegisterPage() {
  return <h1>Register Page</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* OWNER ONLY ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={["Owner"]} />}>
          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          {/* Add future owner-specific paths here, e.g., /owner/vehicles */}
        </Route>

        {/* COMPANY ONLY ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={["Company"]} />}>
          <Route path="/company/dashboard" element={<CompanyDashboard />} />
        </Route>

        {/* General Fallback Route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
