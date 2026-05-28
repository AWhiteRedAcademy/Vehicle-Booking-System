import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import GridViewIcon from "@mui/icons-material/GridView";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import BarChartIcon from "@mui/icons-material/BarChart";
import SaveIcon from "@mui/icons-material/Save";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PaymentsIcon from "@mui/icons-material/Payments";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import { getVehicleById, updateVehicle } from "../../../HTTPS Services/OwnerServices";

import {
  HeaderRow,
  SectionEyebrow,
  SectionTitle,
  SectionText,
  AddButton,
  EmptyCard,
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

const categoryOptions = [
  "Sedan",
  "Hatchback",
  "SUV",
  "Convertible",
  "Pickup Truck",
  "Minivan/MPV",
];

const statusOptions = [
  "Available",
  "In Use",
  "Maintenance",
];

const emptyVehicleForm = {
  vehicleId: "",
  ownerId: "",
  make: "",
  model: "",
  category: "Sedan",
  dailyRate: "",
  isAvailable: "Available",
  licenseNumber: "",
  vinNumber: "",
  modelYear: "",
};

function mapVehicleToForm(vehicle, id) {
  return {
    vehicleId: vehicle.vehicleId || vehicle.id || id,
    ownerId: vehicle.ownerId || "",
    make: vehicle.make || "",
    model: vehicle.model || "",
    category: vehicle.category || "Sedan",
    dailyRate: vehicle.dailyRate || "",
    isAvailable: vehicle.isAvailable || "Available",
    licenseNumber: vehicle.licenseNumber || "",
    vinNumber: vehicle.vinNumber || "",
    modelYear: vehicle.modelYear || "",
  };
}

function buildUpdateRequest(formData) {
  return {
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
}

function OwnerEditVehicle() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState(emptyVehicleForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadVehicle() {
      try {
        setIsLoading(true);
        setError("");

        const vehicle = await getVehicleById(id);

        if (!ignore) {
          setFormData(mapVehicleToForm(vehicle, id));
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Failed to load vehicle details.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    if (id) {
      loadVehicle();
    }

    return () => {
      ignore = true;
    };
  }, [id]);

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

  function validateForm() {
    if (!formData.make.trim() || !formData.model.trim()) {
      return "Vehicle make and model details cannot be left blank.";
    }

    if (!formData.dailyRate || Number(formData.dailyRate) <= 0) {
      return "Daily rate must be greater than 0.";
    }

    if (formData.modelYear && Number(formData.modelYear) < 1900) {
      return "Model year must be valid.";
    }

    if (!formData.ownerId) {
      return "Owner ID is missing from this vehicle record.";
    }

    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsSaving(true);
      setError("");

      await updateVehicle(id, buildUpdateRequest(formData));

      navigate("/owner/dashboard");
    } catch (err) {
      setError(err.message || "Unable to update vehicle details.");
    } finally {
      setIsSaving(false);
    }
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
          <SectionEyebrow>Owner Fleet &gt; Edit Vehicle</SectionEyebrow>
          <SectionTitle>Edit Vehicle</SectionTitle>
          <SectionText>
            Update the vehicle details, daily rate, and availability status.
          </SectionText>
        </div>

        <AddButton type="button" onClick={() => navigate("/owner/dashboard")}>
          <ArrowBackIcon fontSize="small" />
          Back to Fleet
        </AddButton>
      </HeaderRow>

      {isLoading ? (
        <EmptyCard>Loading vehicle details...</EmptyCard>
      ) : (
        <form onSubmit={handleSubmit}>
          <FormGrid>
            <MainColumn>
              <FormCard>
                <CardTitle>
                  <InfoOutlinedIcon fontSize="small" />
                  Vehicle Information
                </CardTitle>

                <FormRow>
                  <FieldGroup>
                    <Label>Vehicle Make</Label>
                    <Input
                      type="text"
                      name="make"
                      value={formData.make}
                      onChange={handleChange}
                      placeholder="e.g. Toyota"
                    />
                  </FieldGroup>

                  <FieldGroup>
                    <Label>Model</Label>
                    <Input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      placeholder="e.g. Corolla"
                    />
                  </FieldGroup>
                </FormRow>

                <FormRow>
                  <FieldGroup>
                    <Label>Category</Label>
                    <Select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      {categoryOptions.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </Select>
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
                    <Label>License Number</Label>
                    <Input
                      type="text"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                      placeholder="e.g. CA 123 456"
                      maxLength="20"
                    />
                  </FieldGroup>

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
                    placeholder="e.g. 950"
                  />
                </FieldGroup>

                <FieldGroup>
                  <Label>Vehicle Status</Label>
                  <StatusOptions>
                    {statusOptions.map((status) => (
                      <StatusOption
                        key={status}
                        type="button"
                        $active={formData.isAvailable === status}
                        onClick={() => handleStatusChange(status)}
                      >
                        {status}
                      </StatusOption>
                    ))}
                  </StatusOptions>
                </FieldGroup>
              </FormCard>
            </SideColumn>
          </FormGrid>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <FooterBar>
            <FooterText>
              These changes will update the vehicle record in your owner dashboard.
            </FooterText>

            <FooterActions>
              <DiscardButton
                type="button"
                onClick={() => navigate("/owner/dashboard")}
              >
                Cancel
              </DiscardButton>

              <SaveButton type="submit" disabled={isSaving}>
                <SaveIcon fontSize="small" />
                {isSaving ? "Saving..." : "Update Vehicle"}
              </SaveButton>
            </FooterActions>
          </FooterBar>
        </form>
      )}
    </DashboardLayout>
  );
}

export default OwnerEditVehicle;
