import { useEffect, useState } from "react";

import GridViewIcon from "@mui/icons-material/GridView";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import BarChartIcon from "@mui/icons-material/BarChart";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import StatCard from "../../components/cards/StatCard";

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
  EmptyCard,
} from "../../components/dashboard/DashboardPage.styles";

import {
  DashboardPanel,
  PanelHeader,
  PanelTitle,
  PanelActionButton,
  BookingTable,
  TableFooter,
  FooterText,
  PaginationButtons,
  PaginationButton,
} from "./CompanyDashboard.style";
import CompanyBookingList from "./CompanyBookingsPage/CompanyBookingList";

const companyNavItems = [
  { label: "Dashboard", to: "/company/dashboard", icon: <GridViewIcon fontSize="small" /> },
  { label: "Vehicles", to: "/company/vehicles", icon: <DirectionsCarIcon fontSize="small" /> },
  { label: "Bookings", to: "/company/bookings", icon: <EventAvailableIcon fontSize="small" /> },
  { label: "Reports", to: "/company/reports", icon: <BarChartIcon fontSize="small" /> },
];

const mockVehicles = [
  {
    bookingId: 1, // Changed from vehicleId to match your child component's row keys
    make: "Mercedes-Benz",
    model: "S-Class",
    licenseNumber: "CAA 265",
    category: "Sedan",
    dailyRate: 1800,
    isAvailable: "Available",
    currentBooking: "—",
    nextService: "Oct 24, 2026",
  },
  {
    bookingId: 2,
    make: "Ford",
    model: "Transit EV",
    licenseNumber: "CA 522 3567",
    category: "Pickup Truck",
    dailyRate: 950,
    isAvailable: "In Use",
    currentBooking: "In Use",
    nextService: "Nov 12, 2026",
  },
  {
    bookingId: 3,
    make: "BMW",
    model: "M2",
    licenseNumber: "CA 510 2765",
    category: "Sedan",
    dailyRate: 1600,
    isAvailable: "Available",
    currentBooking: "Starts 16:00",
    nextService: "Dec 05, 2026",
  },
];

function CompanyDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  const availableVehicles = mockVehicles.filter((vehicle) => vehicle.isAvailable === "Available").length;
  const inProgressVehicles = mockVehicles.filter((vehicle) => vehicle.isAvailable === "In Use").length;
  const pendingBookings = mockVehicles.filter(
    (booking) => booking.status === "Pending"
  ).length;

  return (
    <DashboardLayout
      title="Company Dashboard"
      subtitle="Search available vehicles and manage company bookings."
      roleLabel="Company Console"
      userLabel="Company"
      navItems={companyNavItems}
    >
      <HeaderRow>
        <div>
          <SectionEyebrow>Booking Console</SectionEyebrow>
          <SectionTitle>Fleet Management Overview</SectionTitle>
          <SectionText>
            Real-time vehicle availability and booking information for your company.
          </SectionText>
        </div>

        <AddButton type="button">
          <SearchIcon fontSize="small" />
          Find Vehicle
        </AddButton>
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
          label="In Progress"
          value={inProgressVehicles}
          helperText="Currently booked"
          tone="blue"
          icon={<LocalShippingIcon fontSize="small" />}
        />
        <StatCard
          label="Pending Bookings"
          value={pendingBookings}
          helperText="Awaiting approval"
          tone="orange"
          icon={<PendingActionsIcon fontSize="small" />}
        />
        <StatCard
          label="Total Vehicles"
          value={mockVehicles.length}
          helperText="Visible fleet records"
          tone="blue"
          icon={<DirectionsCarIcon fontSize="small" />}
        />
      </StatsGrid>

      <Toolbar>
        <SearchInput
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search vehicles by make, model, license, or category..."
        />

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

        <FilterSelect
          value={availabilityFilter}
          onChange={(event) => setAvailabilityFilter(event.target.value)}
        >
          <option value="all">All statuses</option>
          <option value="Available">Available</option>
          <option value="In Use">In Use</option>
          <option value="Maintenance">Maintenance</option>
        </FilterSelect>
      </Toolbar>

      <DashboardPanel>
        <PanelHeader>
          <PanelTitle>Fleet Status Overview</PanelTitle>
          <PanelActionButton type="button">Filter</PanelActionButton>
        </PanelHeader>


        <BookingTable>
          <thead>
            <tr>
              <th>Vehicle Details</th>
              <th>Type</th>
              <th>Status</th>
              <th>Current Booking</th>
              <th>Next Service</th>
              <th>Daily Rate</th>
              <th>Actions</th>
            </tr>
          </thead>

          <CompanyBookingList
            bookings={mockVehicles}
            searchTerm={searchTerm}
            categoryFilter={categoryFilter}
            availabilityFilter={availabilityFilter}
          />
        </BookingTable>

        <TableFooter>
          <FooterText>
            Showing {mockVehicles.length} total vehicles
          </FooterText>

          <PaginationButtons>
            <PaginationButton type="button">‹</PaginationButton>
            <PaginationButton type="button">›</PaginationButton>
          </PaginationButtons>
        </TableFooter>

      </DashboardPanel>
    </DashboardLayout>
  );
}

export default CompanyDashboard;
