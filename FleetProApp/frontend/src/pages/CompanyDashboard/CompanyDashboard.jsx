import React from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import GridViewIcon from "@mui/icons-material/GridView";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import BarChartIcon from "@mui/icons-material/BarChart";
// import {
//   HeaderRow,
//   SectionEyebrow,
//   SectionTitle,
//   SectionText,
//   AddButton,
//   AddIcon,
// } from "../OwnerDashboard/OwnerDashboard.style";

const CompanyDashboard = () => {
  const companyNavItems = [
    {
      label: "Dashboard",
      to: "/company/dashboard",
      icon: <GridViewIcon fontSize="small" />,
    },
    {
      label: "Vehicles",
      to: "/company/vehicles",
      icon: <DirectionsCarIcon fontSize="small" />,
    },
    {
      label: "Bookings",
      to: "/company/bookings",
      icon: <EventAvailableIcon fontSize="small" />,
    },
    {
      label: "Reports",
      to: "/company/reports",
      icon: <BarChartIcon fontSize="small" />,
    },
  ];
  return (
    <DashboardLayout
      title="Vehicle Management"
      subtitle="Real-time performance metrics and logistical availability."
      roleLabel="Company Console"
      userLabel="Company"
      navItems={companyNavItems}
    >
      {/* <HeaderRow>
        <div>
          <SectionEyebrow>Fleet Manager Overview</SectionEyebrow>
          <SectionTitle>Your Fleet</SectionTitle>
          <SectionText>
            Track your vehicles, availability, and estimated fleet income.
          </SectionText>
        </div>

        <AddButton type="button">
          <AddIcon fontSize="small" />
          Add New Vehicle
        </AddButton>
      </HeaderRow> */}
    </DashboardLayout>
  );
};

export default CompanyDashboard;
