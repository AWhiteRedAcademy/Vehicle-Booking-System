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
    plate: "C 235",
    type: "Sedan",
    status: "Available",
    dailyRate: 1800,
    lastService: "Oct 12, 2023",
    mileage: "12,450 km",
  },
  {
    vehicleId: 2,
    make: "Ford",
    model: "Wildtrack",
    plate: "CA63565",
    type: "Bakkie",
    status: "In Use",
    dailyRate: 950,
    driver: "John Miller",
    returnEstimate: "Today, 18:00",
  },
  {
    vehicleId: 3,
    make: "Range Rover",
    model: "Sport",
    plate: "GP999",
    type: "SUV",
    status: "Maintenance",
    dailyRate: 2200,
    issue: "Brake Service",
    expected: "Oct 29, 2023",
  },
  {
    vehicleId: 4,
    make: "Audi",
    model: "A6 ",
    plate: "GP0099",
    type: "Hatchback",
    status: "Available",
    dailyRate: 1500,
    lastService: "Sep 30, 2023",
    mileage: "8,920 km",
  },
  {
    vehicleId: 5,
    make: "Volvo",
    model: "something",
    plate: "KZN7456",
    type: "Sedan",
    status: "Pending",
    dailyRate: 2600,
    inspection: "Review Req.",
    statusAge: "2 Days",
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
        vehicle.plate.toLowerCase().includes(searchValue) ||
        vehicle.type.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "all" || vehicle.status === statusFilter;

      const matchesType = typeFilter === "all" || vehicle.type === typeFilter;

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
          placeholder="Search vehicles or license plates..."
        />

        <FilterSelect
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="all">All statuses</option>
          <option value="Available">Available</option>
          <option value="In Use">In Use</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Pending">Pending</option>
        </FilterSelect>

        <FilterSelect
          value={typeFilter}
          onChange={(event) => setTypeFilter(event.target.value)}
        >
          <option value="all">All types</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Mini Van">Mini Van</option>
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
  const isBookable = vehicle.status === "Available";

  return (
    <VehicleInventoryCard>
      <VehicleImageArea>
        <VehicleImagePlaceholder>
          <DirectionsCarIcon fontSize="large" />
        </VehicleImagePlaceholder>

        <VehicleStatusBadge $status={vehicle.status}>
          {vehicle.status}
        </VehicleStatusBadge>

        <VehicleTypeBadge>{vehicle.type}</VehicleTypeBadge>
      </VehicleImageArea>

      <VehicleCardBody>
        <VehicleCardHeader>
          <div>
            <VehicleTitle>
              {vehicle.make} {vehicle.model}
            </VehicleTitle>
            <VehiclePlate>PLATE: {vehicle.plate}</VehiclePlate>
          </div>

          <VehicleMenuButton type="button">
            <MoreVertIcon fontSize="small" />
          </VehicleMenuButton>
        </VehicleCardHeader>

        <VehicleInfoGrid>
          {vehicle.status === "Available" && (
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

          {vehicle.status === "In Use" && (
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

          {vehicle.status === "Maintenance" && (
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

          {vehicle.status === "Pending" && (
            <>
              <VehicleInfoItem>
                <CalendarMonthIcon fontSize="small" />
                <div>
                  <VehicleInfoLabel>Inspection</VehicleInfoLabel>
                  <VehicleInfoValue>{vehicle.inspection}</VehicleInfoValue>
                </div>
              </VehicleInfoItem>

              <VehicleInfoItem>
                <SpeedIcon fontSize="small" />
                <div>
                  <VehicleInfoLabel>Status Age</VehicleInfoLabel>
                  <VehicleInfoValue>{vehicle.statusAge}</VehicleInfoValue>
                </div>
              </VehicleInfoItem>
            </>
          )}
        </VehicleInfoGrid>

        <VehicleCardDivider />

        <VehicleCardActions>
          <VehicleLinkButton type="button">
            {vehicle.status === "In Use"
              ? "View Journey"
              : vehicle.status === "Maintenance"
              ? "View Service Log"
              : vehicle.status === "Pending"
              ? "View Report"
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