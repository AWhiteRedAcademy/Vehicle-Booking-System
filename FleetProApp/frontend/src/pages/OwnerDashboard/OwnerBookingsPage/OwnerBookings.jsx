import { useEffect, useMemo, useState } from "react";

import GridViewIcon from "@mui/icons-material/GridView";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import BarChartIcon from "@mui/icons-material/BarChart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CancelIcon from "@mui/icons-material/Cancel";
import PaidIcon from "@mui/icons-material/Paid";

import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import StatCard from "../../../components/cards/StatCard";

import {
  HeaderRow,
  SectionEyebrow,
  SectionTitle,
  SectionText,
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
  BookingTable,
  TableFooter,
  FooterText,
} from "../../CompanyDashboard/CompanyDashboard.style";

import { getOwnerBookings } from "../../../HTTPS Services/OwnerServices";

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

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function OwnerBookings() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 760);
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadBookings() {
      try {
        setIsLoading(true);
        setError("");

        const data = await getOwnerBookings();

        if (!ignore) {
          setBookings(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Unable to load owner bookings.");
          setBookings([]);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadBookings();

    return () => {
      ignore = true;
    };
  }, []);

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const searchValue = searchTerm.toLowerCase().trim();

      const vehicleName = `${booking.make} ${booking.model}`.toLowerCase();
      const licenseNumber = booking.licenseNumber?.toLowerCase() || "";
      const companyName = booking.companyName?.toLowerCase() || "";
      const category = booking.category?.toLowerCase() || "";
      const bookingId = booking.bookingId?.toString() || "";

      const matchesSearch =
        searchValue === "" ||
        vehicleName.includes(searchValue) ||
        licenseNumber.includes(searchValue) ||
        companyName.includes(searchValue) ||
        category.includes(searchValue) ||
        bookingId.includes(searchValue);

      const matchesStatus =
        statusFilter === "all" || booking.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, searchTerm, statusFilter]);

  const pendingCount = bookings.filter(
    (booking) => booking.status === "Pending",
  ).length;

  const confirmedCount = bookings.filter(
    (booking) => booking.status === "Confirmed",
  ).length;

  const cancelledCount = bookings.filter(
    (booking) => booking.status === "Cancelled",
  ).length;

  const totalRevenue = bookings
    .filter((booking) => booking.status !== "Cancelled")
    .reduce((total, booking) => total + Number(booking.totalCost || 0), 0);

  return (
    <DashboardLayout
      title="Owner Bookings"
      subtitle="View bookings linked to your registered vehicles."
      roleLabel="Owner Console"
      userLabel="Owner"
      navItems={ownerNavItems}
    >
      <HeaderRow>
        <div>
          <SectionEyebrow>Owner Bookings</SectionEyebrow>
          <SectionTitle>Vehicle Booking Requests</SectionTitle>
          <SectionText>
            Track bookings made against your vehicles, including pending,
            confirmed, and cancelled bookings.
          </SectionText>
        </div>
      </HeaderRow>

      <StatsGrid>
        <StatCard
          label="Pending"
          value={pendingCount}
          helperText="Awaiting approval"
          tone="orange"
          icon={<PendingActionsIcon fontSize="small" />}
        />

        <StatCard
          label="Confirmed"
          value={confirmedCount}
          helperText="Approved bookings"
          tone="green"
          icon={<CheckCircleIcon fontSize="small" />}
        />

        <StatCard
          label="Cancelled"
          value={cancelledCount}
          helperText="Cancelled requests"
          tone="orange"
          icon={<CancelIcon fontSize="small" />}
        />

        <StatCard
          label="Total Value"
          value={`R${totalRevenue.toLocaleString()}`}
          helperText="Excluding cancelled bookings"
          tone="blue"
          icon={<PaidIcon fontSize="small" />}
        />
      </StatsGrid>

      <Toolbar>
        <SearchInput
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder={
            isMobile
              ? "Search bookings..."
              : "Search by vehicle, license, company, category, or booking ID..."
          }
        />

        <FilterSelect
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="all">All statuses</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
        </FilterSelect>
      </Toolbar>

      <DashboardPanel>
        <PanelHeader>
          <PanelTitle>Bookings Linked to My Vehicles</PanelTitle>
        </PanelHeader>

        {isLoading ? (
          <EmptyCard>Loading bookings...</EmptyCard>
        ) : error ? (
          <EmptyCard>{error}</EmptyCard>
        ) : filteredBookings.length === 0 ? (
          <EmptyCard>No bookings found.</EmptyCard>
        ) : (
          <BookingTable>
            <thead>
              <tr>
                <th>Booking</th>
                <th>Vehicle</th>
                <th>Company</th>
                <th>Dates</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.bookingId}>
                  <td data-label="Booking">#{booking.bookingId}</td>

                  <td data-label="Vehicle">
                    <strong>
                      {booking.make} {booking.model}
                    </strong>
                    <br />
                    <span>{booking.licenseNumber || "No license number"}</span>
                  </td>

                  <td data-label="Company">
                    {booking.companyName || `Company #${booking.companyId}`}
                  </td>

                  <td data-label="Dates">
                    {formatDate(booking.startDate)} -{" "}
                    {formatDate(booking.endDate)}
                  </td>

                  <td data-label="Status">
                    <strong>{booking.status}</strong>
                  </td>

                  <td data-label="Total">
                    R{Number(booking.totalCost || 0).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </BookingTable>
        )}

        <TableFooter>
          <FooterText>
            Showing {filteredBookings.length} of {bookings.length} bookings
          </FooterText>
        </TableFooter>
      </DashboardPanel>
    </DashboardLayout>
  );
}

export default OwnerBookings;
