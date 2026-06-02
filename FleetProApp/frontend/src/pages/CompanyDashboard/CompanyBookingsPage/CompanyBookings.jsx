import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import GridViewIcon from "@mui/icons-material/GridView";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import BarChartIcon from "@mui/icons-material/BarChart";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

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
  ModalOverlay,
  ModalCard,
  ModalHeader,
  ModalTitle,
  ModalSubtitle,
  ModalCloseButton,
  ModalBody,
  DetailGrid,
  DetailItem,
  DetailLabel,
  DetailValue,
  ModalActions,
  ModalSecondaryButton,
  ModalPrimaryButton,
  ModalDangerButton,
  ModalInput,
  PanelMessage,
  PanelError,
  ModalErrorText,
  ModalWarningText,
} from "./CompanyBookings.style.js";

import CompanyBookingList from "./CompanyBookingListDetails.jsx";

import {
  getCurrentCompanyBookings,
  getCompanyBookingHistory,
  updateBooking,
  deleteBooking,
} from "../../../HTTPS Services/CompanyServices.js";

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

const itemsPerPage = 5;

function dateMatchesFilter(booking, dateFilter) {
  if (dateFilter === "all") return true;

  const rawDate = booking.startDate || booking.endDate;
  if (!rawDate) return false;

  const bookingDate = new Date(rawDate);
  if (Number.isNaN(bookingDate.getTime())) return false;

  const today = new Date();

  const bookingDay = new Date(
    bookingDate.getFullYear(),
    bookingDate.getMonth(),
    bookingDate.getDate(),
  );

  const todayDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  if (dateFilter === "today") {
    return bookingDay.getTime() === todayDay.getTime();
  }

  if (dateFilter === "thisWeek") {
    const weekStart = new Date(todayDay);
    weekStart.setDate(todayDay.getDate() - todayDay.getDay());

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);

    return bookingDay >= weekStart && bookingDay < weekEnd;
  }

  if (dateFilter === "thisMonth") {
    return (
      bookingDate.getFullYear() === today.getFullYear() &&
      bookingDate.getMonth() === today.getMonth()
    );
  }

  return true;
}

function filterBookings(bookings, searchTerm, dateFilter) {
  const searchValue = searchTerm.toLowerCase().trim();

  return bookings.filter((booking) => {
    const vehicleName =
      `${booking.make || ""} ${booking.model || ""}`.toLowerCase();
    const licenseNumber = booking.licenseNumber?.toLowerCase() || "";
    const category = booking.category?.toLowerCase() || "";
    const ownerName = booking.ownerName?.toLowerCase() || "";
    const bookingId = booking.bookingId?.toString() || "";
    const status = booking.status?.toLowerCase() || "";

    const matchesSearch =
      searchValue === "" ||
      vehicleName.includes(searchValue) ||
      licenseNumber.includes(searchValue) ||
      category.includes(searchValue) ||
      ownerName.includes(searchValue) ||
      bookingId.includes(searchValue) ||
      status.includes(searchValue);

    const matchesDate = dateMatchesFilter(booking, dateFilter);

    return matchesSearch && matchesDate;
  });
}

function paginate(items, currentPage) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return {
    pageItems: items.slice(startIndex, endIndex),
    startIndex,
    endIndex,
    totalPages: Math.max(1, Math.ceil(items.length / itemsPerPage)),
  };
}

function CompanyBookings() {
  function formatDate(value) {
    if (!value) {
      return "N/A";
    }

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
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(true);

  const [currentBookings, setCurrentBookings] = useState([]);
  const [historyBookings, setHistoryBookings] = useState([]);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editingBooking, setEditingBooking] = useState(null);
  const [deletingBooking, setDeletingBooking] = useState(null);

  const [editForm, setEditForm] = useState({
    startDate: "",
    endDate: "",
  });

  const [modalError, setModalError] = useState("");
  const [isModalSaving, setIsModalSaving] = useState(false);

  const [loading, setLoading] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);

  const [error, setError] = useState("");
  const [historyError, setHistoryError] = useState("");

  const [currentActivePage, setCurrentActivePage] = useState(1);
  const [currentHistoryPage, setCurrentHistoryPage] = useState(1);

  //mobile
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

    async function loadCurrentBookings() {
      try {
        setLoading(true);
        setError("");

        const data = await getCurrentCompanyBookings();

        if (!ignore) {
          setCurrentBookings(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Failed to load current bookings.");
          setCurrentBookings([]);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadCurrentBookings();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    setCurrentActivePage(1);
    setCurrentHistoryPage(1);
  }, [searchTerm, dateFilter]);

  const filteredCurrentBookings = useMemo(() => {
    return filterBookings(currentBookings, searchTerm, dateFilter);
  }, [currentBookings, searchTerm, dateFilter]);

  const filteredHistoryBookings = useMemo(() => {
    return filterBookings(historyBookings, searchTerm, dateFilter);
  }, [historyBookings, searchTerm, dateFilter]);

  const currentPagination = paginate(
    filteredCurrentBookings,
    currentActivePage,
  );
  const historyPagination = paginate(
    filteredHistoryBookings,
    currentHistoryPage,
  );

  const confirmedCount = currentBookings.filter(
    (booking) => booking.status === "Confirmed",
  ).length;

  const inProgressCount = currentBookings.filter(
    (booking) =>
      booking.status === "Confirmed" || booking.currentBooking === "Confirmed",
  ).length;

  const pendingCount = currentBookings.filter(
    (booking) => booking.status === "Pending",
  ).length;

  async function handleLoadHistory() {
    if (historyLoaded) {
      return;
    }

    try {
      setHistoryLoading(true);
      setHistoryError("");

      const data = await getCompanyBookingHistory();

      setHistoryBookings(Array.isArray(data) ? data : []);
      setHistoryLoaded(true);
    } catch (err) {
      setHistoryError(err.message || "Failed to load booking history.");
      setHistoryBookings([]);
    } finally {
      setHistoryLoading(false);
    }
  }

  function handleAddBooking() {
    navigate("/company/vehicles");
  }

  function handleToggleFilters() {
    setShowFilters((currentValue) => !currentValue);
  }

  function getTodayDateString() {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const localToday = new Date(today.getTime() - offset * 60 * 1000);

    return localToday.toISOString().split("T")[0];
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

  function canModifyBooking(booking) {
    if (!booking.startDate) return false;

    const today = getTodayDateString();

    return booking.startDate > today;
  }

  function handleViewBooking(booking) {
    setSelectedBooking(booking);
    setModalError("");
  }

  function handleEditBooking(booking) {
    if (!canModifyBooking(booking)) {
      setModalError(
        "This booking can no longer be edited because it has already started.",
      );
      setSelectedBooking(booking);
      return;
    }

    setEditingBooking(booking);
    setEditForm({
      startDate: booking.startDate || "",
      endDate: booking.endDate || "",
    });
    setModalError("");
  }

  function handleDeleteBooking(booking) {
    if (!canModifyBooking(booking)) {
      setModalError(
        "This booking can no longer be deleted because it has already started.",
      );
      setSelectedBooking(booking);
      return;
    }

    setDeletingBooking(booking);
    setModalError("");
  }

  function handleCloseModals() {
    setSelectedBooking(null);
    setEditingBooking(null);
    setDeletingBooking(null);
    setModalError("");
    setIsModalSaving(false);
  }

  function handleEditFormChange(event) {
    const { name, value } = event.target;

    setEditForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function buildUpdatedBookingRequest(booking, startDate, endDate) {
    const days = calculateBookingDays(startDate, endDate);
    const dailyRate = Number(booking.dailyRate || 0);
    const totalCost = days * dailyRate;

    return {
      companyId: Number(booking.companyId),
      vehicleId: Number(booking.vehicleId),
      startDate,
      endDate,
      totalCost,
      status: booking.status || "Pending",
      licenseNumber: booking.licenseNumber || "",
    };
  }

  function updateBookingInState(updatedBooking) {
    setCurrentBookings((currentItems) =>
      currentItems.map((booking) =>
        booking.bookingId === updatedBooking.bookingId
          ? updatedBooking
          : booking,
      ),
    );

    setHistoryBookings((currentItems) =>
      currentItems.map((booking) =>
        booking.bookingId === updatedBooking.bookingId
          ? updatedBooking
          : booking,
      ),
    );
  }

  function removeBookingFromState(bookingId) {
    setCurrentBookings((currentItems) =>
      currentItems.filter((booking) => booking.bookingId !== bookingId),
    );

    setHistoryBookings((currentItems) =>
      currentItems.filter((booking) => booking.bookingId !== bookingId),
    );
  }

  async function handleSubmitEditBooking(event) {
    event.preventDefault();

    if (!editingBooking) {
      setModalError("No booking selected.");
      return;
    }

    if (!editForm.startDate || !editForm.endDate) {
      setModalError("Please select a start date and end date.");
      return;
    }

    const today = getTodayDateString();

    if (editForm.startDate < today) {
      setModalError("Start date cannot be in the past.");
      return;
    }

    const days = calculateBookingDays(editForm.startDate, editForm.endDate);

    if (days <= 0) {
      setModalError("End date must be after the start date.");
      return;
    }

    try {
      setIsModalSaving(true);
      setModalError("");

      const requestBody = buildUpdatedBookingRequest(
        editingBooking,
        editForm.startDate,
        editForm.endDate,
      );

      await updateBooking(editingBooking.bookingId, requestBody);

      const updatedBooking = {
        ...editingBooking,
        startDate: editForm.startDate,
        endDate: editForm.endDate,
        totalCost: requestBody.totalCost,
      };

      updateBookingInState(updatedBooking);
      handleCloseModals();
    } catch (err) {
      setModalError(err.message || "Unable to update booking.");
    } finally {
      setIsModalSaving(false);
    }
  }

  async function handleConfirmDeleteBooking() {
    if (!deletingBooking) {
      setModalError("No booking selected.");
      return;
    }

    try {
      setIsModalSaving(true);
      setModalError("");

      await deleteBooking(deletingBooking.bookingId);

      removeBookingFromState(deletingBooking.bookingId);
      handleCloseModals();
    } catch (err) {
      setModalError(err.message || "Unable to delete booking.");
    } finally {
      setIsModalSaving(false);
    }
  }

  function goToPreviousCurrentPage() {
    setCurrentActivePage((page) => Math.max(1, page - 1));
  }

  function goToNextCurrentPage() {
    setCurrentActivePage((page) =>
      Math.min(currentPagination.totalPages, page + 1),
    );
  }

  function goToPreviousHistoryPage() {
    setCurrentHistoryPage((page) => Math.max(1, page - 1));
  }

  function goToNextHistoryPage() {
    setCurrentHistoryPage((page) =>
      Math.min(historyPagination.totalPages, page + 1),
    );
  }

  if (loading) {
    return (
      <DashboardLayout
        title="Loading Bookings..."
        roleLabel="Company Console"
        userLabel="Company"
        navItems={companyNavItems}
      >
        <EmptyCard>Loading current bookings...</EmptyCard>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout
        title="Bookings Error"
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
      title="All Bookings"
      subtitle="Manage and monitor vehicle booking requests."
      roleLabel="Company Console"
      userLabel="Company"
      navItems={companyNavItems}
    >
      <HeaderRow>
        <div>
          <SectionEyebrow>Dashboard &gt; Bookings</SectionEyebrow>
          <SectionTitle>Booking Management</SectionTitle>
          <SectionText>
            Track active bookings now, and load older booking history only when
            needed.
          </SectionText>
        </div>

        <AddButton type="button" onClick={handleAddBooking}>
          <AddIcon fontSize="small" />
          Add Booking
        </AddButton>
      </HeaderRow>

      <StatsGrid>
        <StatCard
          label="Current Bookings"
          value={confirmedCount}
          helperText="Confirmed active bookings"
          tone="green"
          icon={<CheckCircleIcon fontSize="small" />}
        />

        <StatCard
          label="In Progress"
          value={inProgressCount}
          helperText="Currently booked"
          tone="blue"
          icon={<LocalShippingIcon fontSize="small" />}
        />

        <StatCard
          label="Pending Bookings"
          value={pendingCount}
          helperText="Awaiting approval"
          tone="orange"
          icon={<PendingActionsIcon fontSize="small" />}
        />

        <StatCard
          label="Loaded Bookings"
          value={currentBookings.length + historyBookings.length}
          helperText={
            historyLoaded ? "Current + history loaded" : "Current only"
          }
          tone="blue"
          icon={<DirectionsCarIcon fontSize="small" />}
        />
      </StatsGrid>

      {showFilters && (
        <Toolbar>
          <SearchInput
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder={
              isMobile
                ? "Search bookings..."
                : "Search by booking ID, vehicle, client, or status..."
            }
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
      )}

      <DashboardPanel>
        <PanelHeader>
          <PanelTitle>Active Booking Queue</PanelTitle>
          <PanelActionButton type="button" onClick={handleToggleFilters}>
            {showFilters ? "Hide Filters" : "Filter"}
          </PanelActionButton>
        </PanelHeader>

        <BookingTable>
          <thead>
            <tr>
              <th>Booking Details</th>
              <th>Type</th>
              <th>Status</th>
              <th>Current Booking</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>

          <CompanyBookingList
            bookings={currentPagination.pageItems}
            onViewBooking={handleViewBooking}
            onEditBooking={handleEditBooking}
            onDeleteBooking={handleDeleteBooking}
          />
        </BookingTable>

        <TableFooter>
          <FooterText>
            Showing page {currentActivePage} of {currentPagination.totalPages} (
            {filteredCurrentBookings.length} current entries)
          </FooterText>

          <PaginationButtons>
            <PaginationButton
              type="button"
              disabled={currentActivePage === 1}
              onClick={goToPreviousCurrentPage}
              style={{
                opacity: currentActivePage === 1 ? 0.4 : 1,
                cursor: currentActivePage === 1 ? "not-allowed" : "pointer",
              }}
            >
              ‹
            </PaginationButton>

            <PaginationButton
              type="button"
              disabled={currentActivePage === currentPagination.totalPages}
              onClick={goToNextCurrentPage}
              style={{
                opacity:
                  currentActivePage === currentPagination.totalPages ? 0.4 : 1,
                cursor:
                  currentActivePage === currentPagination.totalPages
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              ›
            </PaginationButton>
          </PaginationButtons>
        </TableFooter>
      </DashboardPanel>

      <div style={{ margin: "24px 0" }} />

      {!historyLoaded ? (
        <DashboardPanel>
          <PanelHeader>
            <PanelTitle>Booking History</PanelTitle>
            <PanelActionButton
              type="button"
              onClick={handleLoadHistory}
              disabled={historyLoading}
            >
              {historyLoading ? "Loading..." : "Load Booking History"}
            </PanelActionButton>
          </PanelHeader>

          <PanelMessage>
            Older booking records are not loaded until you press the button.
          </PanelMessage>

          {historyError && <PanelError>{historyError}</PanelError>}

          {historyError && (
            <div
              style={{
                padding: "0 26px 24px",
                color: "#dc2626",
                fontWeight: 800,
              }}
            >
              {historyError}
            </div>
          )}
        </DashboardPanel>
      ) : (
        <DashboardPanel>
          <PanelHeader>
            <PanelTitle>Booking History</PanelTitle>
            <PanelActionButton
              type="button"
              onClick={() => setHistoryLoaded(false)}
            >
              Hide History
            </PanelActionButton>
          </PanelHeader>

          <BookingTable>
            <thead>
              <tr>
                <th>Booking Details</th>
                <th>Type</th>
                <th>Status</th>
                <th>Current Booking</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>

            <CompanyBookingList
              bookings={historyPagination.pageItems}
              onViewBooking={handleViewBooking}
              onEditBooking={handleEditBooking}
              onDeleteBooking={handleDeleteBooking}
            />
          </BookingTable>

          <TableFooter>
            <FooterText>
              Showing page {currentHistoryPage} of{" "}
              {historyPagination.totalPages} ({filteredHistoryBookings.length}{" "}
              past items)
            </FooterText>

            <PaginationButtons>
              <PaginationButton
                type="button"
                disabled={currentHistoryPage === 1}
                onClick={goToPreviousHistoryPage}
                style={{
                  opacity: currentHistoryPage === 1 ? 0.4 : 1,
                  cursor: currentHistoryPage === 1 ? "not-allowed" : "pointer",
                }}
              >
                ‹
              </PaginationButton>

              <PaginationButton
                type="button"
                disabled={currentHistoryPage === historyPagination.totalPages}
                onClick={goToNextHistoryPage}
                style={{
                  opacity:
                    currentHistoryPage === historyPagination.totalPages
                      ? 0.4
                      : 1,
                  cursor:
                    currentHistoryPage === historyPagination.totalPages
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                ›
              </PaginationButton>
            </PaginationButtons>
          </TableFooter>
        </DashboardPanel>
      )}
      {selectedBooking && (
        <ModalOverlay onClick={handleCloseModals}>
          <ModalCard onClick={(event) => event.stopPropagation()}>
            <ModalHeader>
              <div>
                <ModalTitle>Booking #{selectedBooking.bookingId}</ModalTitle>
                <ModalSubtitle>
                  {selectedBooking.make} {selectedBooking.model} ·{" "}
                  {selectedBooking.licenseNumber || "No license"}
                </ModalSubtitle>
              </div>

              <ModalCloseButton type="button" onClick={handleCloseModals}>
                ×
              </ModalCloseButton>
            </ModalHeader>

            <ModalBody>
              {modalError && <ModalErrorText>{modalError}</ModalErrorText>}

              <DetailGrid>
                <DetailItem>
                  <DetailLabel>Status</DetailLabel>
                  <DetailValue>
                    {selectedBooking.status || "Pending"}
                  </DetailValue>
                </DetailItem>

                <DetailItem>
                  <DetailLabel>Current Booking</DetailLabel>
                  <DetailValue>
                    {selectedBooking.currentBooking ||
                      selectedBooking.status ||
                      "Pending"}
                  </DetailValue>
                </DetailItem>

                <DetailItem>
                  <DetailLabel>Start Date</DetailLabel>
                  <DetailValue>
                    {formatDate(selectedBooking.startDate)}
                  </DetailValue>
                </DetailItem>

                <DetailItem>
                  <DetailLabel>End Date</DetailLabel>
                  <DetailValue>
                    {formatDate(selectedBooking.endDate)}
                  </DetailValue>
                </DetailItem>

                <DetailItem>
                  <DetailLabel>Total Cost</DetailLabel>
                  <DetailValue>
                    R{Number(selectedBooking.totalCost || 0).toLocaleString()}
                  </DetailValue>
                </DetailItem>

                <DetailItem>
                  <DetailLabel>Daily Rate</DetailLabel>
                  <DetailValue>
                    R{Number(selectedBooking.dailyRate || 0).toLocaleString()}
                  </DetailValue>
                </DetailItem>

                <DetailItem>
                  <DetailLabel>Owner</DetailLabel>
                  <DetailValue>
                    {selectedBooking.ownerName || "N/A"}
                  </DetailValue>
                </DetailItem>

                <DetailItem>
                  <DetailLabel>Owner Contact</DetailLabel>
                  <DetailValue>
                    {selectedBooking.ownerEmail || "N/A"}
                    <br />
                    {selectedBooking.ownerPhone || "N/A"}
                  </DetailValue>
                </DetailItem>
              </DetailGrid>
            </ModalBody>

            <ModalActions>
              <ModalSecondaryButton type="button" onClick={handleCloseModals}>
                Close
              </ModalSecondaryButton>

              <ModalPrimaryButton
                type="button"
                disabled={!canModifyBooking(selectedBooking)}
                onClick={() => handleEditBooking(selectedBooking)}
              >
                Edit Dates
              </ModalPrimaryButton>

              <ModalDangerButton
                type="button"
                disabled={!canModifyBooking(selectedBooking)}
                onClick={() => handleDeleteBooking(selectedBooking)}
              >
                Delete
              </ModalDangerButton>
            </ModalActions>
          </ModalCard>
        </ModalOverlay>
      )}

      {editingBooking && (
        <ModalOverlay onClick={handleCloseModals}>
          <ModalCard onClick={(event) => event.stopPropagation()}>
            <ModalHeader>
              <div>
                <ModalTitle>Edit Booking Dates</ModalTitle>
                <ModalSubtitle>
                  Booking #{editingBooking.bookingId} · {editingBooking.make}{" "}
                  {editingBooking.model}
                </ModalSubtitle>
              </div>

              <ModalCloseButton type="button" onClick={handleCloseModals}>
                ×
              </ModalCloseButton>
            </ModalHeader>

            <form onSubmit={handleSubmitEditBooking}>
              <ModalBody>
                <DetailGrid>
                  <DetailItem>
                    <DetailLabel>Start Date</DetailLabel>
                    <ModalInput
                      type="date"
                      name="startDate"
                      value={editForm.startDate}
                      min={getTodayDateString()}
                      onChange={handleEditFormChange}
                    />
                  </DetailItem>

                  <DetailItem>
                    <DetailLabel>End Date</DetailLabel>
                    <ModalInput
                      type="date"
                      name="endDate"
                      value={editForm.endDate}
                      min={editForm.startDate || getTodayDateString()}
                      onChange={handleEditFormChange}
                    />
                  </DetailItem>

                  <DetailItem>
                    <DetailLabel>Daily Rate</DetailLabel>
                    <DetailValue>
                      R{Number(editingBooking.dailyRate || 0).toLocaleString()}
                    </DetailValue>
                  </DetailItem>

                  <DetailItem>
                    <DetailLabel>Updated Total</DetailLabel>
                    <DetailValue>
                      R
                      {(
                        calculateBookingDays(
                          editForm.startDate,
                          editForm.endDate,
                        ) * Number(editingBooking.dailyRate || 0)
                      ).toLocaleString()}
                    </DetailValue>
                  </DetailItem>
                </DetailGrid>

                {modalError && (
                  <p style={{ color: "#dc2626", fontWeight: 800 }}>
                    {modalError}
                  </p>
                )}
              </ModalBody>

              <ModalActions>
                <ModalSecondaryButton type="button" onClick={handleCloseModals}>
                  Cancel
                </ModalSecondaryButton>

                <ModalPrimaryButton type="submit" disabled={isModalSaving}>
                  {isModalSaving ? "Saving..." : "Save Changes"}
                </ModalPrimaryButton>
              </ModalActions>
            </form>
          </ModalCard>
        </ModalOverlay>
      )}

      {deletingBooking && (
        <ModalOverlay onClick={handleCloseModals}>
          <ModalCard onClick={(event) => event.stopPropagation()}>
            <ModalHeader>
              <div>
                <ModalTitle>Delete Booking</ModalTitle>
                <ModalSubtitle>
                  Booking #{deletingBooking.bookingId} · {deletingBooking.make}{" "}
                  {deletingBooking.model}
                </ModalSubtitle>
              </div>

              <ModalCloseButton type="button" onClick={handleCloseModals}>
                ×
              </ModalCloseButton>
            </ModalHeader>

            <ModalBody>
              <ModalWarningText>
                Are you sure you want to delete this booking? This cannot be
                undone.
              </ModalWarningText>
              {modalError && (
                <p style={{ color: "#dc2626", fontWeight: 800 }}>
                  {modalError}
                </p>
              )}
            </ModalBody>

            <ModalActions>
              <ModalSecondaryButton type="button" onClick={handleCloseModals}>
                Cancel
              </ModalSecondaryButton>

              <ModalDangerButton
                type="button"
                disabled={isModalSaving}
                onClick={handleConfirmDeleteBooking}
              >
                {isModalSaving ? "Deleting..." : "Delete Booking"}
              </ModalDangerButton>
            </ModalActions>
          </ModalCard>
        </ModalOverlay>
      )}
    </DashboardLayout>
  );
}

export default CompanyBookings;
