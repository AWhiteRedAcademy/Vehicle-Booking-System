import { useMemo, useState } from "react";

import GridViewIcon from "@mui/icons-material/GridView";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import BarChartIcon from "@mui/icons-material/BarChart";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteIcon from "@mui/icons-material/Delete";

import DashboardLayout from "../../../components/dashboard/DashboardLayout";

import {
  HeaderRow,
  SectionTitle,
  SectionText,
  EmptyCard,
} from "../../../components/dashboard/DashboardPage.styles";

import {
  BookingPageHeader,
  HeaderActions,
  FilterButton,
  ExportButton,
  BookingsPanel,
  BookingsToolbar,
  SearchBox,
  SearchInput,
  BookingsTable,
  VehicleCell,
  VehicleThumb,
  VehicleName,
  ClientName,
  DurationText,
  StatusBadge,
  AmountText,
  DetailsButton,
  DeleteBookingButton,
  DateInput,
  TableFooter,
  FooterText,
  Pagination,
  PageButton,
} from "./CompanyBookings.style";

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

const mockBookings = [
  {
    bookingId: "1",
    vehicle: "Mercedes-Benz S-Class",
    client: "YPUSHA DEIEDERICKS",
    startDate: "Oct 12, 2023",
    endDate: "Oct 15, 2023",
    status: "Upcoming",
    amount: 1250,
  },
  {
    bookingId: "2",
    vehicle: "BMW X7 Executive",
    client: "RIDHAA NUSTERDIEN",
    startDate: "Oct 10, 2023",
    endDate: "Oct 10, 2023",
    startDateValue: "2023-10-12",
    endDateValue: "2023-10-15",
    status: "Active",
    amount: 450,
  },
  {
    bookingId: "3",
    vehicle: "BMW M2",
    client: "SETH PHILANDER",
    startDate: "Oct 05, 2023",
    endDate: "Oct 07, 2023",
    startDateValue: "2023-10-10",
    endDateValue: "2023-10-10",
    status: "Completed",
    amount: 890,
  },
  {
    bookingId: "4",
    vehicle: "Audi A8 ",
    client: "JOHNNY SINS",
    startDate: "Oct 02, 2023",
    endDate: "Oct 02, 2023",
    startDateValue: "2023-10-05",
    endDateValue: "2023-10-07",
    status: "Cancelled",
    amount: 320,
  },
];

function CompanyBookings() {
  const [bookings, setBookings] = useState(mockBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const searchValue = searchTerm.toLowerCase().trim();

      const matchesSearch =
        searchValue === "" ||
        booking.bookingId.toLowerCase().includes(searchValue) ||
        booking.vehicle.toLowerCase().includes(searchValue) ||
        booking.client.toLowerCase().includes(searchValue) ||
        booking.status.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "all" || booking.status === statusFilter;

      const bookingStartDate = new Date(booking.startDateValue);
      const selectedStartDate = startDateFilter
        ? new Date(startDateFilter)
        : null;
      const selectedEndDate = endDateFilter ? new Date(endDateFilter) : null;

      const matchesStartDate =
        !selectedStartDate || bookingStartDate >= selectedStartDate;

      const matchesEndDate =
        !selectedEndDate || bookingStartDate <= selectedEndDate;

      return (
        matchesSearch && matchesStatus && matchesStartDate && matchesEndDate
      );
    });
  }, [bookings, searchTerm, statusFilter, startDateFilter, endDateFilter]);

  function handleDeleteBooking(bookingId) {
    const confirmed = window.confirm(
      `Are you sure you want to delete booking #${bookingId}?`,
    );

    if (!confirmed) {
      return;
    }

    setBookings((currentBookings) =>
      currentBookings.filter((booking) => booking.bookingId !== bookingId),
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
      <BookingPageHeader>
        <div>
          <SectionTitle>All Bookings</SectionTitle>
          <SectionText>
            Track upcoming, active, completed, and cancelled bookings.
          </SectionText>
        </div>
        <HeaderActions>
          <FilterButton
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="all">Status: All</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </FilterButton>

          <DateInput
            type="date"
            value={startDateFilter}
            onChange={(event) => setStartDateFilter(event.target.value)}
          />

          <DateInput
            type="date"
            value={endDateFilter}
            onChange={(event) => setEndDateFilter(event.target.value)}
          />

          <ExportButton type="button">
            <FileDownloadIcon fontSize="small" />
            Export Report
          </ExportButton>
        </HeaderActions>
      </BookingPageHeader>

      <BookingsPanel>
        <BookingsToolbar>
          <SearchBox>
            <SearchIcon fontSize="small" />
            <SearchInput
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by booking ID, vehicle, client, or status..."
            />
          </SearchBox>
        </BookingsToolbar>

        {filteredBookings.length === 0 ? (
          <EmptyCard>No bookings found.</EmptyCard>
        ) : (
          <>
            <BookingsTable>
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Vehicle</th>
                  <th>Client</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.bookingId}>
                    <td>
                      <strong>#{booking.bookingId}</strong>
                    </td>

                    <td>
                      <VehicleCell>
                        <VehicleThumb>
                          <DirectionsCarIcon fontSize="small" />
                        </VehicleThumb>

                        <VehicleName>{booking.vehicle}</VehicleName>
                      </VehicleCell>
                    </td>

                    <td>
                      <ClientName>{booking.client}</ClientName>
                    </td>

                    <td>
                      <DurationText>
                        <span>{booking.startDate}</span>
                        <small>to {booking.endDate}</small>
                      </DurationText>
                    </td>

                    <td>
                      <StatusBadge $status={booking.status}>
                        {booking.status}
                      </StatusBadge>
                    </td>

                    <td>
                      <AmountText>
                        R{booking.amount.toLocaleString()}
                      </AmountText>
                    </td>

                    <td>
                      <DetailsButton type="button">Details</DetailsButton>

                      <DeleteBookingButton
                        type="button"
                        onClick={() => handleDeleteBooking(booking.bookingId)}
                      >
                        <DeleteIcon fontSize="small" />
                        Delete
                      </DeleteBookingButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </BookingsTable>

            <TableFooter>
              <FooterText>
                Showing <strong>{filteredBookings.length}</strong> of{" "}
                {bookings.length} bookings
              </FooterText>

              <Pagination>
                <PageButton type="button" disabled>
                  ‹
                </PageButton>
                <PageButton type="button" $active>
                  1
                </PageButton>
                <PageButton type="button">2</PageButton>
                <PageButton type="button">3</PageButton>
                <PageButton type="button">›</PageButton>
              </Pagination>
            </TableFooter>
          </>
        )}
      </BookingsPanel>
    </DashboardLayout>
  );
}

export default CompanyBookings;
