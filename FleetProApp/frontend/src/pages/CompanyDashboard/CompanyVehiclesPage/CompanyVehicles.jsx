import { useMemo, useState, useEffect } from "react";

import GridViewIcon from "@mui/icons-material/GridView";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import BarChartIcon from "@mui/icons-material/BarChart";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SpeedIcon from "@mui/icons-material/Speed";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BuildIcon from "@mui/icons-material/Build";

import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import StatCard from "../../../components/cards/StatCard";

import { getVehicleDetails } from "../../../HTTPS Services/CompanyServices.js";


import {
  HeaderRow,
  SectionEyebrow,
  SectionTitle,
  SectionText,
  Toolbar,
  StatsGrid,
  SearchInput,
  FilterSelect,
  EmptyCard,
} from "../../../components/dashboard/DashboardPage.styles";

import {
  VehicleInventoryGrid,
  VehicleInventoryCard,
  VehicleImageArea,
  VehicleImagePlaceholder,
  VehicleStatusBadge,
  VehicleTypeBadge,
  VehicleCardBody,
  VehicleCardHeader,
  VehicleTitle,
  VehiclePlate,
  VehicleMenuButton,
  VehicleInfoGrid,
  VehicleInfoItem,
  VehicleInfoLabel,
  VehicleInfoValue,
  VehicleCardDivider,
  VehicleCardActions,
  VehicleLinkButton,
  VehicleBookButton,
  LoadMoreWrapper,
  LoadMoreButton,
  ShowingText,
} from "./CompanyVehicles.style";

import CompanyVehicleList from "./CompanyVehicleDetailsList.jsx";

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

const mockVehicles = [
  {
    vehicleId: 1,
    make: "Mercedes-Benz",
    model: "S-Class",
    licenseNumber: "C 235",
    vinNumber: "VIN001",
    modelYear: 2024,
    category: "Sedan",
    isAvailable: "Available",
    dailyRate: 1800,
    lastService: "Oct 12, 2023",
    mileage: "12,450 km",
  },
  {
    vehicleId: 2,
    make: "Ford",
    model: "Wildtrack",
    licenseNumber: "CA63565",
    vinNumber: "VIN002",
    modelYear: 2023,
    category: "Pickup Truck",
    isAvailable: "In Use",
    dailyRate: 950,
    driver: "John Miller",
    returnEstimate: "Today, 18:00",
  },
  {
    vehicleId: 3,
    make: "Range Rover",
    model: "Sport",
    licenseNumber: "GP999",
    vinNumber: "VIN003",
    modelYear: 2022,
    category: "SUV",
    isAvailable: "Maintenance",
    dailyRate: 2200,
    issue: "Brake Service",
    expected: "Oct 29, 2023",
  },
  {
    vehicleId: 4,
    make: "Audi",
    model: "A6 ",
    licenseNumber: "GP0099",
    vinNumber: "VIN004",
    modelYear: 2024,
    category: "Hatchback",
    isAvailable: "Available",
    dailyRate: 1500,
    lastService: "Sep 30, 2023",
    mileage: "8,920 km",
  },
];

function CompanyVehicles() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const [liveVehicles, setLiveVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        setLoading(true);
        const data = await getVehicleDetails();
        setLiveVehicles(data);
      } catch (err) {
        setError(err.message || "Failed to load fleet dashboard metrics.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleData();
  }, []);

  // Compute live dashboard metrics from API array
  const availableVehicles = liveVehicles.filter((v) => v.isAvailable === "Available").length;

  if (loading) {
    return (
      <DashboardLayout title="Loading Dashboard..." roleLabel="Company Console" userLabel="Company" navItems={companyNavItems}>
        <div style={{ textAlign: "center", padding: "50px", fontSize: "1.2rem" }}>Loading data from fleet manager API...</div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout title="Dashboard Error" roleLabel="Company Console" userLabel="Company" navItems={companyNavItems}>
        <div style={{ textAlign: "center", padding: "50px", color: "red" }}>Error: {error}</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Fleet Inventory"
      subtitle="Manage and track all vehicles across your logistics network."
      roleLabel="Company Console"
      userLabel="Company"
      navItems={companyNavItems}
    >
      <HeaderRow>
        <div>
          <SectionEyebrow>Dashboard &gt; Vehicles</SectionEyebrow>
          <SectionTitle>Fleet Inventory</SectionTitle>
          <SectionText>
            Manage and track{" "}
            <strong>{mockVehicles.length} active vehicles</strong> across your
            logistics network.
          </SectionText>
        </div>
      </HeaderRow>

      <StatsGrid>
        <StatCard
          label="Available Vehicles"
          value={availableVehicles}
          helperText="Ready for booking"
          tone="green"
          icon={<CheckCircleIcon fontSize="small" />}
        />
        <StatCard
          label="Total Vehicles"
          value={liveVehicles.length}
          helperText="Visible fleet records"
          tone="blue"
          icon={<DirectionsCarIcon fontSize="small" />}
        />
      </StatsGrid>


      <Toolbar>
        <SearchInput
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search vehicles by license, VIN, year, make, model, or category..."
        />

        <FilterSelect
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="all">All statuses</option>
          <option value="Available">Available</option>
          <option value="In Use">In Use</option>
          <option value="Maintenance">Maintenance</option>
        </FilterSelect>

        <FilterSelect
          value={typeFilter}
          onChange={(event) => setTypeFilter(event.target.value)}
        >
          <option value="all">All types</option>
          <option value="Sedan">Sedan</option>
          <option value="Hatchback">Hatchback</option>
          <option value="SUV">SUV</option>
          <option value="Convertible">Convertible</option>
          <option value="Pickup Truck">Pickup Truck</option>
          <option value="Minivan/MPV">Minivan/MPV</option>
        </FilterSelect>
      </Toolbar>

      <CompanyVehicleList
        vehicle={liveVehicles}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        typeFilter={typeFilter}
        visibleCount={visibleCount}
      />


      {/* Only show the wrapper if there are more vehicles left to load */}
      {liveVehicles.length > visibleCount && (
        <LoadMoreWrapper>
          <LoadMoreButton
            type="button"
            onClick={() => setVisibleCount(prev => prev + 6)} //Increments visible cards by 6
          >
            Load More Vehicles
          </LoadMoreButton>
          <ShowingText>
            Showing {Math.min(visibleCount, liveVehicles.length)} of {liveVehicles.length} vehicles
          </ShowingText>
        </LoadMoreWrapper>
      )}

    </DashboardLayout>
  );
}
export default CompanyVehicles;