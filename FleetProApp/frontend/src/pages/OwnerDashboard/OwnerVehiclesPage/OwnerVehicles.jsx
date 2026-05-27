import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import GridViewIcon from "@mui/icons-material/GridView";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import BarChartIcon from "@mui/icons-material/BarChart";
import AddIcon from "@mui/icons-material/Add";

import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import VehicleCard from "../../../components/cards/VehicleCard";

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

function OwnerVehicles() {

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
              <SummaryDot $tone="orange" />
              {unavailableCount} Unavailable
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
          placeholder="Search by make, model, category, or vehicle ID..."
        />

        <FilterSelect
          value={availabilityFilter}
          onChange={(event) => setAvailabilityFilter(event.target.value)}
        >
          <option value="all">All statuses</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </FilterSelect>

        <FilterSelect
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
        >
          <option value="all">All categories</option>
          <option value="Executive Sedan">Executive Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Luxury">Luxury</option>
          <option value="Cargo">Cargo</option>
          <option value="Hatchback">Hatchback</option>
          <option value="Coupe">Coupe</option>
          <option value="Sedan">Sedan</option>
        </FilterSelect>
      </Toolbar>

      {filteredVehicles.length === 0 ? (
        <EmptyCard>No vehicles found.</EmptyCard>
      ) : (
        <>
          <VehicleGrid>
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.vehicleId}
                vehicle={vehicle}
                onEdit={handleEditVehicle}
                onDelete={handleDeleteVehicle}
              />
            ))}
          </VehicleGrid>

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