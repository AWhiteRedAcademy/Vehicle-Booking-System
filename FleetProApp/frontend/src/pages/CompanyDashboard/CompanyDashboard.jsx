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
  DetailsOverlay,
  DetailsModal,
  DetailsHeader,
  DetailsTitle,
  DetailsSubtitle,
  DetailsCloseButton,
  DetailsBody,
  DetailsStatusRow,
  DetailsStatusBadge,
  DetailsGrid,
  DetailsItem,
  DetailsLabel,
  DetailsValue,
  DetailsActions,
  DetailsSecondaryButton,
  DetailsPrimaryButton,
  BookingOverlay,
  BookingModal,
  BookingHeader,
  BookingTitle,
  BookingSubtitle,
  BookingCloseButton,
  BookingBody,
  BookingDateGrid,
  BookingField,
  BookingLabel,
  BookingInput,
  BookingSummary,
  BookingSummaryLabel,
  BookingTotal,
  BookingRateText,
  BookingError,
  BookingActions,
  BookingCancelButton,
  BookingSubmitButton,
} from "./CompanyDashboard.style.js";

import CompanyBookingList from "./CompanyBookingDetailsList.jsx";

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

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicleToBook, setVehicleToBook] = useState(null);

  const [bookingForm, setBookingForm] = useState({
    startDate: "",
    endDate: "",
  });

  const [bookingError, setBookingError] = useState("");

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 760);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 760);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        availabilityFilter === "all" ||
        booking.isAvailable === availabilityFilter;

      return matchesSearch && matchesCategory && matchesAvailability;
    });
  }, [liveBookings, searchTerm, categoryFilter, availabilityFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredBookings.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedBookings = filteredBookings.slice(startIndex, endIndex);

  const availableVehicles = liveBookings.filter(
    (booking) => booking.isAvailable === "Available",
  ).length;

  const inProgressVehicles = liveBookings.filter(
    (booking) => booking.isAvailable === "In Use",
  ).length;

  const pendingBookings = liveBookings.filter(
    (booking) => booking.currentBooking === "Pending",
  ).length;

  function handleFindVehicle() {
    setAvailabilityFilter("Available");
    setShowTableFilters(true);

    setTimeout(() => {
      searchInputRef.current?.focus();
      tablePanelRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
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

  function handleViewVehicle(vehicle) {
    console.log("Parent received vehicle:", vehicle);
    setSelectedVehicle(vehicle);
  }

  function handleBookVehicle(vehicle) {
    setVehicleToBook(vehicle);
    setBookingForm({
      startDate: "",
      endDate: "",
    });
    setBookingError("");
  }

  function handleDeleteVehicle(vehicle) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${vehicle.make} ${vehicle.model}?`,
    );

    if (!confirmed) {
      return;
    }

    const vehicleId = vehicle.vehicleId || vehicle.id;

    setLiveBookings((currentVehicles) =>
      currentVehicles.filter(
        (currentVehicle) =>
          (currentVehicle.vehicleId || currentVehicle.id) !== vehicleId,
      ),
    );
  }

  // function handleDeleteVehicle(vehicle) {
  //   const confirmed = window.confirm(
  //     `Are you sure you want to delete ${vehicle.make} ${vehicle.model}?`,
  //   );

  //   if (!confirmed) {
  //     return;
  //   }

  //   const vehicleId = vehicle.vehicleId || vehicle.id;

  //   setLiveBookings((currentVehicles) =>
  //     currentVehicles.filter(
  //       (currentVehicle) =>
  //         (currentVehicle.vehicleId || currentVehicle.id) !== vehicleId,
  //     ),
  //   );
  // }

  function handleBookingFormChange(event) {
    const { name, value } = event.target;

    setBookingForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setBookingError("");
  }

  function handleSubmitBooking(event) {
    event.preventDefault();

    if (!bookingForm.startDate || !bookingForm.endDate) {
      setBookingError("Please select both start and end dates.");
      return;
    }

    const startDate = new Date(bookingForm.startDate);
    const endDate = new Date(bookingForm.endDate);

    if (endDate < startDate) {
      setBookingError("End date cannot be before start date.");
      return;
    }

    const vehicleId = vehicleToBook.vehicleId || vehicleToBook.id;

    setLiveBookings((currentVehicles) =>
      currentVehicles.map((vehicle) => {
        const currentVehicleId = vehicle.vehicleId || vehicle.id;

        if (currentVehicleId !== vehicleId) {
          return vehicle;
        }

        return {
          ...vehicle,
          isAvailable: "In Use",
          currentBooking: "Pending",
          bookingStartDate: bookingForm.startDate,
          bookingEndDate: bookingForm.endDate,
        };
      }),
    );

    setVehicleToBook(null);
    setBookingForm({
      startDate: "",
      endDate: "",
    });
    setBookingError("");
  }

  const selectedVehicleDailyRate = Number(selectedVehicle?.dailyRate || 0);
  const bookingVehicleDailyRate = Number(vehicleToBook?.dailyRate || 0);

  const bookingDays =
    bookingForm.startDate && bookingForm.endDate
      ? Math.max(
          1,
          Math.ceil(
            (new Date(bookingForm.endDate) - new Date(bookingForm.startDate)) /
              (1000 * 60 * 60 * 24),
          ) + 1,
        )
      : 0;

  const bookingTotal = bookingDays * bookingVehicleDailyRate;

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
            Real time vehicle availability and booking information for your
            company.
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
            placeholder={
              isMobile
                ? "Search make, model, license..."
                : "Search vehicles by make, model, license, VIN, year, or category..."
            }
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
          <CompanyBookingList
            bookings={paginatedBookings}
            onViewVehicle={handleViewVehicle}
            onBookVehicle={handleBookVehicle}
          />
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

      {selectedVehicle && (
        <DetailsOverlay onClick={() => setSelectedVehicle(null)}>
          <DetailsModal onClick={(event) => event.stopPropagation()}>
            <DetailsHeader>
              <div>
                <DetailsTitle>
                  {selectedVehicle.make} {selectedVehicle.model}
                </DetailsTitle>
                <DetailsSubtitle>
                  {selectedVehicle.licenseNumber || "No license number"}{" "}
                  {selectedVehicle.modelYear > 0
                    ? `• ${selectedVehicle.modelYear}`
                    : ""}
                </DetailsSubtitle>
              </div>

              <DetailsCloseButton
                type="button"
                onClick={() => setSelectedVehicle(null)}
              >
                ×
              </DetailsCloseButton>
            </DetailsHeader>

            <DetailsBody>
              <DetailsStatusRow>
                <DetailsStatusBadge $status={selectedVehicle.isAvailable}>
                  {selectedVehicle.isAvailable || "Available"}
                </DetailsStatusBadge>

                <strong>
                  R{selectedVehicleDailyRate.toLocaleString()} / day
                </strong>
              </DetailsStatusRow>

              <DetailsGrid>
                <DetailsItem>
                  <DetailsLabel>Make</DetailsLabel>
                  <DetailsValue>
                    {selectedVehicle.make || "Not provided"}
                  </DetailsValue>
                </DetailsItem>

                <DetailsItem>
                  <DetailsLabel>Model</DetailsLabel>
                  <DetailsValue>
                    {selectedVehicle.model || "Not provided"}
                  </DetailsValue>
                </DetailsItem>

                <DetailsItem>
                  <DetailsLabel>Category</DetailsLabel>
                  <DetailsValue>
                    {selectedVehicle.category || "Uncategorised"}
                  </DetailsValue>
                </DetailsItem>

                <DetailsItem>
                  <DetailsLabel>Status</DetailsLabel>
                  <DetailsValue>
                    {selectedVehicle.isAvailable || "Available"}
                  </DetailsValue>
                </DetailsItem>

                <DetailsItem>
                  <DetailsLabel>Current Booking</DetailsLabel>
                  <DetailsValue>
                    {selectedVehicle.currentBooking || "No booking"}
                  </DetailsValue>
                </DetailsItem>

                <DetailsItem>
                  <DetailsLabel>Daily Rate</DetailsLabel>
                  <DetailsValue>
                    R{selectedVehicleDailyRate.toLocaleString()}
                  </DetailsValue>
                </DetailsItem>

                <DetailsItem>
                  <DetailsLabel>VIN Number</DetailsLabel>
                  <DetailsValue>
                    {selectedVehicle.vinNumber || "Not provided"}
                  </DetailsValue>
                </DetailsItem>

                <DetailsItem>
                  <DetailsLabel>Vehicle ID</DetailsLabel>
                  <DetailsValue>
                    #{selectedVehicle.vehicleId || selectedVehicle.id || "N/A"}
                  </DetailsValue>
                </DetailsItem>
              </DetailsGrid>
            </DetailsBody>

            <DetailsActions>
              <DetailsSecondaryButton
                type="button"
                onClick={() => setSelectedVehicle(null)}
              >
                Close
              </DetailsSecondaryButton>

              <DetailsPrimaryButton
                type="button"
                disabled={selectedVehicle.isAvailable !== "Available"}
                onClick={() => {
                  setVehicleToBook(selectedVehicle);
                  setSelectedVehicle(null);
                }}
              >
                Book Vehicle
              </DetailsPrimaryButton>
            </DetailsActions>
          </DetailsModal>
        </DetailsOverlay>
      )}

      {vehicleToBook && (
        <BookingOverlay onClick={() => setVehicleToBook(null)}>
          <BookingModal
            onClick={(event) => event.stopPropagation()}
            onSubmit={handleSubmitBooking}
          >
            <BookingHeader>
              <div>
                <BookingTitle>
                  Book {vehicleToBook.make} {vehicleToBook.model}
                </BookingTitle>
                <BookingSubtitle>
                  Select rental dates and confirm booking request.
                </BookingSubtitle>
              </div>

              <BookingCloseButton
                type="button"
                onClick={() => setVehicleToBook(null)}
              >
                ×
              </BookingCloseButton>
            </BookingHeader>

            <BookingBody>
              <BookingDateGrid>

                <BookingField>
                  <BookingLabel>Start Date</BookingLabel>
                  <BookingInput
                    type="date"
                    name="startDate"
                    value={bookingForm.startDate}
                    onChange={handleBookingFormChange}
                  />
                </BookingField>

                <BookingField>
                  <BookingLabel>End Date</BookingLabel>
                  <BookingInput
                    type="date"
                    name="endDate"
                    value={bookingForm.endDate}
                    onChange={handleBookingFormChange}
                  />
                </BookingField>
              </BookingDateGrid>

              <BookingSummary>
                <BookingSummaryLabel>Estimated Total</BookingSummaryLabel>

                <BookingTotal>R{bookingTotal.toLocaleString()}</BookingTotal>

                <BookingRateText>
                  {bookingDays || 0} day(s) × R
                  {bookingVehicleDailyRate.toLocaleString()} per day
                </BookingRateText>
              </BookingSummary>

              {bookingError && <BookingError>{bookingError}</BookingError>}
            </BookingBody>

            <BookingActions>
              <BookingCancelButton
                type="button"
                onClick={() => setVehicleToBook(null)}
              >
                Cancel
              </BookingCancelButton>

              <BookingSubmitButton type="submit">
                Confirm Booking
              </BookingSubmitButton>
            </BookingActions>
          </BookingModal>
        </BookingOverlay>
      )}
    </DashboardLayout>
  );
}

export default CompanyDashboard;
