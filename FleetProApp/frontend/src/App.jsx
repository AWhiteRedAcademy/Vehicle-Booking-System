import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/routing/ProtectedRoute";

// Login & Registration
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";

// Forgot Password
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPassword";

//Dashboards
import OwnerDashboard from "./pages/OwnerDashboard/OwnerDashboard";
import CompanyDashboard from "./pages/CompanyDashboard/CompanyDashboard";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";

// Admin Pages
import AdminAddUser from "./pages/AdminDashboard/AdminAddUserPage/AdminAddUser";
import AdminUserDetails from "./pages/AdminDashboard/AdminUserDetailPage/AdminUserDetails";

// Owner Pages
import OwnerAddVehicle from "./pages/OwnerDashboard/OwnerAddVehiclePage/OwnerAddVehicle";
import OwnerEditVehicle from "./pages/OwnerDashboard/OwnerEditVehiclePage/OwnerEditVehicle";
import OwnerVehicles from "./pages/OwnerDashboard/OwnerVehiclesPage/OwnerVehicles";
import OwnerBookings from "./pages/OwnerDashboard/OwnerBookingsPage/OwnerBookings";

//Company Pages
import CompanyVehicle from "./pages/CompanyDashboard/CompanyVehiclesPage/CompanyVehicles";
import CompanyBooking from "./pages/CompanyDashboard/CompanyBookingsPage/CompanyBookings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        // {/* ADMIN ONLY ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminDashboard />} />
          <Route path="/admin/users/add" element={<AdminAddUser />} />
          <Route path="/admin/users/:id" element={<AdminUserDetails />} />
        </Route>
        
        {/* OWNER ONLY ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={["Owner"]} />}>
          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          <Route path="/owner/vehicles/add" element={<OwnerAddVehicle />} />
          <Route
            path="/owner/vehicles/edit/:id"
            element={<OwnerEditVehicle />}
          />
          <Route path="/owner/vehicles" element={<OwnerVehicles />} />
          <Route path="/owner/bookings" element={<OwnerBookings />} />
        </Route>
        {/* COMPANY ONLY ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={["Company"]} />}>
          <Route path="/company/dashboard" element={<CompanyDashboard />} />
          <Route path="/company/vehicles" element={<CompanyVehicle />} />
          <Route path="/company/bookings" element={<CompanyBooking />} />
        </Route>
        {/* General Fallback Route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
