import { useState } from "react";
import { useNavigate } from "react-router-dom";

import GridViewIcon from "@mui/icons-material/GridView";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import BarChartIcon from "@mui/icons-material/BarChart";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PaymentsIcon from '@mui/icons-material/Payments';
import SaveIcon from "@mui/icons-material/Save";

import DashboardLayout from "../../../components/dashboard/DashboardLayout";

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
} from "./  OwnerAddVehicle.style";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5188";

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

  const [formData, setFormData] = useState({
    ownerId: "",
    make: "",
    model: "",
    category: "Executive Sedan",
    dailyRate: "",
    isAvailable: true,
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

    try {
      setIsSaving(true);
      setError("");

      const token = localStorage.getItem("token");

      const requestBody = {
        ownerId: Number(formData.ownerId),
        make: formData.make,
        model: formData.model,
        category: formData.category,
        dailyRate: Number(formData.dailyRate),
        isAvailable: formData.isAvailable,
      };

      const response = await fetch(`${API_BASE_URL}/api/Vehicle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to create vehicle.");
      }

      navigate("/owner/dashboard");
    } catch (error) {
      setError("Could not save vehicle. Check your API, token, or request body.");
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
                    value={formData.ownerId}
                    onChange={handleChange}
                    placeholder="e.g. 2"
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
                    <option value="Executive Sedan">Executive Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Cargo">Cargo</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Coupe">Coupe</option>
                  </Select>
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
                    $active={formData.isAvailable === true}
                    onClick={() => handleStatusChange(true)}
                  >
                    Available
                  </StatusOption>

                  <StatusOption
                    type="button"
                    $active={formData.isAvailable === false}
                    onClick={() => handleStatusChange(false)}
                  >
                    Unavailable
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