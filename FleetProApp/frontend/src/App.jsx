import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import OwnerDashboard from "./pages/OwnerDashboard/OwnerDashboard";
import CompanyDashboard from "./pages/CompanyDashboard/CompanyDashboard";
import CompanyVehicles from "./pages/CompanyDashboard/CompanyVehiclesPage/CompanyVehicles";
import CompanyBookings from "./pages/CompanyDashboard/CompanyBookingsPage/CompanyBookings";
import OwnerAddVehicle from "./pages/OwnerDashboard/OwnerAddVehiclePage/  OwnerAddVehicle";

function RegisterPage() {
  return <h1>Register Page</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        //
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
{/* 
        <Route path="/owner/dashboard" element={<OwnerDashboard />} /> */}
        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
        <Route path="/owner/vehicles/add" element={<OwnerAddVehicle />} />
        <Route path="/dashboard" element={<Navigate to="/owner/dashboard" />} />

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
