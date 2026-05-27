import { useMemo, useState } from "react";

import GridViewIcon from "@mui/icons-material/GridView";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import BarChartIcon from "@mui/icons-material/BarChart";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SpeedIcon from "@mui/icons-material/Speed";
import PersonIcon from "@mui/icons-material/Person";
import BuildIcon from "@mui/icons-material/Build";

import DashboardLayout from "../../../components/dashboard/DashboardLayout";

import {
  HeaderRow,
  SectionEyebrow,
  SectionTitle,
  SectionText,
  Toolbar,
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

  const filteredVehicles = useMemo(() => {
    return mockVehicles.filter((vehicle) => {
      const searchValue = searchTerm.toLowerCase();

      const matchesSearch =
        vehicle.make.toLowerCase().includes(searchValue) ||
        vehicle.model.toLowerCase().includes(searchValue) ||
        vehicle.licenseNumber.toLowerCase().includes(searchValue) ||
        vehicle.vinNumber.toLowerCase().includes(searchValue) ||
        vehicle.modelYear.toString().includes(searchValue) ||
        vehicle.category.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "all" || vehicle.isAvailable === statusFilter;

      const matchesType = typeFilter === "all" || vehicle.category === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchTerm, statusFilter, typeFilter]);

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

      {filteredVehicles.length === 0 ? (
        <EmptyCard>No vehicles found.</EmptyCard>
      ) : (
        <>
          <VehicleInventoryGrid>
            {filteredVehicles.map((vehicle) => (
              <CompanyVehicleCard key={vehicle.vehicleId} vehicle={vehicle} />
            ))}
          </VehicleInventoryGrid>

          <LoadMoreWrapper>
            <LoadMoreButton type="button">Load More Vehicles</LoadMoreButton>
            <ShowingText>
              Showing {filteredVehicles.length} of {mockVehicles.length} vehicles
            </ShowingText>
          </LoadMoreWrapper>
        </>
      )}
    </DashboardLayout>
  );
}

function CompanyVehicleCard({ vehicle }) {
  const isBookable = vehicle.isAvailable === "Available";

  return (
    <VehicleInventoryCard>
      <VehicleImageArea>
        <VehicleImagePlaceholder>
          <DirectionsCarIcon fontSize="large" />
        </VehicleImagePlaceholder>

        <VehicleStatusBadge $status={vehicle.isAvailable}>
          {vehicle.isAvailable}
        </VehicleStatusBadge>

        <VehicleTypeBadge>{vehicle.category}</VehicleTypeBadge>
      </VehicleImageArea>

      <VehicleCardBody>
        <VehicleCardHeader>
          <div>
            <VehicleTitle>
              {vehicle.make} {vehicle.model}
            </VehicleTitle>
            <VehiclePlate>PLATE: {vehicle.licenseNumber} · {vehicle.modelYear}</VehiclePlate>
          </div>

          <VehicleMenuButton type="button">
            <MoreVertIcon fontSize="small" />
          </VehicleMenuButton>
        </VehicleCardHeader>

        <VehicleInfoGrid>
          {vehicle.isAvailable === "Available" && (
            <>
              <VehicleInfoItem>
                <CalendarMonthIcon fontSize="small" />
                <div>
                  <VehicleInfoLabel>Last Service</VehicleInfoLabel>
                  <VehicleInfoValue>{vehicle.lastService}</VehicleInfoValue>
                </div>
              </VehicleInfoItem>

              <VehicleInfoItem>
                <SpeedIcon fontSize="small" />
                <div>
                  <VehicleInfoLabel>Mileage</VehicleInfoLabel>
                  <VehicleInfoValue>{vehicle.mileage}</VehicleInfoValue>
                </div>
              </VehicleInfoItem>
            </>
          )}

          {vehicle.isAvailable === "In Use" && (
            <>
              <VehicleInfoItem>
                <PersonIcon fontSize="small" />
                <div>
                  <VehicleInfoLabel>Driver</VehicleInfoLabel>
                  <VehicleInfoValue>{vehicle.driver}</VehicleInfoValue>
                </div>
              </VehicleInfoItem>

              <VehicleInfoItem>
                <CalendarMonthIcon fontSize="small" />
                <div>
                  <VehicleInfoLabel>Return Est.</VehicleInfoLabel>
                  <VehicleInfoValue>{vehicle.returnEstimate}</VehicleInfoValue>
                </div>
              </VehicleInfoItem>
            </>
          )}

          {vehicle.isAvailable === "Maintenance" && (
            <>
              <VehicleInfoItem>
                <BuildIcon fontSize="small" />
                <div>
                  <VehicleInfoLabel>Issue</VehicleInfoLabel>
                  <VehicleInfoValue>{vehicle.issue}</VehicleInfoValue>
                </div>
              </VehicleInfoItem>

              <VehicleInfoItem>
                <CalendarMonthIcon fontSize="small" />
                <div>
                  <VehicleInfoLabel>Expected</VehicleInfoLabel>
                  <VehicleInfoValue>{vehicle.expected}</VehicleInfoValue>
                </div>
              </VehicleInfoItem>
            </>
          )}

        </VehicleInfoGrid>

        <VehicleCardDivider />

        <VehicleCardActions>
          <VehicleLinkButton type="button">
            {vehicle.isAvailable === "In Use"
              ? "View Journey"
              : vehicle.isAvailable === "Maintenance"
              ? "View Service Log"
              : "View Details"}
          </VehicleLinkButton>

          <VehicleBookButton type="button" disabled={!isBookable}>
            {isBookable ? "Book Now" : "Book Now"}
          </VehicleBookButton>
        </VehicleCardActions>
      </VehicleCardBody>
    </VehicleInventoryCard>
  );
}

export default CompanyVehicles;