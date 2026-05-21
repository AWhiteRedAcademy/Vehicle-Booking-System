// import { useState } from 'react'
import LoginPage from "./pages/LoginPage/LoginPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
// import DashboardPage from "./pages/DashboardPage/DashboardPage";
// import RegisterPage from "./pages/RegisterPage/RegisterPage";

function DashboardPage() {
  return <h1>Dashboard Page</h1>;
}

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
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
  ƒ;
}

export default App;
