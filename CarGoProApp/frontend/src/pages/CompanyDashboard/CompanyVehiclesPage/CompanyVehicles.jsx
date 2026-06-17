import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import GridViewIcon from "@mui/icons-material/GridView";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import BarChartIcon from "@mui/icons-material/BarChart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BuildIcon from "@mui/icons-material/Build";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import StatCard from "../../../components/cards/StatCard";

import {
  getVehicleDetails,
  createBooking,
} from "../../../HTTPS Services/CompanyServices.js";

import {
  HeaderRow,
  SectionEyebrow,
  SectionTitle,
  SectionText,
  Toolbar,
  StatsGrid,
  SearchInput,
  FilterSelect,
  EmptyCard,
} from "../../../components/dashboard/DashboardPage.styles";

import {
  LoadMoreWrapper,
  LoadMoreButton,
  ShowingText,
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
} from "./CompanyVehicles.style";

import CompanyVehicleList from "./CompanyVehicleDetailsList.jsx";

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

const initialVisibleCount = 6;
const loadMoreAmount = 6;

function CompanyVehicles() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const [bookingVehicle, setBookingVehicle] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    startDate: "",
    endDate: "",
  });
  const [bookingError, setBookingError] = useState("");
  const [isBookingSaving, setIsBookingSaving] = useState(false);

  const [liveVehicles, setLiveVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);

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

    async function fetchVehicleData() {
      try {
        setLoading(true);
        setError("");

        const data = await getVehicleDetails();

        if (!ignore) {
          setLiveVehicles(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Failed to load vehicle inventory.");
          setLiveVehicles([]);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchVehicleData();

    return () => {
      ignore = true;
    };
  }, []);

  function getTodayDateString() {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const localToday = new Date(today.getTime() - offset * 60 * 1000);

    return localToday.toISOString().split("T")[0];
  }

  useEffect(() => {
    setVisibleCount(initialVisibleCount);
  }, [searchTerm, statusFilter, typeFilter]);

  const filteredVehicles = useMemo(() => {
    return liveVehicles.filter((vehicle) => {
      const searchValue = searchTerm.toLowerCase().trim();

      const vehicleName =
        `${vehicle.make || ""} ${vehicle.model || ""}`.toLowerCase();
      const licenseNumber = vehicle.licenseNumber?.toLowerCase() || "";
      const vinNumber = vehicle.vinNumber?.toLowerCase() || "";
      const category = vehicle.category?.toLowerCase() || "";
      const modelYear = vehicle.modelYear?.toString() || "";

      const matchesSearch =
        searchValue === "" ||
        vehicleName.includes(searchValue) ||
        licenseNumber.includes(searchValue) ||
        vinNumber.includes(searchValue) ||
        category.includes(searchValue) ||
        modelYear.includes(searchValue);

      const matchesStatus =
        statusFilter === "all" || vehicle.isAvailable === statusFilter;

      const matchesType =
        typeFilter === "all" || vehicle.category === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [liveVehicles, searchTerm, statusFilter, typeFilter]);

  const visibleVehicles = filteredVehicles.slice(0, visibleCount);

  const availableVehicles = liveVehicles.filter(
    (vehicle) => vehicle.isAvailable === "Available",
  ).length;

  const inUseVehicles = liveVehicles.filter(
    (vehicle) => vehicle.isAvailable === "In Use",
  ).length;

  const maintenanceVehicles = liveVehicles.filter(
    (vehicle) => vehicle.isAvailable === "Maintenance",
  ).length;

  const hasMoreVehicles = visibleCount < filteredVehicles.length;

  function handleLoadMore() {
    setVisibleCount((currentCount) => currentCount + loadMoreAmount);
  }

  function handleViewVehicle(vehicle) {
    setSelectedVehicle(vehicle);
  }

  function handleCloseDetails() {
    setSelectedVehicle(null);
  }

  function handleBookVehicle(vehicle) {
    if (vehicle.isAvailable !== "Available") {
      setBookingError("This vehicle is not available for booking.");
      return;
    }

    setBookingVehicle(vehicle);
    setBookingForm({
      startDate: "",
      endDate: "",
    });
    setBookingError("");
  }

  function handleBookingChange(event) {
    const { name, value } = event.target;

    setBookingForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function calculateBookingDays(startDate, endDate) {
    if (!startDate || !endDate) {
      return 0;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return 0;
    }

    const difference = end.getTime() - start.getTime();
    const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

    return days > 0 ? days : 0;
  }

  async function handleSubmitBooking(event) {
    event.preventDefault();

    if (!bookingVehicle) {
      setBookingError("No vehicle selected.");
      return;
    }

    if (!bookingForm.startDate || !bookingForm.endDate) {
      setBookingError("Please select a start date and end date.");
      return;
    }

    const today = getTodayDateString();

    if (bookingForm.startDate < today) {
      setBookingError("Start date cannot be in the past.");
      return;
    }

    const days = calculateBookingDays(
      bookingForm.startDate,
      bookingForm.endDate,
    );

    if (days <= 0) {
      setBookingError("End date must be after the start date.");
      return;
    }

    const vehicleId = bookingVehicle.vehicleId || bookingVehicle.id;
    const dailyRate = Number(bookingVehicle.dailyRate || 0);
    const totalCost = days * dailyRate;

    const requestBody = {
      vehicleId: Number(vehicleId),
      startDate: bookingForm.startDate,
      endDate: bookingForm.endDate,
      totalCost,
      status: "Pending",
      licenseNumber: bookingVehicle.licenseNumber || "",
    };

    try {
      setIsBookingSaving(true);
      setBookingError("");

      await createBooking(requestBody);

      setLiveVehicles((currentVehicles) =>
        currentVehicles.map((vehicle) =>
          (vehicle.vehicleId || vehicle.id) === vehicleId
            ? { ...vehicle, isAvailable: "In Use" }
            : vehicle,
        ),
      );

      setBookingVehicle(null);
      navigate("/company/bookings");
    } catch (err) {
      setBookingError(err.message || "Unable to create booking.");
    } finally {
      setIsBookingSaving(false);
    }
  }

  function handleCloseBookingModal() {
    setBookingVehicle(null);
    setBookingError("");
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
      title="Fleet Inventory"
      subtitle="Browse and book vehicles across the fleet network."
      roleLabel="Company Console"
      userLabel="Company"
      navItems={companyNavItems}
    >
      <HeaderRow>
        <div>
          <SectionEyebrow>Dashboard &gt; Vehicles</SectionEyebrow>
          <SectionTitle>Fleet Inventory</SectionTitle>
          <SectionText>
            Browse <strong>{liveVehicles.length} active vehicles</strong> across
            the logistics network.
          </SectionText>
        </div>
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
          label="In Use"
          value={inUseVehicles}
          helperText="Currently booked"
          tone="blue"
          icon={<LocalShippingIcon fontSize="small" />}
        />

        <StatCard
          label="Maintenance"
          value={maintenanceVehicles}
          helperText="Not currently bookable"
          tone="orange"
          icon={<BuildIcon fontSize="small" />}
        />

        <StatCard
          label="Total Vehicles"
          value={liveVehicles.length}
          helperText="Visible fleet records"
          tone="blue"
          icon={<DirectionsCarIcon fontSize="small" />}
        />
      </StatsGrid>

      <Toolbar>
  <SearchInput
  value={searchTerm}
  onChange={(event) => setSearchTerm(event.target.value)}
  placeholder={
    isMobile
      ? "Search make, model..."
    : "Search vehicles by make, model, license, VIN, year, or category..."
  }
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

      <CompanyVehicleList
        vehicles={visibleVehicles}
        onViewVehicle={handleViewVehicle}
        onBookVehicle={handleBookVehicle}
      />

      <LoadMoreWrapper>
        {hasMoreVehicles && (
          <LoadMoreButton type="button" onClick={handleLoadMore}>
            Load More Vehicles
          </LoadMoreButton>
        )}

        <ShowingText>
          Showing {Math.min(visibleCount, filteredVehicles.length)} of{" "}
          {filteredVehicles.length} vehicles
        </ShowingText>
      </LoadMoreWrapper>
      {selectedVehicle && (
        <DetailsOverlay onClick={handleCloseDetails}>
          <DetailsModal onClick={(event) => event.stopPropagation()}>
            <DetailsHeader>
              <div>
                <DetailsTitle>
                  {selectedVehicle.make} {selectedVehicle.model}
                </DetailsTitle>
                <DetailsSubtitle>
                  {selectedVehicle.category || "Uncategorised"} ·{" "}
                  {selectedVehicle.licenseNumber || "No license number"}
                </DetailsSubtitle>
              </div>

              <DetailsCloseButton type="button" onClick={handleCloseDetails}>
                ×
              </DetailsCloseButton>
            </DetailsHeader>

            <DetailsBody>
              <DetailsStatusRow>
                <DetailsStatusBadge $status={selectedVehicle.isAvailable}>
                  {selectedVehicle.isAvailable || "Available"}
                </DetailsStatusBadge>

                <strong>
                  R{Number(selectedVehicle.dailyRate || 0).toLocaleString()} /
                  day
                </strong>
              </DetailsStatusRow>

              <DetailsGrid>
                <DetailsItem>
                  <DetailsLabel>Vehicle ID</DetailsLabel>
                  <DetailsValue>
                    #{selectedVehicle.vehicleId || selectedVehicle.id || "N/A"}
                  </DetailsValue>
                </DetailsItem>

                <DetailsItem>
                  <DetailsLabel>Owner ID</DetailsLabel>
                  <DetailsValue>
                    #{selectedVehicle.ownerId || "N/A"}
                  </DetailsValue>
                </DetailsItem>

                <DetailsItem>
                  <DetailsLabel>Owner Name</DetailsLabel>
                  <DetailsValue>
                    {selectedVehicle.ownerName || "N/A"}
                  </DetailsValue>
                </DetailsItem>

                <DetailsItem>
                  <DetailsLabel>Owner Email</DetailsLabel>
                  <DetailsValue>
                    {selectedVehicle.ownerEmail || "N/A"}
                  </DetailsValue>
                </DetailsItem>

                <DetailsItem>
                  <DetailsLabel>Owner Phone</DetailsLabel>
                  <DetailsValue>
                    {selectedVehicle.ownerPhone || "N/A"}
                  </DetailsValue>
                </DetailsItem>

                <DetailsItem>
                  <DetailsLabel>Make</DetailsLabel>
                  <DetailsValue>{selectedVehicle.make || "N/A"}</DetailsValue>
                </DetailsItem>

                <DetailsItem>
                  <DetailsLabel>Model</DetailsLabel>
                  <DetailsValue>{selectedVehicle.model || "N/A"}</DetailsValue>
                </DetailsItem>

                <DetailsItem>
                  <DetailsLabel>Model Year</DetailsLabel>
                  <DetailsValue>
                    {selectedVehicle.modelYear || "N/A"}
                  </DetailsValue>
                </DetailsItem>

                <DetailsItem>
                  <DetailsLabel>Category</DetailsLabel>
                  <DetailsValue>
                    {selectedVehicle.category || "N/A"}
                  </DetailsValue>
                </DetailsItem>

                <DetailsItem>
                  <DetailsLabel>License Number</DetailsLabel>
                  <DetailsValue>
                    {selectedVehicle.licenseNumber || "N/A"}
                  </DetailsValue>
                </DetailsItem>

                <DetailsItem>
                  <DetailsLabel>VIN Number</DetailsLabel>
                  <DetailsValue>
                    {selectedVehicle.vinNumber || "N/A"}
                  </DetailsValue>
                </DetailsItem>
              </DetailsGrid>
            </DetailsBody>

            <DetailsActions>
              <DetailsSecondaryButton
                type="button"
                onClick={handleCloseDetails}
              >
                Close
              </DetailsSecondaryButton>

              <DetailsPrimaryButton
                type="button"
                disabled={selectedVehicle.isAvailable !== "Available"}
                onClick={() => handleBookVehicle(selectedVehicle)}
              >
                Book Vehicle
              </DetailsPrimaryButton>
            </DetailsActions>
          </DetailsModal>
        </DetailsOverlay>
      )}
      {bookingVehicle && (
        <BookingOverlay onClick={handleCloseBookingModal}>
          <BookingModal
            onSubmit={handleSubmitBooking}
            onClick={(event) => event.stopPropagation()}
          >
            <BookingHeader>
              <div>
                <BookingTitle>Book Vehicle</BookingTitle>
                <BookingSubtitle>
                  {bookingVehicle.make} {bookingVehicle.model} ·{" "}
                  {bookingVehicle.licenseNumber || "No license number"}
                </BookingSubtitle>
              </div>

              <BookingCloseButton
                type="button"
                onClick={handleCloseBookingModal}
              >
                ×
              </BookingCloseButton>
            </BookingHeader>

            <BookingBody>
              <BookingDateGrid>
                <BookingField>
                  <BookingLabel>Start Date</BookingLabel>
                  <input
                    type="date"
                    name="startDate"
                    value={bookingForm.startDate}
                    min={getTodayDateString()}
                    onChange={handleBookingChange}
                  />
                </BookingField>

                <BookingField>
                  <BookingLabel>End Date</BookingLabel>
                  <input
                    type="date"
                    name="endDate"
                    value={bookingForm.endDate}
                    min={bookingForm.startDate || getTodayDateString()}
                    onChange={handleBookingChange}
                  />
                </BookingField>
              </BookingDateGrid>

              <BookingSummary>
                <BookingSummaryLabel>Estimated Total</BookingSummaryLabel>

                <BookingTotal>
                  R
                  {(
                    calculateBookingDays(
                      bookingForm.startDate,
                      bookingForm.endDate,
                    ) * Number(bookingVehicle.dailyRate || 0)
                  ).toLocaleString()}
                </BookingTotal>

                <BookingRateText>
                  R{Number(bookingVehicle.dailyRate || 0).toLocaleString()} per
                  day
                </BookingRateText>
              </BookingSummary>

              {bookingError && <BookingError>{bookingError}</BookingError>}
            </BookingBody>

            <BookingActions>
              <BookingCancelButton
                type="button"
                onClick={handleCloseBookingModal}
              >
                Cancel
              </BookingCancelButton>

              <BookingSubmitButton type="submit" disabled={isBookingSaving}>
                {isBookingSaving ? "Creating..." : "Create Booking"}
              </BookingSubmitButton>
            </BookingActions>
          </BookingModal>
        </BookingOverlay>
      )}
    </DashboardLayout>
  );
}

export default CompanyVehicles;
