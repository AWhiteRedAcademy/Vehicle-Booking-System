import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EditIcon from "@mui/icons-material/Edit";

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
  EditButton,
} from "./VehicleCard.style";

function VehicleCard({ vehicle }) {
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

          <EditButton type="button">
            <EditIcon fontSize="inherit" />
            Edit
          </EditButton>
        </Footer>
      </Body>
    </Card>
  );
}

export default VehicleCard;
