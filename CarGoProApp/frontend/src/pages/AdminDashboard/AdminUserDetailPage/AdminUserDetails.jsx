import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import GridViewIcon from "@mui/icons-material/GridView";
import BarChartIcon from "@mui/icons-material/BarChart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

import DashboardLayout from "../../../components/dashboard/DashboardLayout";

import {
  HeaderRow,
  SectionEyebrow,
  SectionTitle,
  SectionText,
  EmptyCard,
} from "../../../components/dashboard/DashboardPage.styles";

import {
  DetailsGrid,
  ProfileCard,
  AvatarLarge,
  UserMainInfo,
  UserName,
  UserEmailText,
  DetailCard,
  DetailTitle,
  DetailList,
  DetailItem,
  DetailIcon,
  DetailLabel,
  DetailValue,
  StatusBadge,
  BackButton,
} from "./AdminUserDetails.style";

import { getUserById } from "../../../HTTPS Services/AdminServices";

const adminNavItems = [
  {
    label: "Dashboard",
    to: "/admin/dashboard",
    icon: <GridViewIcon fontSize="small" />,
  },
  {
    label: "Analytics",
    to: "/admin/analytics",
    icon: <BarChartIcon fontSize="small" />,
  },
];

function getUserRole(user) {
  const role = user.role?.trim();

  if (!role || role === "Guest") {
    return "Guest";
  }

  return role;
}

function getUserStatus(user) {
  const role = user.role?.trim();

  if (!role || role === "Guest") {
    return "Pending";
  }

  return "Active";
}

function AdminUserDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadUser() {
      try {
        setIsLoading(true);
        setError("");

        const data = await getUserById(id);

        if (!ignore) {
          setUser(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Failed to load user details.");
          setUser(null);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    if (id) {
      loadUser();
    }

    return () => {
      ignore = true;
    };
  }, [id]);

  if (isLoading) {
    return (
      <DashboardLayout
        title="User Details"
        subtitle="Loading selected user information."
        roleLabel="Admin Console"
        userLabel="Admin"
        navItems={adminNavItems}
      >
        <EmptyCard>Loading user details...</EmptyCard>
      </DashboardLayout>
    );
  }

  if (error || !user) {
    return (
      <DashboardLayout
        title="User Details"
        subtitle="View selected user information."
        roleLabel="Admin Console"
        userLabel="Admin"
        navItems={adminNavItems}
      >
        <EmptyCard>{error || "User not found."}</EmptyCard>
      </DashboardLayout>
    );
  }

  const displayRole = getUserRole(user);
  const displayStatus = getUserStatus(user);

  return (
    <DashboardLayout
      title="User Details"
      subtitle="View selected user information and account status."
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

          <SectionTitle>User Details</SectionTitle>

          <SectionText>
            Review user information, assigned role, and account status.
          </SectionText>
        </div>

        <BackButton type="button" onClick={() => navigate("/admin/users")}>
          Back to Users
        </BackButton>
      </HeaderRow>

      <DetailsGrid>
        <ProfileCard>
          <AvatarLarge>{(user.name || "?").charAt(0)}</AvatarLarge>

          <UserMainInfo>
            <UserName>{user.name || "Unnamed User"}</UserName>
            <UserEmailText>{user.email || "No email"}</UserEmailText>
            <StatusBadge $status={displayStatus}>{displayStatus}</StatusBadge>
          </UserMainInfo>
        </ProfileCard>

        <DetailCard>
          <DetailTitle>Account Information</DetailTitle>

          <DetailList>
            <DetailItem>
              <DetailIcon>
                <BadgeIcon fontSize="small" />
              </DetailIcon>

              <div>
                <DetailLabel>User ID</DetailLabel>
                <DetailValue>#{user.userId}</DetailValue>
              </div>
            </DetailItem>

            <DetailItem>
              <DetailIcon>
                <EmailIcon fontSize="small" />
              </DetailIcon>

              <div>
                <DetailLabel>Email Address</DetailLabel>
                <DetailValue>{user.email || "Not provided"}</DetailValue>
              </div>
            </DetailItem>

            <DetailItem>
              <DetailIcon>
                <PhoneIcon fontSize="small" />
              </DetailIcon>

              <div>
                <DetailLabel>Phone Number</DetailLabel>
                <DetailValue>{user.phoneNumber || "Not provided"}</DetailValue>
              </div>
            </DetailItem>

            <DetailItem>
              <DetailIcon>
                <VerifiedUserIcon fontSize="small" />
              </DetailIcon>

              <div>
                <DetailLabel>Role</DetailLabel>
                <DetailValue>{displayRole}</DetailValue>
              </div>
            </DetailItem>
          </DetailList>
        </DetailCard>

        <DetailCard>
          <DetailTitle>Activity</DetailTitle>

          <DetailList>
            <DetailItem>
              <DetailIcon>
                <VerifiedUserIcon fontSize="small" />
              </DetailIcon>

              <div>
                <DetailLabel>Status</DetailLabel>
                <DetailValue>{displayStatus}</DetailValue>
              </div>
            </DetailItem>

            <DetailItem>
              <DetailIcon>
                <BadgeIcon fontSize="small" />
              </DetailIcon>

              <div>
                <DetailLabel>Last Login</DetailLabel>
                <DetailValue>{user.lastLogin || "Never"}</DetailValue>
              </div>
            </DetailItem>
          </DetailList>
        </DetailCard>
      </DetailsGrid>
    </DashboardLayout>
  );
}

export default AdminUserDetails;