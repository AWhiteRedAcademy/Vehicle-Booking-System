import { useEffect, useState, useMemo } from "react";

import GridViewIcon from "@mui/icons-material/GridView";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import BarChartIcon from "@mui/icons-material/BarChart";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import SpeedIcon from "@mui/icons-material/Speed";
import PersonIcon from "@mui/icons-material/Person";
import BuildIcon from "@mui/icons-material/Build";

import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import StatCard from "../../../components/cards/StatCard";

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
} from "../../../components/dashboard/DashboardPage.styles";

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
} from "./CompanyBookings.style.js";

import CompanyBookingList from "./CompanyBookingListDetails.jsx";


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


function CompanyBookings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [ownerNameFilter, setOwnerNameFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const [liveBookings, setLiveBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentActivePage, setCurrentActivePage] = useState(1);
  const [currentHistoryPage, setCurrentHistoryPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const data = ''; // await getBookingsWithVehicleDetails();};
        setLiveBookings(data || []);
      } catch (err) {
        setError(err.message || "Failed to load fleet dashboard metrics.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);


  useEffect(() => {
    setCurrentActivePage(1);
    setCurrentHistoryPage(1);
  }, [searchTerm, ownerNameFilter, dateFilter]);

  // Compute live active counters from response array to fill widgets
  const currentBookingsCount = liveBookings.filter((b) => b.isAvailable === "Available").length;
  const inProgressBookingsCount = liveBookings.filter((b) => b.isAvailable === "In Use").length;
  const pendingBookingsCount = liveBookings.filter((b) => b.currentBooking === "Pending").length;


  const masterFilteredBookings = useMemo(() => {
    return liveBookings.filter((booking) => {
      const searchValue = searchTerm.toLowerCase();

      const matchesSearch =
        booking.make?.toLowerCase().includes(searchValue) ||
        booking.model?.toLowerCase().includes(searchValue) ||
        booking.licenseNumber?.toLowerCase().includes(searchValue) ||
        booking.category?.toLowerCase().includes(searchValue);


      const matchesDate = true; 

      return matchesSearch && matchesDate;
    });
  }, [liveBookings, searchTerm, dateFilter]);


  const filteredActiveBookings = useMemo(() => {
    return masterFilteredBookings.filter(
      (b) => b.currentBooking === "Pending" || b.isAvailable === "In Use" || b.isAvailable === "Available"
    );
  }, [masterFilteredBookings]);


  const filteredHistoricalBookings = useMemo(() => {
    return masterFilteredBookings.filter(
      (b) => b.currentBooking !== "Pending" && b.isAvailable !== "In Use" && b.isAvailable !== "Available"
    );
  }, [masterFilteredBookings]);


  const paginatedActive = useMemo(() => {
    const start = (currentActivePage - 1) * itemsPerPage;
    return filteredActiveBookings.slice(start, start + itemsPerPage);
  }, [filteredActiveBookings, currentActivePage]);


  const paginatedHistory = useMemo(() => {
    const start = (currentHistoryPage - 1) * itemsPerPage;
    return filteredHistoricalBookings.slice(start, start + itemsPerPage);
  }, [filteredHistoricalBookings, currentHistoryPage]);

  const activeTotalPages = Math.ceil(filteredActiveBookings.length / itemsPerPage) || 1;
  const historyTotalPages = Math.ceil(filteredHistoricalBookings.length / itemsPerPage) || 1;

  if (loading) {
    return (
      <DashboardLayout title="Loading Bookings..." roleLabel="Company Console" userLabel="Company" navItems={companyNavItems}>
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
      title="All Bookings"
      subtitle="Manage and monitor all vehicle logistical arrangements."
      roleLabel="Company Console"
      userLabel="Company"
      navItems={companyNavItems}
    >
      <HeaderRow>
        <div>
          <SectionEyebrow>Dashboard &gt; Bookings</SectionEyebrow>
          <SectionTitle>Fleet Management Overview</SectionTitle>
          <SectionText>
            Real-time booking information for your company.
          </SectionText>
        </div>

        <AddButton type="button">
          <AddIcon fontSize="small" />
          Add Booking
        </AddButton>
      </HeaderRow>

      <StatsGrid>
        <StatCard
          label="Current Bookings"
          value={currentBookingsCount}
          helperText="Ready for booking"
          tone="green"
          icon={<CheckCircleIcon fontSize="small" />}
        />
        <StatCard
          label="In Progress"
          value={inProgressBookingsCount}
          helperText="Currently booked"
          tone="blue"
          icon={<LocalShippingIcon fontSize="small" />}
        />
        <StatCard
          label="Pending Bookings"
          value={pendingBookingsCount}
          helperText="Awaiting approval"
          tone="orange"
          icon={<PendingActionsIcon fontSize="small" />}
        />
        <StatCard
          label="Total Bookings"
          value={liveBookings.length}
          helperText="Visible fleet records"
          tone="blue"
          icon={<DirectionsCarIcon fontSize="small" />}
        />
      </StatsGrid>

      <Toolbar>
        <SearchInput
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search bookings by owner name, vehicle, or date..."
        />

        <FilterSelect
          value={dateFilter}
          onChange={(event) => setDateFilter(event.target.value)}
        >
          <option value="all">All dates</option>
          <option value="today">Today</option>
          <option value="thisWeek">This Week</option>
          <option value="thisMonth">This Month</option>
        </FilterSelect>
      </Toolbar>

      {/* PANEL 1: CURRENT LIVE BOOKINGS PANEL */}
      <DashboardPanel>
        <PanelHeader>
          <PanelTitle>Fleet Bookings Overview</PanelTitle>
          <PanelActionButton type="button">Filter</PanelActionButton>
        </PanelHeader>

        <BookingTable>
          <thead>
            <tr>
              <th>Booking Details</th>
              <th></th>
              <th>Status</th>
              <th>Current Booking</th>
              <th></th>
              <th>Daily Rate</th>
              <th>Actions</th>
            </tr>
          </thead>

          <CompanyBookingList
            bookings={paginatedActive}
            searchTerm={searchTerm}
            ownerNameFilter={ownerNameFilter}
            dateFilter={dateFilter}
          />
        </BookingTable>

        <TableFooter>
          <FooterText>
            Showing page {currentActivePage} of {activeTotalPages} ({filteredActiveBookings.length} current entries)
          </FooterText>

          <PaginationButtons>
            <PaginationButton 
              type="button"
              disabled={currentActivePage === 1}
              onClick={() => setCurrentActivePage(prev => Math.max(prev - 1, 1))}
              style={{ opacity: currentActivePage === 1 ? 0.4 : 1, cursor: currentActivePage === 1 ? "not-allowed" : "pointer" }}
            >
              ‹
            </PaginationButton>
            <PaginationButton 
              type="button"
              disabled={currentActivePage === activeTotalPages}
              onClick={() => setCurrentActivePage(prev => Math.min(prev + 1, activeTotalPages))}
              style={{ opacity: currentActivePage === activeTotalPages ? 0.4 : 1, cursor: currentActivePage === activeTotalPages ? "not-allowed" : "pointer" }}
            >
              ›
            </PaginationButton>
          </PaginationButtons>
        </TableFooter>
      </DashboardPanel>

      <div style={{ margin: "24px 0" }} />

      <DashboardPanel>
        <PanelHeader>
          <PanelTitle>Fleet Bookings History</PanelTitle>
          <PanelActionButton type="button">Filter</PanelActionButton>
        </PanelHeader>

        <BookingTable>
          <thead>
            <tr>
              <th>Booking Details</th>
              <th></th>
              <th>Status</th>
              <th>Current Booking</th>
              <th></th>
              <th>Daily Rate</th>
              <th>Actions</th>
            </tr>
          </thead>

          <CompanyBookingList
            bookings={paginatedHistory}
            searchTerm={searchTerm}
            ownerNameFilter={ownerNameFilter}
            dateFilter={dateFilter}
          />
        </BookingTable>

        <TableFooter>
          <FooterText>
            Showing page {currentHistoryPage} of {historyTotalPages} ({filteredHistoricalBookings.length} past items)
          </FooterText>

          <PaginationButtons>
            <PaginationButton 
              type="button"
              disabled={currentHistoryPage === 1}
              onClick={() => setCurrentHistoryPage(prev => Math.max(prev - 1, 1))}
              style={{ opacity: currentHistoryPage === 1 ? 0.4 : 1, cursor: currentHistoryPage === 1 ? "not-allowed" : "pointer" }}
            >
              ‹
            </PaginationButton>
            <PaginationButton 
              type="button"
              disabled={currentHistoryPage === historyTotalPages}
              onClick={() => setCurrentHistoryPage(prev => Math.min(prev + 1, historyTotalPages))}
              style={{ opacity: currentHistoryPage === historyTotalPages ? 0.4 : 1, cursor: currentHistoryPage === historyTotalPages ? "not-allowed" : "pointer" }}
            >
              ›
            </PaginationButton>
          </PaginationButtons>
        </TableFooter>
      </DashboardPanel>
</DashboardLayout>
  );
}
export default CompanyBookings;

