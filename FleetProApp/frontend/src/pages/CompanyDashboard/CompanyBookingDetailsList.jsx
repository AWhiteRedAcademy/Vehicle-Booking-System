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
} from "./CompanyDashboard.style.js";

export default function CompanyBookingList({ bookings = [] }) {
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

  return (
    <tbody>
      {bookings.map((booking) => (
        <tr key={booking.vehicleId || booking.bookingId}>
          <td>
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

          <td>
            <Badge>{booking.category || "Uncategorised"}</Badge>
          </td>

          <td>
            <StatusText $available={booking.isAvailable === "Available"}>
              {booking.isAvailable || "Available"}
            </StatusText>
          </td>

          <td>{booking.currentBooking || "No booking"}</td>

          <td>R{Number(booking.dailyRate || 0).toLocaleString()}</td>

          <td>
            <ActionButton type="button">
              <MoreVertIcon fontSize="small" />
            </ActionButton>
          </td>
        </tr>
      ))}
    </tbody>
  );
}