import { useState } from "react";
import { useNavigate } from "react-router-dom";

import GridViewIcon from "@mui/icons-material/GridView";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
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
} from "./  AdminAddUser.style";

import { addMockUser } from "../../../data/mockUser";

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

function AdminAddUser() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.name.trim()) {
      setError("Name is required.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!formData.phoneNumber.trim()) {
      setError("Phone number is required.");
      return;
    }

    if (!formData.password.trim()) {
      setError("Password is required.");
      return;
    }

    addMockUser({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      password: formData.password,
      role: formData.role,
    });

    navigate("/admin/dashboard");
  }

  const willBePending = formData.role === "";

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
            onClick={() => navigate("/admin/dashboard")}
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
                <option value="">No role yet — Pending</option>
                <option value="Owner">Owner</option>
                <option value="Company">Company</option>
                <option value="Admin">Admin</option>
              </Select>

              <HelperText>
                Leave role empty if admin will assign permissions later.
              </HelperText>
            </FieldGroup>
          </FormGrid>

          {willBePending && (
            <PendingNotice>
              This user will be created as <strong>Pending</strong> until an admin assigns a role.
            </PendingNotice>
          )}

          {error && <ErrorMessage>{error}</ErrorMessage>}
        </FormCard>

        <FooterBar>
          <FooterText>
            Users without a role will appear as Unassigned and Pending.
          </FooterText>

          <FooterActions>
            <CancelButton
              type="button"
              onClick={() => navigate("/admin/dashboard")}
            >
              Cancel
            </CancelButton>

            <SaveButton type="submit">
              <SaveIcon fontSize="small" />
              Create User
            </SaveButton>
          </FooterActions>
        </FooterBar>
      </form>
    </DashboardLayout>
  );
}

export default AdminAddUser;