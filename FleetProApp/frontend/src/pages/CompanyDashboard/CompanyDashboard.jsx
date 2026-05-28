import { useEffect, useMemo, useRef, useState } from "react";

import GridViewIcon from "@mui/icons-material/GridView";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import BarChartIcon from "@mui/icons-material/BarChart";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import { getBookingsWithVehicleDetails } from "../../HTTPS Services/CompanyServices.js";

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

import CompanyBookingList from "./CompanyBookingDetailsList.jsx";

const companyNavItems = [
  { label: "Dashboard", to: "/company/dashboard", icon: <GridViewIcon fontSize="small" /> },
  { label: "Vehicles", to: "/company/vehicles", icon: <DirectionsCarIcon fontSize="small" /> },
  { label: "Bookings", to: "/company/bookings", icon: <EventAvailableIcon fontSize="small" /> },
  { label: "Reports", to: "/company/reports", icon: <BarChartIcon fontSize="small" /> },
];

const pageSize = 5;

function CompanyDashboard() {
  const searchInputRef = useRef(null);
  const tablePanelRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [showTableFilters, setShowTableFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [liveBookings, setLiveBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function fetchDashboardData() {
      try {
        setLoading(true);
        setError("");

        const data = await getBookingsWithVehicleDetails();

        if (!ignore) {
          setLiveBookings(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Failed to load fleet dashboard metrics.");
          setLiveBookings([]);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchDashboardData();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, availabilityFilter]);

  const filteredBookings = useMemo(() => {
    return liveBookings.filter((booking) => {
      const searchValue = searchTerm.toLowerCase().trim();

      const vehicleName = `${booking.make} ${booking.model}`.toLowerCase();
      const licenseNumber = booking.licenseNumber?.toLowerCase() || "";
      const vinNumber = booking.vinNumber?.toLowerCase() || "";
      const category = booking.category?.toLowerCase() || "";
      const modelYear = booking.modelYear?.toString() || "";

      const matchesSearch =
        searchValue === "" ||
        vehicleName.includes(searchValue) ||
        licenseNumber.includes(searchValue) ||
        vinNumber.includes(searchValue) ||
        category.includes(searchValue) ||
        modelYear.includes(searchValue);

      const matchesCategory =
        categoryFilter === "all" || booking.category === categoryFilter;

      const matchesAvailability =
        availabilityFilter === "all" || booking.isAvailable === availabilityFilter;

      return matchesSearch && matchesCategory && matchesAvailability;
    });
  }, [liveBookings, searchTerm, categoryFilter, availabilityFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredBookings.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedBookings = filteredBookings.slice(startIndex, endIndex);

  const availableVehicles = liveBookings.filter(
    (booking) => booking.isAvailable === "Available"
  ).length;

  const inProgressVehicles = liveBookings.filter(
    (booking) => booking.isAvailable === "In Use"
  ).length;

  const pendingBookings = liveBookings.filter(
    (booking) => booking.currentBooking === "Pending"
  ).length;

  function handleFindVehicle() {
    setAvailabilityFilter("Available");
    setShowTableFilters(true);

    setTimeout(() => {
      searchInputRef.current?.focus();
      tablePanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }

  function handleToggleFilters() {
    setShowTableFilters((currentValue) => !currentValue);
  }

  function handlePreviousPage() {
    setCurrentPage((page) => Math.max(1, page - 1));
  }

  function handleNextPage() {
    setCurrentPage((page) => Math.min(totalPages, page + 1));
  }

  if (loading) {
    return (
      <DashboardLayout
        title="Loading Dashboard..."
        roleLabel="Company Console"
        userLabel="Company"
        navItems={companyNavItems}
      >
        <EmptyCard>Loading data from fleet manager API...</EmptyCard>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout
        title="Dashboard Error"
        roleLabel="Company Console"
        userLabel="Company"
        navItems={companyNavItems}
      >
        <EmptyCard>{error}</EmptyCard>
      </DashboardLayout>
    );
  }

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
          <SectionEyebrow>Dashboard</SectionEyebrow>
          <SectionTitle>Fleet Management Overview</SectionTitle>
          <SectionText>
            Real-time vehicle availability and booking information for your company.
          </SectionText>
        </div>

        <AddButton type="button" onClick={handleFindVehicle}>
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
          value={liveBookings.length}
          helperText="Visible fleet records"
          tone="blue"
          icon={<DirectionsCarIcon fontSize="small" />}
        />
      </StatsGrid>

      {showTableFilters && (
        <Toolbar>
          <SearchInput
            ref={searchInputRef}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search vehicles by make, model, license, VIN, year, or category..."
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
      )}

      <DashboardPanel ref={tablePanelRef}>
        <PanelHeader>
          <PanelTitle>Fleet Status Overview</PanelTitle>
          <PanelActionButton type="button" onClick={handleToggleFilters}>
            {showTableFilters ? "Hide Filters" : "Filter"}
          </PanelActionButton>
        </PanelHeader>

        <BookingTable>
          <thead>
            <tr>
              <th>Vehicle Details</th>
              <th>Type</th>
              <th>Status</th>
              <th>Current Booking</th>
              <th>Daily Rate</th>
              <th>Actions</th>
            </tr>
          </thead>

          <CompanyBookingList bookings={paginatedBookings} />
        </BookingTable>

        <TableFooter>
          <FooterText>
            Showing {filteredBookings.length === 0 ? 0 : startIndex + 1}
            {" - "}
            {Math.min(endIndex, filteredBookings.length)}
            {" of "}
            {filteredBookings.length}
            {" filtered vehicles"}
          </FooterText>

          <PaginationButtons>
            <PaginationButton
              type="button"
              onClick={handlePreviousPage}
              disabled={safeCurrentPage === 1}
            >
              ‹
            </PaginationButton>

            <PaginationButton type="button" disabled>
              {safeCurrentPage} / {totalPages}
            </PaginationButton>

            <PaginationButton
              type="button"
              onClick={handleNextPage}
              disabled={safeCurrentPage === totalPages}
            >
              ›
            </PaginationButton>
          </PaginationButtons>
        </TableFooter>
      </DashboardPanel>
    </DashboardLayout>
  );
}

export default CompanyDashboard;
