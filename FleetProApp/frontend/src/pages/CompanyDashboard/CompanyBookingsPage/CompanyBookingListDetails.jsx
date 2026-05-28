import { useState } from "react";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import {
  BookingInfo,
  VehicleImage,
  VehicleName,
  VehicleMeta,
  Badge,
  StatusText,
  ActionButton,
  ActionMenuWrapper,
  ActionMenu,
  ActionMenuItem,
} from "./CompanyBookings.style.js";

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

function canModifyBooking(booking) {
  if (!booking.startDate) return false;

  const today = new Date();
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const start = new Date(booking.startDate);
  const startOnly = new Date(start.getFullYear(), start.getMonth(), start.getDate());

  return startOnly > todayOnly;
}

export default function CompanyBookingList({
  bookings = [],
  onViewBooking,
  onEditBooking,
  onDeleteBooking,
}) {
  const [openMenuId, setOpenMenuId] = useState(null);

  if (bookings.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={6} style={{ textAlign: "center", padding: "20px" }}>
            No bookings found matching the criteria.
          </td>
        </tr>
      </tbody>
    );
  }

  function handleToggleMenu(bookingId) {
    setOpenMenuId((currentId) => (currentId === bookingId ? null : bookingId));
  }

  function handleAction(action, booking) {
    setOpenMenuId(null);
    action(booking);
  }

  return (
    <tbody>
      {bookings.map((booking) => {
        const canModify = canModifyBooking(booking);

        return (
          <tr key={booking.bookingId}>
            <td>
              <BookingInfo>
                <VehicleImage>
                  <DirectionsCarIcon fontSize="small" />
                </VehicleImage>

                <div>
                  <VehicleName>
                    #{booking.bookingId} · {booking.make} {booking.model}
                  </VehicleName>

                  <VehicleMeta>
                    {booking.licenseNumber || "No license"} ·{" "}
                    {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                  </VehicleMeta>
                </div>
              </BookingInfo>
            </td>

            <td>
              <Badge>{booking.category || "Booking"}</Badge>
            </td>

            <td>
              <StatusText $available={booking.status === "Confirmed"}>
                {booking.status || "Pending"}
              </StatusText>
            </td>

            <td>{booking.currentBooking || booking.status || "Pending"}</td>

            <td>
              R{Number(booking.totalCost || booking.dailyRate || 0).toLocaleString()}
            </td>

            <td>
              <ActionMenuWrapper>
                <ActionButton
                  type="button"
                  onClick={() => handleToggleMenu(booking.bookingId)}
                  title="Booking actions"
                >
                  <MoreVertIcon fontSize="small" />
                </ActionButton>

                {openMenuId === booking.bookingId && (
                  <ActionMenu>
                    <ActionMenuItem
                      type="button"
                      onClick={() => handleAction(onViewBooking, booking)}
                    >
                      View Details
                    </ActionMenuItem>

                    <ActionMenuItem
                      type="button"
                      disabled={!canModify}
                      onClick={() => handleAction(onEditBooking, booking)}
                      title={
                        canModify
                          ? "Edit booking dates"
                          : "Cannot edit once the booking has started"
                      }
                    >
                      Edit Dates
                    </ActionMenuItem>

                    <ActionMenuItem
                      type="button"
                      $danger
                      disabled={!canModify}
                      onClick={() => handleAction(onDeleteBooking, booking)}
                      title={
                        canModify
                          ? "Delete booking"
                          : "Cannot delete once the booking has started"
                      }
                    >
                      Delete Booking
                    </ActionMenuItem>
                  </ActionMenu>
                )}
              </ActionMenuWrapper>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}