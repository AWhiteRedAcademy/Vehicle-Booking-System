import { useNavigate } from "react-router-dom";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Card,
  ImageArea,
  VehicleIcon,
  StatusBadge,
  Body,
  VehicleTitle,
  DetailRow,
  DetailTag,
  Footer,
  Rate,
  ActionButtons,
  EditButton,
  DeleteButton,
} from "./VehicleCard.style";

function VehicleCard({ vehicle, onDelete }) {
  const navigate = useNavigate();
  const vehicleId = vehicle.id || vehicle.vehicleId;

  return (
    <Card>
      <ImageArea>
        <VehicleIcon>
          <DirectionsCarIcon />
        </VehicleIcon>

        <StatusBadge $status={vehicle.isAvailable}>
          {vehicle.isAvailable || "Available"}
        </StatusBadge>
      </ImageArea>

      <Body>
        <VehicleTitle>
          {vehicle.make} {vehicle.model}
        </VehicleTitle>

        <DetailRow>
          <DetailTag>{vehicle.category}</DetailTag>
          {vehicle.modelYear > 0 && <DetailTag>{vehicle.modelYear}</DetailTag>}
          {vehicle.licenseNumber && <DetailTag>{vehicle.licenseNumber}</DetailTag>}
          {vehicle.vinNumber && <DetailTag>VIN: {vehicle.vinNumber}</DetailTag>}
          <DetailTag>Owner #{vehicle.ownerId}</DetailTag>
        </DetailRow>

        <Footer>
          <Rate>R{Number(vehicle.dailyRate).toLocaleString()} / day</Rate>

          <ActionButtons>
            <EditButton
              type="button"
              onClick={() => navigate(`/owner/vehicles/edit/${vehicleId}`)}
            >
              <EditIcon fontSize="inherit" />
              Edit
            </EditButton>

            <DeleteButton
              type="button"
              onClick={() => onDelete(vehicle)}
            >
              <DeleteIcon fontSize="inherit" />
              Delete
            </DeleteButton>
          </ActionButtons>
        </Footer>
      </Body>
    </Card>
  );
}

export default VehicleCard;
