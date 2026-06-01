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
} from "./CompanyDashboard.style.js";

export default function CompanyBookingDetailsList({
  bookings = [],
  onViewVehicle,
  onBookVehicle,
}) {
  const [openMenuId, setOpenMenuId] = useState(null);

  if (bookings.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={6} style={{ textAlign: "center", padding: "20px" }}>
            No vehicles found matching the criteria.
          </td>
        </tr>
      </tbody>
    );
  }

  function handleToggleMenu(rowId) {
    setOpenMenuId((currentId) => (currentId === rowId ? null : rowId));
  }

  function handleAction(action, vehicle) {
    setOpenMenuId(null);

    if (action) {
      action(vehicle);
    }
  }

  return (
    <tbody>
      {bookings.map((booking) => {
        const rowId = booking.vehicleId || booking.bookingId;
        const isAvailable = booking.isAvailable === "Available";

        return (
          <tr key={rowId}>
            <td data-label="Vehicle Details">
              <BookingInfo>
                <VehicleImage>
                  <DirectionsCarIcon fontSize="small" />
                </VehicleImage>

                <div>
                  <VehicleName>
                    {booking.make} {booking.model}
                  </VehicleName>

                  <VehicleMeta>
                    {booking.licenseNumber || "No license"}{" "}
                    {booking.modelYear > 0 ? `• ${booking.modelYear}` : ""}
                  </VehicleMeta>
                </div>
              </BookingInfo>
            </td>

            <td data-label="Type">
              <Badge>{booking.category || "Uncategorised"}</Badge>
            </td>

            <td data-label="Status">
              <StatusText $available={isAvailable}>
                {booking.isAvailable || "Available"}
              </StatusText>
            </td>

            <td data-label="Current Booking">
              {booking.currentBooking || "No booking"}
            </td>

            <td data-label="Daily Rate">
              R{Number(booking.dailyRate || 0).toLocaleString()}
            </td>

            <td data-label="Actions">
              <ActionMenuWrapper>
                <ActionButton
                  type="button"
                  onClick={() => handleToggleMenu(rowId)}
                  title="Vehicle actions"
                >
                  <MoreVertIcon fontSize="small" />
                </ActionButton>

                {openMenuId === rowId && (
                  <ActionMenu>
                    <ActionMenuItem
                      type="button"
                      onClick={() => handleAction(onViewVehicle, booking)}
                    >
                      View Details
                    </ActionMenuItem>

                    <ActionMenuItem
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => handleAction(onBookVehicle, booking)}
                      title={
                        isAvailable
                          ? "Book this vehicle"
                          : "Only available vehicles can be booked"
                      }
                    >
                      Book Vehicle
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