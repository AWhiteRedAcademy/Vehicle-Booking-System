import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";

import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminAddUser from "./pages/AdminDashboard/AdminAddUserPage/  AdminAddUser";
import AdminUserDetails from "./pages/AdminDashboard/AdminUserDetailPage/  AdminUserDetails";

import OwnerDashboard from "./pages/OwnerDashboard/OwnerDashboard";
import OwnerAddVehicle from "./pages/OwnerDashboard/OwnerAddVehiclePage/  OwnerAddVehicle";
import OwnerEditVehicle from "./pages/OwnerDashboard/OwnerEditVehiclePage/  OwnerEditVehicle";
import OwnerVehicles from "./pages/OwnerDashboard/OwnerVehiclesPage/  OwnerVehicles";

import CompanyDashboard from "./pages/CompanyDashboard/CompanyDashboard";
import CompanyVehicles from "./pages/CompanyDashboard/CompanyVehiclesPage/CompanyVehicles";
import CompanyBookings from "./pages/CompanyDashboard/CompanyBookingsPage/CompanyBookings";

function RegisterPage() {
  return <h1>Register Page</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminDashboard />} />
        <Route path="/admin/users/add" element={<AdminAddUser />} />
        <Route path="/admin/users/:id" element={<AdminUserDetails />} />

        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
        <Route path="/owner/vehicles/add" element={<OwnerAddVehicle />} />
        <Route path="/owner/vehicles/edit/:id" element={<OwnerEditVehicle />} />
        <Route path="/dashboard" element={<Navigate to="/owner/dashboard" />} />
        <Route path="/owner/vehicles" element={<OwnerVehicles />} />

        <Route path="/company/dashboard" element={<CompanyDashboard />} />
        <Route
          path="/dashboard"
          element={<Navigate to="/company/dashboard" />}
        />
        <Route path="/company/vehicles" element={<CompanyVehicles />} />
        <Route path="/company/bookings" element={<CompanyBookings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
