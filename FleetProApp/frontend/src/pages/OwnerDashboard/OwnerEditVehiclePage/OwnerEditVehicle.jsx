import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import SaveIcon from "@mui/icons-material/Save";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PaymentsIcon from "@mui/icons-material/Payments";

import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import { userIdParam } from "../../../constants/userHelper";
import { getVehicleById, updateVehicle } from "../../../HTTPS Services/VehicleServices";

import {
  HeaderRow,
  SectionEyebrow,
  SectionTitle,
  SectionText,
} from "../../../components/dashboard/DashboardPage.styles";

import {
  FormGrid,
  MainColumn,
  SideColumn,
  FormCard,
  CardTitle,
  FormRow,
  FieldGroup,
  Label,
  Input,
  Select,
  StatusOptions,
  StatusOption,
  FooterBar,
  FooterText,
  FooterActions,
  DiscardButton,
  SaveButton,
  ErrorMessage,
} from "../OwnerAddVehiclePage/OwnerAddVehicle.style";

const ownerNavItems = [
  { label: "Dashboard", to: "/owner/dashboard" },
  { label: "Vehicles", to: "/owner/vehicles/add" },
  { label: "Reports", to: "/owner/reports" },
];

function OwnerEditVehicle() {
  const navigate = useNavigate();
  const { id } = useParams();

  const token = localStorage.getItem("accessToken");
  let currentUserId = "";
  if (token) {
    try {
      const decoded = jwtDecode(token);
      currentUserId = decoded[userIdParam] || "";
    } catch (e) {
      console.error("Failed to decode token inside vehicle editor:", e);
    }
  }

  const [formData, setFormData] = useState({
    id: id,
    ownerId: currentUserId,
    make: "",
    model: "",
    category: "Sedan",
    dailyRate: "",
    isAvailable: "Available",
    licenseNumber: "",
    vinNumber: "",
    modelYear: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    getVehicleById(id)
      .then((data) => {
        setFormData({
          id: data.id || data.vehicleId || id,
          ownerId: data.ownerId || currentUserId,
          make: data.make || "",
          model: data.model || "",
          category: data.category || "Sedan",
          dailyRate: data.dailyRate || "",
          isAvailable: data.isAvailable || "Available",
          licenseNumber: data.licenseNumber || "",
          vinNumber: data.vinNumber || "",
          modelYear: data.modelYear || "",
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to populate asset record data:", err);
        setError(err.message || "Failed to load vehicle profile information.");
        setIsLoading(false);
      });
  }, [id, currentUserId]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleStatusChange(isAvailable) {
    setFormData((currentData) => ({
      ...currentData,
      isAvailable,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.make.trim() || !formData.model.trim()) {
      setError("Vehicle make and model details cannot be left blank.");
      return;
    }

    if (!formData.dailyRate || Number(formData.dailyRate) <= 0) {
      setError("Daily rate must be greater than 0.");
      return;
    }

    if (formData.modelYear && Number(formData.modelYear) < 1900) {
      setError("Model year must be valid.");
      return;
    }

    try {
      setIsSaving(true);
      setError("");

      const requestBody = {
        ownerId: Number(formData.ownerId),
        make: formData.make.trim(),
        model: formData.model.trim(),
        category: formData.category,
        dailyRate: Number(formData.dailyRate),
        isAvailable: formData.isAvailable,
        licenseNumber: formData.licenseNumber.trim(),
        vinNumber: formData.vinNumber.trim(),
        modelYear: Number(formData.modelYear || 0),
      };

      await updateVehicle(id, requestBody);
      navigate("/owner/dashboard");
    } catch (error) {
      setError(error.message || "Unable to update vehicle details.");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout title="Edit Vehicle" subtitle="Loading vehicle details...">
        <div style={{ padding: "2rem", textAlign: "center", fontWeight: "600", color: "#666" }}>
          Reading vehicle specifications from server...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Edit Vehicle"
      subtitle="Update this vehicle profile."
      roleLabel="Owner Console"
      userLabel="Owner"
      navItems={ownerNavItems}
    >
      <HeaderRow>
        <div>
          <SectionEyebrow>Vehicles &gt; Edit Vehicle</SectionEyebrow>
          <SectionTitle>Edit Vehicle</SectionTitle>
          <SectionText>Update vehicle details, pricing, and current status.</SectionText>
        </div>
      </HeaderRow>

      <form onSubmit={handleSubmit}>
        <FormGrid>
          <MainColumn>
            <FormCard>
              <CardTitle>
                <InfoOutlinedIcon fontSize="small" />
                General Information
              </CardTitle>

              <FormRow>
                <FieldGroup>
                  <Label>Vehicle Make</Label>
                  <Input type="text" name="make" value={formData.make} onChange={handleChange} />
                </FieldGroup>

                <FieldGroup>
                  <Label>Model</Label>
                  <Input type="text" name="model" value={formData.model} onChange={handleChange} />
                </FieldGroup>
              </FormRow>

              <FormRow>
                <FieldGroup>
                  <Label>Category</Label>
                  <Select name="category" value={formData.category} onChange={handleChange}>
                    <option value="Sedan">Sedan</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="SUV">SUV</option>
                    <option value="Convertible">Convertible</option>
                    <option value="Pickup Truck">Pickup Truck</option>
                    <option value="Minivan/MPV">Minivan/MPV</option>
                  </Select>
                </FieldGroup>

                <FieldGroup>
                  <Label>Model Year</Label>
                  <Input type="number" name="modelYear" value={formData.modelYear} onChange={handleChange} />
                </FieldGroup>
              </FormRow>

              <FormRow>
                <FieldGroup>
                  <Label>License Number</Label>
                  <Input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} maxLength="20" />
                </FieldGroup>

                <FieldGroup>
                  <Label>VIN Number</Label>
                  <Input type="text" name="vinNumber" value={formData.vinNumber} onChange={handleChange} maxLength="50" />
                </FieldGroup>
              </FormRow>
            </FormCard>
          </MainColumn>

          <SideColumn>
            <FormCard>
              <CardTitle>
                <PaymentsIcon fontSize="small" />
                Pricing & Status
              </CardTitle>

              <FieldGroup>
                <Label>Daily Rental Rate</Label>
                <Input type="number" name="dailyRate" value={formData.dailyRate} onChange={handleChange} />
              </FieldGroup>

              <FieldGroup>
                <Label>Vehicle Status</Label>
                <StatusOptions>
                  <StatusOption type="button" $active={formData.isAvailable === "Available"} onClick={() => handleStatusChange("Available")}>
                    Available
                  </StatusOption>
                  <StatusOption type="button" $active={formData.isAvailable === "In Use"} onClick={() => handleStatusChange("In Use")}>
                    In Use
                  </StatusOption>
                  <StatusOption type="button" $active={formData.isAvailable === "Maintenance"} onClick={() => handleStatusChange("Maintenance")}>
                    Maintenance
                  </StatusOption>
                </StatusOptions>
              </FieldGroup>
            </FormCard>
          </SideColumn>
        </FormGrid>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <FooterBar>
          <FooterText>All changes will be reflected in your fleet dashboard.</FooterText>
          <FooterActions>
            <DiscardButton type="button" onClick={() => navigate("/owner/dashboard")}>Discard</DiscardButton>
            <SaveButton type="submit" disabled={isSaving}>
              <SaveIcon fontSize="small" />
              {isSaving ? "Saving..." : "Update Vehicle"}
            </SaveButton>
          </FooterActions>
        </FooterBar>
      </form>
    </DashboardLayout>
  );
}

export default OwnerEditVehicle;
