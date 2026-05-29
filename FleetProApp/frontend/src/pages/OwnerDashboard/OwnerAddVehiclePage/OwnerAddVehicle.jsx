import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { userIdParam } from '../../../constants/userHelper';
import { jwtDecode } from 'jwt-decode';

import GridViewIcon from "@mui/icons-material/GridView";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import BarChartIcon from "@mui/icons-material/BarChart";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PaymentsIcon from '@mui/icons-material/Payments';
import SaveIcon from "@mui/icons-material/Save";

import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import { addVehicle } from "../../../HTTPS Services/OwnerServices";

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
} from "./OwnerAddVehicle.style";


const ownerNavItems = [
  {
    label: "Dashboard",
    to: "/owner/dashboard",
    icon: <GridViewIcon fontSize="small" />,
  },
  {
    label: "Vehicles",
    to: "/owner/vehicles",
    icon: <DirectionsCarIcon fontSize="small" />,
  },
  {
    label: "Reports",
    to: "/owner/reports",
    icon: <BarChartIcon fontSize="small" />,
  },
];

function OwnerAddVehicle() {
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  let userId = "";
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded[userIdParam] || "";
    } catch (e) {
      console.error("Failed to decode token on initialization:", e);
    }
  }

  const [formData, setFormData] = useState({
    ownerId: userId,
    make: "",
    model: "",
    category: "Sedan",
    dailyRate: "",
    isAvailable: "Available",
    licenseNumber: "",
    vinNumber: "",
    modelYear: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

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

    if (!formData.ownerId) {
      setError("Owner ID is required for now because your backend expects it.");
      return;
    }

    if (!formData.make.trim() || !formData.model.trim()) {
      setError("Vehicle make and model are required.");
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

    // --- VIN Number Validation ---

    if (formData.vinNumber) {
      const cleanVin = formData.vinNumber.trim().toUpperCase();

      // Regex checks for exactly 17 alphanumeric characters, excluding I, O, and Q
      const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;

      if (!vinRegex.test(cleanVin)) {
        setError("VIN number must be exactly 17 characters long and cannot contain the letters I, O, or Q.");
        return;
      }

    }


    if (!formData.licenseNumber || !formData.licenseNumber.trim()) {
      setError("License plate cannot be empty.");
      return;
    }

    // License plate validation - South African
    const cleanPlate = formData.licenseNumber.trim().toUpperCase();

    if (cleanPlate === '') {
      setError("License plate cannot be empty.");
      return;
    }

    // 1. New Alphanumeric Standard (GP, ZN, FS, MP, L, NW, NC)
    const nationalRegex = /^[A-Z]{2}\s?\d{2}\s?[A-Z]{2}\s?(GP|ZN|FS|MP|L|NW|NC)$/;

    // 2. Western Cape & Older Province Formats (NOW ALLOWS OPTIONAL HYPHENS IN NUMBERS)
    // Pattern: CA 123456, CA 123-456, CA123-456, or CEO 123
    const provincialRegex = /^[A-Z]{2,3}\s?\d{1,3}([- ]?\d{1,3})?(\s?(WP|EC))?$/;

    // 3. Personalized Plates (Up to 7 custom characters + Province suffix)
    const personalizedRegex = /^[A-Z0-9\s-]{1,7}\s?(GP|ZN|FS|MP|L|NW|NC|WP|EC)$/;


    // Test input against all valid combinations
    const isValid = nationalRegex.test(cleanPlate) ||
      provincialRegex.test(cleanPlate) ||
      personalizedRegex.test(cleanPlate);

    if (!isValid) {
      setError("Invalid South African plate format. Examples: BB 12 CC GP or CA 123-456.");
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
        licenseNumber: cleanPlate,
        vinNumber: formData.vinNumber.trim(),
        modelYear: Number(formData.modelYear || 0),
      };

      await addVehicle(requestBody);

      navigate("/owner/dashboard");
    } catch (error) {
        setError(error.message || "Could not save vehicle.");
    } finally {
        setIsSaving(false);
    }
  }

  return (
    <DashboardLayout
      title="Add New Vehicle"
      subtitle="Register a new vehicle to your fleet."
      roleLabel="Owner Console"
      userLabel="Owner"
      navItems={ownerNavItems}
    >
      <HeaderRow>
        <div>
          <SectionEyebrow>Vehicles &gt; Add New Vehicle</SectionEyebrow>
          <SectionTitle>Add New Vehicle</SectionTitle>
          <SectionText>
            Register a new asset to your vehicle booking system.
          </SectionText>
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
                  <Label>Owner ID</Label>
                  <Input
                    type="number"
                    name="ownerId"
                    value={userId}
                    readOnly
                    placeholder="Auto-filled from your account"
                  />
                </FieldGroup>

                <FieldGroup>
                  <Label>Vehicle Make</Label>
                  <Input
                    type="text"
                    name="make"
                    value={formData.make}
                    onChange={handleChange}
                    placeholder="e.g. BMW"
                  />
                </FieldGroup>
              </FormRow>

              <FormRow>
                <FieldGroup>
                  <Label>Model</Label>
                  <Input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="e.g. M2"
                  />
                </FieldGroup>

                <FieldGroup>
                  <Label>Category</Label>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="SUV">SUV</option>
                    <option value="Convertible">Convertible</option>
                    <option value="Pickup Truck">Pickup Truck</option>
                    <option value="Minivan/MPV">Minivan/MPV</option>
                  </Select>
                </FieldGroup>
              </FormRow>

              <FormRow>
                <FieldGroup>
                  <Label>License Number</Label>
                  <Input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber.trim().toUpperCase()}
                    onChange={handleChange}
                    placeholder="e.g. CA 123 456"
                    maxLength="20"
                  />
                </FieldGroup>

                <FieldGroup>
                  <Label>Model Year</Label>
                  <Input
                    type="number"
                    name="modelYear"
                    value={formData.modelYear}
                    onChange={handleChange}
                    placeholder="e.g. 2024"
                  />
                </FieldGroup>
              </FormRow>

              <FormRow>
                <FieldGroup>
                  <Label>VIN Number</Label>
                  <Input
                    type="text"
                    name="vinNumber"
                    value={formData.vinNumber}
                    onChange={handleChange}
                    placeholder="Vehicle identification number"
                    maxLength="50"
                  />
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
                <Input
                  type="number"
                  name="dailyRate"
                  value={formData.dailyRate}
                  onChange={handleChange}
                  placeholder="e.g. 1200"
                />
              </FieldGroup>

              <FieldGroup>
                <Label>Vehicle Status</Label>

                <StatusOptions>
                  <StatusOption
                    type="button"
                    $active={formData.isAvailable === "Available"}
                    onClick={() => handleStatusChange("Available")}
                  >
                    Available
                  </StatusOption>

                  <StatusOption
                    type="button"
                    $active={formData.isAvailable === "In Use"}
                    onClick={() => handleStatusChange("In Use")}
                  >
                    In Use
                  </StatusOption>

                  <StatusOption
                    type="button"
                    $active={formData.isAvailable === "Maintenance"}
                    onClick={() => handleStatusChange("Maintenance")}
                  >
                    Maintenance
                  </StatusOption>
                </StatusOptions>
              </FieldGroup>
            </FormCard>
          </SideColumn>
        </FormGrid>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <FooterBar>
          <FooterText>
            All changes will be reflected in your fleet dashboard.
          </FooterText>

          <FooterActions>
            <DiscardButton
              type="button"
              onClick={() => navigate("/owner/dashboard")}
            >
              Discard
            </DiscardButton>

            <SaveButton type="submit" disabled={isSaving}>
              <SaveIcon fontSize="small" />
              {isSaving ? "Saving..." : "Save Vehicle"}
            </SaveButton>
          </FooterActions>
        </FooterBar>
      </form>
    </DashboardLayout>
  );
}

export default OwnerAddVehicle;