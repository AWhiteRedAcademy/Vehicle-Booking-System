import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Icons & UI Imports
import SaveIcon from "@mui/icons-material/Save";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PaymentsIcon from "@mui/icons-material/Payments";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { userIdParam } from "../../../constants/userHelper";
import { getVehicleById, updateVehicle } from "../../../HTTPS Services/PostServices";

import {
  HeaderRow,
  SectionEyebrow,
  SectionTitle,
  SectionText,
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
  ErrorMessage,
  FooterBar,
  FooterText,
  FooterActions,
  DiscardButton,
  SaveButton,
} from "./OwnerDashboard.style";

function OwnerEditVehicle() {
  const navigate = useNavigate();
  const { id } = useParams(); // Extracts the vehicle ID string straight from the route parameter URL

  // Safe user token lookup fallback setup
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
    category: "Executive Sedan",
    dailyRate: "",
    isAvailable: true,
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
          id: data.id || id,
          ownerId: data.ownerId || currentUserId,
          make: data.make || "",
          model: data.model || "",
          category: data.category || "Executive Sedan",
          dailyRate: data.dailyRate || "",
          isAvailable: data.isAvailable !== undefined ? data.isAvailable : true,
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

  // 2. (PUT)
  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.make.trim() || !formData.model.trim()) {
      setError("Vehicle make and model details cannot be left blank.");
      return;
    }

    if (!formData.dailyRate || Number(formData.dailyRate) <= 0) {
      setError("Rental evaluation rate pricing tier must exceed 0.");
      return;
    }

    try {
      setIsSaving(true);
      setError("");

      const requestBody = {
        id: Number(formData.id),
        ownerId: Number(formData.ownerId),
        make: formData.make.trim(),
        model: formData.model.trim(),
        category: formData.category,
        dailyRate: Number(formData.dailyRate),
        isAvailable: formData.isAvailable,
      };

      // Dispatches clean PUT request via fixed interceptor
      await updateVehicle(id, requestBody);
      
      // Navigate safely back to main console space
      navigate("/owner/dashboard");
    } catch (error) {
      setError(error.message || "Unable to modify database record asset profiles.");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout title="Edit Vehicle" subtitle="Loading record statistics...">
        <div style={{ padding: "2rem", textAlign: "center", fontWeight: "600", color: "#666" }}>
          Reading vehicle specifications data from server...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Edit Vehicle Profile"
      subtitle="Modify registration traits, categories, and marketplace tier values."
      roleLabel="Owner Console"
      userLabel="Owner"
    >
      <HeaderRow>
        <div>
          <SectionEyebrow>Vehicles &gt; Edit Vehicle</SectionEyebrow>
          <SectionTitle>Update Fleet Asset</SectionTitle>
          <SectionText>
            Refine existing characteristics configuration layouts for asset tracking indices.
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
                  <Label>Vehicle Identification ID</Label>
                  <Input type="text" name="id" value={formData.id} disabled />
                </FieldGroup>

                <FieldGroup>
                  <Label>Vehicle Make</Label>
                  <Input
                    type="text"
                    name="make"
                    value={formData.make}
                    onChange={handleChange}
                    placeholder="e.g. Audi"
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
                    placeholder="e.g. RS6"
                  />
                </FieldGroup>

                <FieldGroup>
                  <Label>Category</Label>
                  <Select name="category" value={formData.category} onChange={handleChange}>
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
                <Label>Daily Rental Rate (R)</Label>
                <Input
                  type="number"
                  name="dailyRate"
                  value={formData.dailyRate}
                  onChange={handleChange}
                  placeholder="e.g. 1800"
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

        {error && <ErrorMessage>⚠️ {error}</ErrorMessage>}

        <FooterBar>
          <FooterText>
            Asset modification tracking matches local persistence state rules immediately.
          </FooterText>

          <FooterActions>
            <DiscardButton type="button" onClick={() => navigate("/owner/dashboard")}>
              Cancel Changes
            </DiscardButton>

            <SaveButton type="submit" disabled={isSaving}>
              <SaveIcon fontSize="small" />
              {isSaving ? "Updating Fleet..." : "Update Specifications"}
            </SaveButton>
          </FooterActions>
        </FooterBar>
      </form>
    </DashboardLayout>
  );
}

export default OwnerEditVehicle;
