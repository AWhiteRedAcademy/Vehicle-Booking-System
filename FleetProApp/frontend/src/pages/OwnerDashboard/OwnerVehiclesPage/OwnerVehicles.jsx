import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import GridViewIcon from "@mui/icons-material/GridView";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import BarChartIcon from "@mui/icons-material/BarChart";
import AddIcon from "@mui/icons-material/Add";

import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import OwnerVehicleList from "./OwnerVehicleList";

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
} from "../../../components/dashboard/DashboardPage.styles";

import {
  PageSummary,
  SummaryDot,
  LoadMoreWrapper,
  ShowingText,
} from "./OwnerVehicles.style";

import {
  deleteVehicle,
  getVehicles,
} from "../../../HTTPS Services/OwnerServices";

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
  const vehicleId = vehicle.vehicleId || vehicle.id;

  if (!vehicleId) {
    setError("Vehicle ID could not be found.");
    return;
  }

  const confirmed = window.confirm(
    `Are you sure you want to delete ${vehicle.make} ${vehicle.model}?`
  );

  if (!confirmed) {
    return;
  }

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

function OwnerVehicles() {
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadVehicles() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getVehicles();

        if (!ignore) {
          setVehicles(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Failed to load vehicles.");
          setVehicles([]);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }
    loadVehicles();

    return () => {
      ignore = true;
    };
  }, []);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const searchValue = searchTerm.toLowerCase().trim();

      const vehicleId = vehicle.vehicleId?.toString() || vehicle.id?.toString() || "";
      const make = vehicle.make?.toLowerCase() || "";
      const model = vehicle.model?.toLowerCase() || "";
      const category = vehicle.category?.toLowerCase() || "";
      const licenseNumber = vehicle.licenseNumber?.toLowerCase() || "";
      const vinNumber = vehicle.vinNumber?.toLowerCase() || "";
      const modelYear = vehicle.modelYear?.toString() || "";

      const matchesSearch =
        searchValue === "" ||
        vehicleId.includes(searchValue) ||
        make.includes(searchValue) ||
        model.includes(searchValue) ||
        category.includes(searchValue) ||
        licenseNumber.includes(searchValue) ||
        vinNumber.includes(searchValue) ||
        modelYear.includes(searchValue);

      const matchesAvailability =
        availabilityFilter === "all" || vehicle.isAvailable === availabilityFilter;

      const matchesCategory =
        categoryFilter === "all" || vehicle.category === categoryFilter;

      return matchesSearch && matchesAvailability && matchesCategory;
    });
  }, [vehicles, searchTerm, availabilityFilter, categoryFilter]);

  const availableCount = vehicles.filter(
    (vehicle) => vehicle.isAvailable === "Available"
  ).length;

  const inUseCount = vehicles.filter(
    (vehicle) => vehicle.isAvailable === "In Use"
  ).length;

  const maintenanceCount = vehicles.filter(
    (vehicle) => vehicle.isAvailable === "Maintenance"
  ).length;

  function handleEditVehicle(vehicle) {
    const vehicleId = vehicle.vehicleId || vehicle.id;
    navigate(`/owner/vehicles/edit/${vehicleId}`);
  }

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

  return (
    <DashboardLayout
      title="My Vehicles"
      subtitle="View, edit, and manage your registered fleet."
      roleLabel="Owner Console"
      userLabel="Owner"
      navItems={ownerNavItems}
    >
      <HeaderRow>
        <div>
          <SectionEyebrow>Owner Fleet</SectionEyebrow>
          <SectionTitle>My Vehicles</SectionTitle>

          <PageSummary>
            <span>
              <SummaryDot $tone="blue" />
              {vehicles.length} Total Vehicles
            </span>

            <span>
              <SummaryDot $tone="green" />
              {availableCount} Available
            </span>

            <span>
              <SummaryDot $tone="blue" />
              {inUseCount} In Use
            </span>

            <span>
              <SummaryDot $tone="orange" />
              {maintenanceCount} Maintenance
            </span>
          </PageSummary>

          <SectionText>
            Manage your vehicles, update availability, edit pricing, or remove vehicles from your fleet.
          </SectionText>
        </div>

        <AddButton type="button" onClick={() => navigate("/owner/vehicles/add")}>
          <AddIcon fontSize="small" />
          Add New Vehicle
        </AddButton>
      </HeaderRow>

      <Toolbar>
        <SearchInput
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by make, model, license, VIN, year, category, or vehicle ID..."
        />

        <FilterSelect
          value={availabilityFilter}
          onChange={(event) => setAvailabilityFilter(event.target.value)}
        >
          <option value="all">All statuses</option>
          <option value="Available">Available</option>
          <option value="In Use">In Use</option>
          <option value="Maintenance">Maintenance</option>
        </FilterSelect>

        <FilterSelect
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
        >
          <option value="all">All categories</option>
          <option value="Sedan">Sedan</option>
          <option value="Hatchback">Hatchback</option>
          <option value="SUV">SUV</option>
          <option value="Convertible">Convertible</option>
          <option value="Pickup Truck">Pickup Truck</option>
          <option value="Minivan/MPV">Minivan/MPV</option>
        </FilterSelect>
      </Toolbar>

      {isLoading ? (
        <EmptyCard>Loading vehicles...</EmptyCard>
      ) : error ? (
        <EmptyCard>{error}</EmptyCard>
      ) : (
        <>
          <OwnerVehicleList
            vehicles={vehicles}
            searchTerm={searchTerm}
            availabilityFilter={availabilityFilter}
            categoryFilter={categoryFilter}
            onEdit={handleEditVehicle}
            onDelete={handleDeleteVehicle}
          />

          <LoadMoreWrapper>
            <ShowingText>
              Showing {filteredVehicles.length} of {vehicles.length} vehicles
            </ShowingText>
          </LoadMoreWrapper>
        </>
      )}
    </DashboardLayout>
  );
}

export default OwnerVehicles;