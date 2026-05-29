import { useState } from "react";
import { useNavigate } from "react-router-dom";

import GridViewIcon from "@mui/icons-material/GridView";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BarChartIcon from "@mui/icons-material/BarChart";
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
  FormCard,
  FormGrid,
  FieldGroup,
  Label,
  Input,
  Select,
  HelperText,
  FooterBar,
  FooterText,
  FooterActions,
  CancelButton,
  SaveButton,
  ErrorMessage,
  PendingNotice,
} from "./AdminAddUser.style";

import { createUserByAdmin } from "../../../HTTPS Services/AdminServices";

const adminNavItems = [
  {
    label: "Dashboard",
    to: "/admin/dashboard",
    icon: <GridViewIcon fontSize="small" />,
  },
  {
    label: "Users",
    to: "/admin/users",
    icon: <PeopleAltIcon fontSize="small" />,
  },
  {
    label: "Analytics",
    to: "/admin/analytics",
    icon: <BarChartIcon fontSize="small" />,
  },
];

const roleOptions = ["Guest", "Owner", "Company", "Admin"];

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhoneNumber(phoneNumber) {
  return /^0\d{9}$/.test(phoneNumber);
}

function AdminAddUser() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "Guest",
  });

  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function validateForm() {
    const name = formData.name.trim();
    const email = formData.email.trim();
    const phoneNumber = formData.phoneNumber.trim();
    const password = formData.password;

    if (!name) {
      return "Name is required.";
    }

    if (name.length < 2) {
      return "Name must be at least 2 characters.";
    }

    if (!email) {
      return "Email is required.";
    }

    if (!isValidEmail(email)) {
      return "Please enter a valid email address.";
    }

    if (!phoneNumber) {
      return "Phone number is required.";
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      return "Phone number must be exactly 10 digits and start with 0.";
    }

    if (!password.trim()) {
      return "Password is required.";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }

    if (!roleOptions.includes(formData.role)) {
      return "Please select a valid role.";
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

    const requestBody = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      password: formData.password,
      role: formData.role,
    };

    try {
      setIsSaving(true);
      setError("");

      await createUserByAdmin(requestBody);

      navigate("/admin/users");
    } catch (err) {
      setError(err.message || "Unable to create user.");
    } finally {
      setIsSaving(false);
    }
  }

  const willBePending = formData.role === "Guest";

  return (
    <DashboardLayout
      title="Add New User"
      subtitle="Create a user account and optionally assign a role."
      roleLabel="Admin Console"
      userLabel="Admin"
      navItems={adminNavItems}
    >
      <HeaderRow>
        <div>
          <SectionEyebrow
            onClick={() => navigate("/admin/users")}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <ArrowBackIcon fontSize="small" />
            Back to User Management
          </SectionEyebrow>

          <SectionTitle>Add New User</SectionTitle>

          <SectionText>
            Create a new user. If no role is assigned, the user will remain pending.
          </SectionText>
        </div>
      </HeaderRow>

      <form onSubmit={handleSubmit}>
        <FormCard>
          <FormGrid>
            <FieldGroup>
              <Label>Full Name</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. John Smith"
              />
            </FieldGroup>

            <FieldGroup>
              <Label>Email Address</Label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. john@company.com"
              />
            </FieldGroup>

            <FieldGroup>
              <Label>Phone Number</Label>
              <Input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="e.g. 0712345678"
                maxLength="10"
              />
            </FieldGroup>

            <FieldGroup>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create temporary password"
              />
            </FieldGroup>

            <FieldGroup>
              <Label>Assign Role</Label>
              <Select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="Guest">No role yet — Pending</option>
                <option value="Owner">Owner</option>
                <option value="Company">Company</option>
                <option value="Admin">Admin</option>
              </Select>

              <HelperText>
                Leave role as Guest if admin will assign permissions later.
              </HelperText>
            </FieldGroup>
          </FormGrid>

          {willBePending && (
            <PendingNotice>
              This user will be created as <strong>Pending</strong> until an admin assigns another role.
            </PendingNotice>
          )}

          {error && <ErrorMessage>{error}</ErrorMessage>}
        </FormCard>

        <FooterBar>
          <FooterText>
            Users with the Guest role will appear as pending.
          </FooterText>

          <FooterActions>
            <CancelButton
              type="button"
              onClick={() => navigate("/admin/users")}
            >
              Cancel
            </CancelButton>

            <SaveButton type="submit" disabled={isSaving}>
              <SaveIcon fontSize="small" />
              {isSaving ? "Creating..." : "Create User"}
            </SaveButton>
          </FooterActions>
        </FooterBar>
      </form>
    </DashboardLayout>
  );
}

export default AdminAddUser;