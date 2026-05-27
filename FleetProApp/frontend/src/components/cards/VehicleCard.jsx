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

function VehicleCard({ vehicle, onEdit, onDelete }) {
  return (
    <Card>
      <ImageArea>
        <VehicleIcon>
          <DirectionsCarIcon />
        </VehicleIcon>

        <StatusBadge $available={vehicle.isAvailable}>
          {vehicle.isAvailable ? "Available" : "Unavailable"}
        </StatusBadge>
      </ImageArea>

      <Body>
        <VehicleTitle>
          {vehicle.make} {vehicle.model}
        </VehicleTitle>

        <DetailRow>
          <DetailTag>{vehicle.category}</DetailTag>
          <DetailTag>Owner #{vehicle.ownerId}</DetailTag>
        </DetailRow>

        <Footer>
          <Rate>R{Number(vehicle.dailyRate).toLocaleString()} / day</Rate>

          <ActionButtons>
            <EditButton type="button" onClick={() => onEdit?.(vehicle)}>
              <EditIcon fontSize="inherit" />
              Edit
            </EditButton>

            <DeleteButton type="button" onClick={() => onDelete?.(vehicle)}>
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
