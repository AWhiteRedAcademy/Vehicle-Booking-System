import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import GridViewIcon from "@mui/icons-material/GridView";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import BarChartIcon from "@mui/icons-material/BarChart";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PaidIcon from "@mui/icons-material/Paid";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
} from "../OwnerAddVehiclePage/  OwnerAddVehicle.style";

import {
  getMockOwnerVehicleById,
  updateMockOwnerVehicle,
} from "../../../data/mockOwnerVehicles";

const ownerNavItems = [
  {
    label: "Dashboard",
    to: "/owner/dashboard",
    icon: <GridViewIcon fontSize="small" />,
  },
  {
    label: "Vehicles",
    to: "/owner/dashboard",
    icon: <DirectionsCarIcon fontSize="small" />,
  },
  {
    label: "Bookings",
    to: "/owner/bookings",
    icon: <EventAvailableIcon fontSize="small" />,
  },
  {
    label: "Reports",
    to: "/owner/reports",
    icon: <BarChartIcon fontSize="small" />,
  },
];

function OwnerEditVehicle() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    vehicleId: "",
    ownerId: "",
    make: "",
    model: "",
    category: "Executive Sedan",
    dailyRate: "",
    isAvailable: true,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const vehicle = getMockOwnerVehicleById(id);

    if (!vehicle) {
      setError("Vehicle not found.");
      return;
    }

    setFormData({
      vehicleId: vehicle.vehicleId,
      ownerId: vehicle.ownerId,
      make: vehicle.make,
      model: vehicle.model,
      category: vehicle.category,
      dailyRate: vehicle.dailyRate,
      isAvailable: vehicle.isAvailable,
    });
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

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.make.trim()) {
      setError("Vehicle make is required.");
      return;
    }

    if (!formData.model.trim()) {
      setError("Vehicle model is required.");
      return;
    }

    if (!formData.dailyRate || Number(formData.dailyRate) <= 0) {
      setError("Daily rate must be greater than 0.");
      return;
    }

    const updatedVehicle = {
      vehicleId: Number(formData.vehicleId),
      ownerId: Number(formData.ownerId),
      make: formData.make,
      model: formData.model,
      category: formData.category,
      dailyRate: Number(formData.dailyRate),
      isAvailable: formData.isAvailable,
    };

    updateMockOwnerVehicle(updatedVehicle);

    navigate("/owner/dashboard");
  }

  return (
    <DashboardLayout
      title="Edit Vehicle"
      subtitle="Update vehicle details, pricing, and availability."
      roleLabel="Owner Console"
      userLabel="Owner"
      navItems={ownerNavItems}
    >
      <HeaderRow>
        <div>
          <SectionEyebrow
            onClick={() => navigate("/owner/dashboard")}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <ArrowBackIcon fontSize="small" />
            Back to Vehicle Management
          </SectionEyebrow>

          <SectionTitle>
            Edit Vehicle: {formData.make} {formData.model}
          </SectionTitle>

          <SectionText>
            Update this vehicle’s information, daily rate, and availability.
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
                  <Label>Vehicle Make</Label>
                  <Input
                    type="text"
                    name="make"
                    value={formData.make}
                    onChange={handleChange}
                    placeholder="e.g. BMW"
                  />
                </FieldGroup>

                <FieldGroup>
                  <Label>Model</Label>
                  <Input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="e.g. 540i"
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
                    <option value="Executive Sedan">Executive Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Cargo">Cargo</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Coupe">Coupe</option>
                    <option value="Sedan">Sedan</option>
                  </Select>
                </FieldGroup>

                <FieldGroup>
                  <Label>Owner ID</Label>
                  <Input
                    type="number"
                    name="ownerId"
                    value={formData.ownerId}
                    disabled
                  />
                </FieldGroup>
              </FormRow>
            </FormCard>
          </MainColumn>

          <SideColumn>
            <FormCard>
              <CardTitle>
                <PaidIcon fontSize="small" />
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
            Mock edit only: changes are saved in localStorage.
          </FooterText>

          <FooterActions>
            <DiscardButton
              type="button"
              onClick={() => navigate("/owner/dashboard")}
            >
              Cancel
            </DiscardButton>

            <SaveButton type="submit">
              <SaveIcon fontSize="small" />
              Save Changes
            </SaveButton>
          </FooterActions>
        </FooterBar>
      </form>
    </DashboardLayout>
  );
}

export default OwnerEditVehicle;
