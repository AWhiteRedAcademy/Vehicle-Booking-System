import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import GridViewIcon from "@mui/icons-material/GridView";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import BarChartIcon from "@mui/icons-material/BarChart";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BuildIcon from "@mui/icons-material/Build";
import PaidIcon from "@mui/icons-material/Paid";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import StatCard from "../../components/cards/StatCard";
import VehicleCard from "../../components/cards/VehicleCard";

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
} from "../../components/dashboard/DashboardPage.styles";

import {
  getMockOwnerVehicles,
  deleteMockOwnerVehicle,
} from "../../data/mockOwnerVehicles";

import { AddVehicleCard, PlusCircle } from "./OwnerDashboard.style";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5188";

// Keep this true while you are building the frontend UI.
// Change to false when your login stores a real JWT token in localStorage.
const USE_MOCK_DATA = true;

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
    label: "Reports",
    to: "/owner/reports",
    icon: <BarChartIcon fontSize="small" />,
  },
];

const mockVehicles = [
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
  {
    vehicleId: 3,
    ownerId: 2,
    make: "Mercedes-Benz",
    model: "C-Class",
    category: "Sedan",
    dailyRate: 1100,
    isAvailable: false,
  },
];

function OwnerDashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadVehicles() {
      try {
        setIsLoading(true);
        setError("");

        if (USE_MOCK_DATA) {
          setVehicles(getMockOwnerVehicles());
          return;
        }

        const token = localStorage.getItem("token");

        const response = await fetch(
          `${API_BASE_URL}/api/Vehicle/my-vehicles`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to load owner vehicles.");
        }

        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        setError(
          "Could not load your vehicles. Check your API URL, JWT token, or CORS setup.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadVehicles();
  }, []);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const searchValue = searchTerm.toLowerCase();

      const matchesSearch =
        vehicle.make.toLowerCase().includes(searchValue) ||
        vehicle.model.toLowerCase().includes(searchValue) ||
        vehicle.category.toLowerCase().includes(searchValue);

      const matchesAvailability =
        availabilityFilter === "all" ||
        (availabilityFilter === "available" && vehicle.isAvailable) ||
        (availabilityFilter === "unavailable" && !vehicle.isAvailable);

      return matchesSearch && matchesAvailability;
    });
  }, [vehicles, searchTerm, availabilityFilter]);

  const totalVehicles = vehicles.length;
  const availableVehicles = vehicles.filter(
    (vehicle) => vehicle.isAvailable,
  ).length;
  const unavailableVehicles = vehicles.filter(
    (vehicle) => !vehicle.isAvailable,
  ).length;
  const estimatedMonthlyRevenue = vehicles.reduce(
    (total, vehicle) => total + Number(vehicle.dailyRate) * 10,
    0,
  );

  function handleEditVehicle(vehicle) {
    navigate(`/owner/vehicles/edit/${vehicle.vehicleId}`);
  }

  function handleDeleteVehicle(vehicle) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${vehicle.make} ${vehicle.model}?`,
    );

    if (!confirmed) {
      return;
    }

    const updatedVehicles = deleteMockOwnerVehicle(vehicle.vehicleId);
    setVehicles(updatedVehicles);
  }

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

        <AddButton
          type="button"
          onClick={() => navigate("/owner/vehicles/add")}
        >
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
          placeholder="Search by make, model, or category..."
        />

        <FilterSelect
          value={availabilityFilter}
          onChange={(event) => setAvailabilityFilter(event.target.value)}
        >
          <option value="all">All vehicles</option>
          <option value="available">Available only</option>
          <option value="unavailable">Unavailable only</option>
        </FilterSelect>
      </Toolbar>

      {isLoading && <EmptyCard>Loading your vehicles...</EmptyCard>}

      {!isLoading && error && <ErrorCard>{error}</ErrorCard>}

      {!isLoading && !error && filteredVehicles.length === 0 && (
        <EmptyCard>No vehicles found.</EmptyCard>
      )}

      {!isLoading && !error && filteredVehicles.length > 0 && (
        <VehicleGrid>
          {filteredVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.vehicleId}
              vehicle={vehicle}
              onEdit={handleEditVehicle}
              onDelete={handleDeleteVehicle}
            />
          ))}

          <AddVehicleCard
            type="button"
            onClick={() => navigate("/owner/vehicles/add")}
          >
            <PlusCircle>+</PlusCircle>
            <h3>Add New Vehicle</h3>
            <p>Expand your fleet by adding another vehicle profile.</p>
          </AddVehicleCard>
        </VehicleGrid>
      )}
    </DashboardLayout>
  );
}

export default OwnerDashboard;
