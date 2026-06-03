import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Your relative import here is 100% correct!
import VehicleImageUpload from "../inputs/ImageUpload"; 

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

const SUPABASE_PROJECT_ID = "bbmsyfvdiodnfvrlpbfb"; 
const BUCKET_NAME = "Vehicle%20Images"; 

function VehicleCard({ vehicle, onDelete }) {
  const navigate = useNavigate();
  const vehicleId = vehicle.id || vehicle.vehicleId;
  
  const [imageError, setImageError] = useState(false);
  const [cacheBuster, setCacheBuster] = useState(Date.now());

  const supabaseImageUrl = `https://${SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/${BUCKET_NAME}/cars/${vehicleId}.jpg?width=400&quality=70&t=${cacheBuster}`;

  let statusKey = "";
  let statusLabel = "";
  if (vehicle.isAvailable === "Available") { statusKey = "Available"; statusLabel = "Available"; }
  else if (vehicle.isAvailable === "In Use") { statusKey = "InUse"; statusLabel = "In Use"; }
  else if (vehicle.isAvailable === "Maintenance") { statusKey = "Maintenance"; statusLabel = "Maintenance"; }

  return (
    <Card>
      {/* Position relative allows the camera icon inside VehicleImageUpload to snap to the corner */}
      <ImageArea style={{ position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        
        <img 
          src={supabaseImageUrl} 
          alt={`${vehicle.make} ${vehicle.model}`}
          onLoad={() => setImageError(false)}
          onError={() => setImageError(true)} 
          style={{ 
            width: "100%", 
            height: "100%", 
            objectFit: "cover",
            display: imageError ? "none" : "block" 
          }}
        />

        {imageError && (
          <VehicleIcon>
            <DirectionsCarIcon style={{ fontSize: "40px", color: "#ccc" }} />
          </VehicleIcon>
        )}

        {/* Placing it inside ImageArea overlays the camera button neatly onto the picture box */}
        <VehicleImageUpload 
          vehicleId={vehicleId} 
          onUploadSuccess={() => {
            setImageError(false);         
            setCacheBuster(Date.now());   
          }} 
        />

        <StatusBadge $status={statusKey}>
          {statusLabel}
        </StatusBadge>
      </ImageArea>

      <Body>
        <VehicleTitle>{vehicle.make} {vehicle.model}</VehicleTitle>

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
            <EditButton type="button" onClick={() => navigate(`/owner/vehicles/edit/${vehicleId}`)}>
              <EditIcon fontSize="inherit" />
              Edit
            </EditButton>

            <DeleteButton type="button" onClick={() => onDelete(vehicle)}>
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



