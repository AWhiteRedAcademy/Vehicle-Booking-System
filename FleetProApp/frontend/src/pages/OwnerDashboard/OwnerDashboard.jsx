import { useEffect, useMemo, useState } from "react";

import GridViewIcon from "@mui/icons-material/GridView";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import BarChartIcon from "@mui/icons-material/BarChart";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BuildIcon from "@mui/icons-material/Build";
import PaidIcon from "@mui/icons-material/Paid";
import { deleteVehicle } from "../../HTTPS Services/OwnerServices";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import StatCard from "../../components/cards/StatCard";
import VehicleCard from "../../components/cards/VehicleCard";
import OwnerVehicleList from "./OwnerVehicleList"; 
import { authFetch } from "../../HTTPS Services/Auth.js";
import { useNavigate } from "react-router-dom";


import {
  HeaderRow,
  SectionEyebrow,
  SectionTitle,
  SectionText,
  AddButton,
  StatsGrid,
  Toolbar,
  SearchInput,
  FilterSelect,
  VehicleGrid,
  EmptyCard,
  ErrorCard,
} from "../../components/dashboard/DashboardPage.styles.js";

import {
  AddVehicleCard,
  PlusCircle,
} from "./OwnerDashboard.style";

const ownerNavItems = [
  {
    label: "Dashboard",
    to: "/owner/dashboard",
    icon: <GridViewIcon fontSize="small" />,
  },
  {
    label: "Vehicles",
    to: "/owner/vehicles",
    icon: <DirectionsCarIcon fontSize="small" />,
  },
  {
    label: "Bookings",
    to: "/owner/bookings",
    icon: <EventAvailableIcon fontSize="small" />,
  },
  {
    label: "Reports",
    to: "/owner/reports",
    icon: <BarChartIcon fontSize="small" />,
  },
];

  async function handleDeleteVehicle(vehicle) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${vehicle.make} ${vehicle.model}?`
    );

    if (!confirmed) {
      return;
    }

    const vehicleId = vehicle.vehicleId || vehicle.id;

    try {
      await deleteVehicle(vehicleId);
      setVehicles((currentVehicles) =>
        currentVehicles.filter(
          (currentVehicle) =>
            (currentVehicle.vehicleId || currentVehicle.id) !== vehicleId
        )
      );
    } catch (err) {
      setError(err.message || "Unable to delete vehicle.");
    }
  }

function OwnerDashboard() {
  const navigate = useNavigate();
  
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  useEffect(() => {
    authFetch('api/Vehicle/user/context')
      .then(data => {
        setVehicles(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to load vehicle assets.");
        setLoading(false);
      });
  }, []);

  // Calculates metrics from live array data
  const totalVehicles = vehicles.length;
  const availableVehicles = vehicles.filter(v => v.isAvailable === "Available").length;
  const unavailableVehicles = vehicles.filter(v => v.isAvailable !== "Available").length;
  const estimatedMonthlyRevenue = vehicles.reduce(
    (total, v) => total + Number(v.dailyRate || 0) * 10,
    0
  );

  const [editingVehicle, setEditingVehicle] = useState(null);

  const handleSaveVehicle = (updatedVehicle) => {
    setVehicles(vehicles.map(v => v.id === updatedVehicle.id ? updatedVehicle : v));
    setEditingVehicle(null); // Close the edit view / form
  };

  return (
    <DashboardLayout
      title="Vehicle Management"
      subtitle="Manage and monitor your vehicle assets in real time."
      roleLabel="Owner Console"
      userLabel="Owner"
      navItems={ownerNavItems}
    >
      
      <HeaderRow>
        <div>
          <SectionEyebrow>Fleet Manager</SectionEyebrow>
          <SectionTitle>Your Fleet</SectionTitle>
          <SectionText>
            Track your vehicles, availability, and estimated fleet income.
          </SectionText>
        </div>

        <AddButton type="button" onClick={() => navigate("/owner/vehicles/add")}>
          <AddIcon fontSize="small" />
          Add New Vehicle
        </AddButton>
      </HeaderRow>

      <StatsGrid>
        <StatCard
          label="Total Fleet"
          value={totalVehicles}
          helperText="Vehicles registered"
          tone="blue"
          icon={<DirectionsCarIcon fontSize="small" />}
        />

        <StatCard
          label="Active Now"
          value={availableVehicles}
          helperText="Available for bookings"
          tone="green"
          icon={<CheckCircleIcon fontSize="small" />}
        />

        <StatCard
          label="Unavailable"
          value={unavailableVehicles}
          helperText="Not currently bookable"
          tone="orange"
          icon={<BuildIcon fontSize="small" />}
        />

        <StatCard
          label="Monthly Estimate"
          value={`R${estimatedMonthlyRevenue.toLocaleString()}`}
          helperText="Daily rate multiplied by 10"
          tone="blue"
          icon={<PaidIcon fontSize="small" />}
        />
      </StatsGrid>

      <Toolbar>
        <SearchInput
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by make, model, license, VIN, year, or category..."
        />

        <FilterSelect
          value={availabilityFilter}
          onChange={(event) => setAvailabilityFilter(event.target.value)}
        >
          <option value="all">All vehicles</option>
          <option value="Available">Available only</option>
          <option value="In Use">In Use only</option>
          <option value="Maintenance">Maintenance only</option>
        </FilterSelect>
      </Toolbar>

      {!loading && !error && (
        <OwnerVehicleList
          vehicles={vehicles || []}
          searchTerm={searchTerm}
          availabilityFilter={availabilityFilter}
          onDelete={handleDeleteVehicle}
        />
      )}
    </DashboardLayout>
  );
}

export default OwnerDashboard;
