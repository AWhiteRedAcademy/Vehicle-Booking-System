import { useState } from "react";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SpeedIcon from "@mui/icons-material/Speed";
import PersonIcon from "@mui/icons-material/Person";
import BuildIcon from "@mui/icons-material/Build";

import { getVehicleImageUrl } from "../../../HTTPS Services/VehicleImageService.js";

import {
  VehicleInventoryGrid,
  VehicleInventoryCard,
  VehicleImageArea,
  VehicleImagePlaceholder,
  VehicleStatusBadge,
  VehicleTypeBadge,
  VehicleCardBody,
  VehicleCardHeader,
  VehicleTitle,
  VehiclePlate,
  VehicleMenuButton,
  VehicleInfoGrid,
  VehicleInfoItem,
  VehicleInfoLabel,
  VehicleInfoValue,
  VehicleCardDivider,
  VehicleCardActions,
  VehicleLinkButton,
  VehicleBookButton,
} from "./CompanyVehicles.style";

function getPrimaryButtonLabel(status) {
  if (status === "In Use") {
    return "View Journey";
  }

  if (status === "Maintenance") {
    return "View Service Log";
  }

  return "View Details";
}

function CompanyVehicleCard({ vehicle, onViewVehicle, onBookVehicle }) {
  const vehicleId = vehicle.vehicleId || vehicle.id;
  const isBookable = vehicle.isAvailable === "Available";

  const [imageError, setImageError] = useState(false);
  const [cacheBuster] = useState(Date.now());

  const vehicleImageUrl = `${getVehicleImageUrl(
    vehicleId,
  )}?width=600&quality=75&t=${cacheBuster}`;

  return (
    <VehicleInventoryCard>
      <VehicleImageArea>
        {!imageError && vehicleId ? (
          <img
            src={vehicleImageUrl}
            alt={`${vehicle.make} ${vehicle.model}`}
            onError={() => setImageError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
        ) : (
          <VehicleImagePlaceholder>
            <DirectionsCarIcon fontSize="large" />
          </VehicleImagePlaceholder>
        )}

        <VehicleStatusBadge $status={vehicle.isAvailable}>
          {vehicle.isAvailable || "Available"}
        </VehicleStatusBadge>

        <VehicleTypeBadge>
          {vehicle.category || "Uncategorised"}
        </VehicleTypeBadge>
      </VehicleImageArea>

      <VehicleCardBody>
        <VehicleCardHeader>
          <div>
            <VehicleTitle>
              {vehicle.make} {vehicle.model}
            </VehicleTitle>

            <VehiclePlate>
              PLATE: {vehicle.licenseNumber || "N/A"}
              {vehicle.modelYear ? ` · ${vehicle.modelYear}` : ""}
            </VehiclePlate>
          </div>

          <VehicleMenuButton
            type="button"
            onClick={() => onViewVehicle(vehicle)}
            title="View vehicle details"
          >
            <MoreVertIcon fontSize="small" />
          </VehicleMenuButton>
        </VehicleCardHeader>

        <VehicleInfoGrid>
          {vehicle.isAvailable === "Available" && (
            <>
              <VehicleInfoItem>
                <CalendarMonthIcon fontSize="small" />
                <div>
                  <VehicleInfoLabel>Availability</VehicleInfoLabel>
                  <VehicleInfoValue>Ready Now</VehicleInfoValue>
                </div>
              </VehicleInfoItem>

              <VehicleInfoItem>
                <SpeedIcon fontSize="small" />
                <div>
                  <VehicleInfoLabel>Daily Rate</VehicleInfoLabel>
                  <VehicleInfoValue>
                    R{Number(vehicle.dailyRate || 0).toLocaleString()}
                  </VehicleInfoValue>
                </div>
              </VehicleInfoItem>
            </>
          )}

          {vehicle.isAvailable === "In Use" && (
            <>
              <VehicleInfoItem>
                <PersonIcon fontSize="small" />
                <div>
                  <VehicleInfoLabel>Status</VehicleInfoLabel>
                  <VehicleInfoValue>Assigned</VehicleInfoValue>
                </div>
              </VehicleInfoItem>

              <VehicleInfoItem>
                <CalendarMonthIcon fontSize="small" />
                <div>
                  <VehicleInfoLabel>Return Est.</VehicleInfoLabel>
                  <VehicleInfoValue>Pending</VehicleInfoValue>
                </div>
              </VehicleInfoItem>
            </>
          )}

          {vehicle.isAvailable === "Maintenance" && (
            <>
              <VehicleInfoItem>
                <BuildIcon fontSize="small" />
                <div>
                  <VehicleInfoLabel>Status</VehicleInfoLabel>
                  <VehicleInfoValue>Maintenance</VehicleInfoValue>
                </div>
              </VehicleInfoItem>

              <VehicleInfoItem>
                <CalendarMonthIcon fontSize="small" />
                <div>
                  <VehicleInfoLabel>Expected</VehicleInfoLabel>
                  <VehicleInfoValue>TBD</VehicleInfoValue>
                </div>
              </VehicleInfoItem>
            </>
          )}
        </VehicleInfoGrid>

        <VehicleCardDivider />

        <VehicleCardActions>
          <VehicleLinkButton
            type="button"
            onClick={() => onViewVehicle(vehicle)}
          >
            {getPrimaryButtonLabel(vehicle.isAvailable)}
          </VehicleLinkButton>

          <VehicleBookButton
            type="button"
            disabled={!isBookable}
            onClick={() => onBookVehicle(vehicle)}
          >
            Book Now
          </VehicleBookButton>
        </VehicleCardActions>
      </VehicleCardBody>
    </VehicleInventoryCard>
  );
}

export default function CompanyVehicleList({
  vehicles = [],
  onViewVehicle,
  onBookVehicle,
}) {
  if (vehicles.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          width: "100%",
          color: "#666",
        }}
      >
        No vehicles found matching the criteria.
      </div>
    );
  }

  return (
    <VehicleInventoryGrid>
      {vehicles.map((vehicle) => (
        <CompanyVehicleCard
          key={vehicle.vehicleId || vehicle.id}
          vehicle={vehicle}
          onViewVehicle={onViewVehicle}
          onBookVehicle={onBookVehicle}
        />
      ))}
    </VehicleInventoryGrid>
  );
}
