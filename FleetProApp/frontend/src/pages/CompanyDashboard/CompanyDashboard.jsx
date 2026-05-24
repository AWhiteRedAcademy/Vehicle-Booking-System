import React, { useMemo, useState } from "react";
import GridViewIcon from "@mui/icons-material/GridView";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import BarChartIcon from "@mui/icons-material/BarChart";
import SearchIcon from "@mui/icons-material/Search";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import VehicleCard from "../../components/cards/VehicleCard";

import {
  HeaderRow,
  SectionEyebrow,
  SectionTitle,
  SectionText,
  AddButton,
  Toolbar,
  SearchInput,
  FilterSelect,
  VehicleGrid,
  EmptyCard,
} from "../../components/dashboard/DashboardPage.styles";

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

const mockAvailableVehicles = [
  {
    vehicleId: 1,
    ownerId: 2,
    make: "BMW",
    model: "540i",
    category: "Executive Sedan",
    dailyRate: 1200,
    isAvailable: true,
  },
  {
    vehicleId: 2,
    ownerId: 2,
    make: "Toyota",
    model: "Fortuner",
    category: "SUV",
    dailyRate: 950,
    isAvailable: true,
  },
];

function CompanyDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredVehicles = useMemo(() => {
    return mockAvailableVehicles.filter((vehicle) => {
      const searchValue = searchTerm.toLowerCase();

      const matchesSearch =
        vehicle.make.toLowerCase().includes(searchValue) ||
        vehicle.model.toLowerCase().includes(searchValue) ||
        vehicle.category.toLowerCase().includes(searchValue);

      const matchesCategory =
        categoryFilter === "all" || vehicle.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter]);

  return (
    <DashboardLayout
      title="Book a Vehicle"
      subtitle="Search available vehicles and create bookings."
      roleLabel="Company Console"
      userLabel="Company"
      navItems={companyNavItems}
    >
      <HeaderRow>
        <div>
          <SectionEyebrow>Booking Console</SectionEyebrow>
          <SectionTitle>Available Vehicles</SectionTitle>
          <SectionText>
            Browse vehicles that owners have made available for bookings.
          </SectionText>
        </div>

        <AddButton type="button">
          <SearchIcon fontSize="small" />
          Search Vehicles
        </AddButton>
      </HeaderRow>

      <Toolbar>
        <SearchInput
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by make, model, or category..."
        />

        <FilterSelect
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
        >
          <option value="all">All categories</option>
          <option value="Executive Sedan">Executive Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Luxury">Luxury</option>
        </FilterSelect>
      </Toolbar>

      {filteredVehicles.length === 0 ? (
        <EmptyCard>No available vehicles found.</EmptyCard>
      ) : (
        <VehicleGrid>
          {filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.vehicleId} vehicle={vehicle} />
          ))}
        </VehicleGrid>
      )}
    </DashboardLayout>
  );
}

export default CompanyDashboard;